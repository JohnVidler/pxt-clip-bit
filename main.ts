//% blockNamespace=ClipBit
enum ClipBitButton {
    L1=0, L2=1, L3=2, L4=3, L5=4, L6=5,
    R1=11, R2=10, R3=9, R4=8, R5=7, R6=6,
    //R6, R5, R4, R3, R2, R1,   // Flipped IDs to match the neopixel offsets for easier math :)
    C=12, D=13
}

//% blockNamespace=ClipBit
enum ClipBitLED { C, D }

//% blockNamespace=ClipBit
enum ClipBitDisplay { LEFT, RIGHT }

//% blockNamespace=ClipBit
enum ClipBitNumberBase { DECIMAL, HEXADECIMAL }

//% blockNamespace=ClipBit
enum ClipBitButtonState { PRESSED, RELEASED }

//% color="#BC986A" icon="\uf0ea" groups=["Pixels and LEDs","Buttons", "Digits"]
namespace ClipBit {

    const PCA9555_BASE_ADDRESS = 0x20
    const SYSTEM_IO = PCA9555_BASE_ADDRESS | 0b0010
    const LEFT_SEGMENT = PCA9555_BASE_ADDRESS | 0b0000
    const RIGHT_SEGMENT = PCA9555_BASE_ADDRESS | 0b0001

    export enum PCA9555_CMD {
        INPUT_0 = 0,   // Input port 0
        INPUT_1 = 1,   // 1 Input port 1
        OUTPUT_0 = 2,  // Output port 0
        OUTPUT_1 = 3,  // Output port 1
        INVERT_0 = 4,  // Polarity Inversion port 0
        INVERT_1 = 5,  // Polarity Inversion port 1
        CONFIG_0 = 6,  // Configuration port 0
        CONFIG_1 = 7   // Configuration port 1
    }

    export enum ButtonMasks {
        C  = 0b00000001,
        L1 = 0b00000100,
        L2 = 0b00001000,
        L3 = 0b00010000,
        L4 = 0b00100000,
        L5 = 0b01000000,
        L6 = 0b10000000,
        D  = 0b10000000,
        R1 = 0b00100000,
        R2 = 0b00010000,
        R3 = 0b00001000,
        R4 = 0b00000100,
        R5 = 0b00000010,
        R6 = 0b00000001
    }

    //    A
    //  F   B
    //    G
    //  E   C
    //    D    DP

    //   G F A B DP C D E

    const LEDDigit = [
        0b10001000, // 0
        0b11101011, // 1
        0b01001100, // 2
        0b01001001, // 3
        0b00101011, // 4
        0b00011001, // 5
        0b00011000, // 6
        0b11001011, // 7
        0b00001000, // 8
        0b00001011, // 9
        0b00001010, // A
        0b00111000, // b
        0b01111100, // c
        0b01101000, // d
        0b00011100, // E
        0b00011110, // F
        0b11110111  // .
    ]


    // Note that the lookup on this _start_ at 32 (ascii space => ' '), not zero!
    const LEDASCII = [
        0b11111111,
        0b01010111,
        0b10101111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b10011111,
        0b10011100,
        0b11001001,
        0b00101010,
        0b11111111,
        0b11111001,
        0b01111111,
        0b11110111,
        0b01101110,
        0b10001000,
        0b10111110,
        0b01001100,
        0b01001001,
        0b00101011,
        0b00011001,
        0b00011000,
        0b11001011,
        0b00001000,
        0b00001011,
        0b00001010,
        0b00111000,
        0b01111100,
        0b01101000,
        0b00011100,
        0b00011110,
        0b11111111,
        0b10111110,
        0b10111110,
        0b10111110,
        0b10111110,
        0b10111110,
        0b10111110,
        0b11111111,
        0b00101010,
        0b11101011,
        0b11101001,
        0b11111111,
        0b10111100,
        0b11111111,
        0b11111111,
        0b01111000,
        0b00001110,
        0b01110000,
        0b01111110,
        0b00011001,
        0b10011110,
        0b11111000,
        0b11111111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b10011100,
        0b00111011,
        0b11001001,
        0b10001111,
        0b11111101,
        0b11001111,
        0b00001010,
        0b00111000,
        0b01111100,
        0b01101000,
        0b00011100,
        0b00011110,
        0b11111111,
        0b00101010,
        0b11101011,
        0b11101001,
        0b11111111,
        0b10111100,
        0b11111111,
        0b11111111,
        0b01111000,
        0b00001110,
        0b01110000,
        0b01111110,
        0b00011001,
        0b10011110,
        0b11111000,
        0b11111111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b11111111,
        0b01011101,
        0b11111111,
        0b11111111
    ]

    function writeRegister(address: number, register: number, value: number) {
        pins.i2cWriteBuffer(address, Buffer.fromArray([register, value]), false)
    }

    function readRegister(address: number, register: number) {
        pins.i2cWriteNumber(address, register, NumberFormat.UInt8BE, false)
        return pins.i2cReadNumber(address, NumberFormat.UInt8BE, false)
    }

    writeRegister(SYSTEM_IO, PCA9555_CMD.CONFIG_0, 0b11111101)
    writeRegister(SYSTEM_IO, PCA9555_CMD.CONFIG_1, 0b10111111)

    writeRegister(SYSTEM_IO, PCA9555_CMD.OUTPUT_0, 0b00000000)
    writeRegister(SYSTEM_IO, PCA9555_CMD.OUTPUT_1, 0b00000000)

    writeRegister(LEFT_SEGMENT, PCA9555_CMD.CONFIG_0, 0x00)
    writeRegister(LEFT_SEGMENT, PCA9555_CMD.CONFIG_1, 0x00)

    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, 0xFF);
    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, 0xFF);

    writeRegister(RIGHT_SEGMENT, PCA9555_CMD.CONFIG_0, 0x00)
    writeRegister(RIGHT_SEGMENT, PCA9555_CMD.CONFIG_1, 0x00)

    writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_0, 0xFF);
    writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_1, 0xFF);

    let rgbLEDs = neopixel.create(DigitalPin.P7, 12, NeoPixelMode.RGB)
    let digitValues = [0, 0]
    let digitStates = [false, false]
    let buttonStates = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    let stickyStates = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    let aliasTable: { [key: number]: string } = {}
    let pressHandlers: { [key: number]: () => void } = {}
    let releaseHandlers: { [key: number]: () => void } = {}
    let eventHandlers: { (button: ClipBitButton, alias: string): void; } [] = []

    led.enable(false)
    rgbLEDs.clear()
    rgbLEDs.show()
    led.enable(true)

    function buttonEvent(button: ClipBitButton, state: boolean) {
        buttonStates[button] = state
        if( state ) {
            stickyStates[button] = true
            for (let i = 0; i < eventHandlers.length; i++)
                eventHandlers[i](button, getButtonAlias(button))
            if (pressHandlers[button])
                pressHandlers[button]()
        } else {
            /*for (let i = 0; i < eventHandlers.length; i++)
                eventHandlers[0](button)*/
            if (releaseHandlers[button])
                releaseHandlers[button]()
        }
    }

    /**
     * This variable returns the internal reference to the NeoPixel strip on the
     * Clip:Bit, so it can be used with the NeoPixel extension.
     */
    //% block="the ClipBit Pixel Strip"
    //% group="Pixels and LEDs" advanced="true"
    export function clipBitPixels() : neopixel.Strip {
        return rgbLEDs
    }

    //% block="set ClipBit button $button name to $name"
    //% button.shadow="clipBitButtonId"
    //% name.defl="Butterfly"
    //% group="Buttons" advanced="true"
    export function setButtonName(button: number = ClipBitButton.L1, name: string ) {
        aliasTable[button] = name
    }

    //% block="get ClipBit button name for $button"
    //% button.shadow="clipBitButtonId"
    //% group="Buttons" advanced="true"
    export function getButtonName(button: number = ClipBitButton.L1) : string {
        return getButtonAlias( button )
    }

    function getButtonAlias( button: number ) : string {
        if (aliasTable[button])
            return aliasTable[button]
        if( button < 0 || button > 13 )
            throw "Invalid button number, must be between 0 and 13"
        return ["L1", "L2", "L3", "L4", "L5", "L6", "R6", "R5", "R4", "R3", "R2", "R1", "C", "D" ][button]
    }

    //% block="$button"
    //% blockId="clipBitButtonId"
    //% group="Buttons" advanced="true"
    export function clipBitButton(button: ClipBitButton = ClipBitButton.L1): number {
        return button
    }

    /**
     * Sets the pixel colour for each button on the Clip:Bit.
     * 
     * Note that while C and D are listed, the only colours those support are 'Red' and 'Black' which map
     * to 'on' and 'off' respectively
     */
    //% block="set ClipBit pixel $button to $color=neopixel_colors"
    //% button.shadow="clipBitButtonId"
    //% group="Pixels and LEDs"
    export function setClipBitPixel(button: number = 0, color: number ) {
        if (button == ClipBitButton.C) {
            if (color == NeoPixelColors.Red)
                setClipBitLED(ClipBitLED.C, true)
            else if (color == NeoPixelColors.Black)
                setClipBitLED(ClipBitLED.C, false)
            return
        }
        if (button == ClipBitButton.D) {
            if (color == NeoPixelColors.Red)
                setClipBitLED(ClipBitLED.D, true)
            else if (color == NeoPixelColors.Black)
                setClipBitLED(ClipBitLED.D, false)
            return
        }
        led.enable(false)
        rgbLEDs.setPixelColor( button, color )
        rgbLEDs.show()
        led.enable(true)
    }

    /**
     * Sets the brightness of any pixels set after this point.
     */
    //% block="set ClipBit pixel brightness to $brightness"
    //% group="Pixels and LEDs"
    export function setClipBitPixelBrightness( brightness : number = 0 ) {
        led.enable(false)
        rgbLEDs.setBrightness( brightness )
        rgbLEDs.show()
        led.enable(true)
    }

    //% block="clear ClipBit pixel $button"
    //% button.shadow="clipBitButtonId"
    //% group="Pixels and LEDs"
    export function clearClipBitPixel( button: number = 0 ) {
        if (button == ClipBitButton.C) {
            setClipBitLED(ClipBitLED.C, false)
            return
        }
        if (button == ClipBitButton.D) {
            setClipBitLED(ClipBitLED.D, false)
            return
        }
        led.enable(false)
        rgbLEDs.setPixelColor( button, NeoPixelColors.Black )
        rgbLEDs.show()
        led.enable(true)
    }

    /**
     * Clears all color data for the pixels, and turns them off
     */
    //% block="turn off all ClipBit pixels"
    //% group="Pixels and LEDs"
    export function clearAllClipBitPixels() {
        led.enable(false)
        rgbLEDs.clear()
        rgbLEDs.show()
        led.enable(true)
    }

    /**
     * Is this button currently being pressed down?
     */
    //% block="is $button pressed"
    //% button.shadow="clipBitButtonId"
    //% group="Buttons"
    export function isPressed( button: number = 0 ): boolean {
        return buttonStates[button]
    }

    /**
     * Since we last checked, has this button been pressed?
     */
    //% block="was $button pressed"
    //% button.shadow="clipBitButtonId"
    //% group="Buttons" advanced="true"
    export function wasPressed( button: number = 0 ): boolean {
        if (stickyStates[button]) {
            stickyStates[button] = false; // Reset on read :)
            return true;
        }
        return false
    }

    //% block="on ClipBit button $button pressed"
    //% group="Buttons"
    export function onClipBitButtonPressed(button: ClipBitButton = ClipBitButton.L1, handler: () => void) {
        pressHandlers[button] = handler;
    }

    //% block="on ClipBit button $button released"
    //% group="Buttons"
    export function onClipBitButtonReleased(button: ClipBitButton = ClipBitButton.L1, handler: () => void) {
        releaseHandlers[button] = handler;
    }

    /**
     * Code here will be run whenever any button is pressed
     * 
     * @param button This is the button the event came from
     * @param name The button name
     */
    //% block="on ClipBit button $button pressed"
    //% draggableParameters="reporter"
    //% group="Buttons"
    export function onClipBitButtonEvent(handler: (button: number, name: string) => void) {
        eventHandlers.push( handler );
    }

    //% block="set ClipBit LED $led to $on"
    //% on.shadow="toggleOnOff"
    //% group="Pixels and LEDs"
    export function setClipBitLED(led: ClipBitLED = ClipBitLED.C, on: boolean = true) {
        let port = PCA9555_CMD.OUTPUT_0
        let mask = 0b00000010
        if (led == ClipBitLED.D) {
            port = PCA9555_CMD.OUTPUT_1
            mask = 0b01000000
        }

        if (on)
            writeRegister(SYSTEM_IO, port, mask)
        else
            writeRegister(SYSTEM_IO, port, 0x00)
    }

    //% block="set ClipBit $display display to $value || as $style"
    //% group="Digits"
    export function setDigitDisplay( display: ClipBitDisplay, value: number, style: ClipBitNumberBase = ClipBitNumberBase.DECIMAL ) {
        if( style == ClipBitNumberBase.DECIMAL ) {
            value = Math.abs(value % 100)
            let valStr = `${value}`

            if( display == ClipBitDisplay.LEFT ) {
                if( value < 10 ) {
                    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, 0xFF)
                    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, LEDDigit[parseInt(valStr[0], 10)])
                } else {
                    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, LEDDigit[parseInt(valStr[0], 10) ])
                    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, LEDDigit[parseInt(valStr[1], 10)])
                }
                digitValues[ClipBitDisplay.LEFT] = value
                digitStates[ClipBitDisplay.LEFT] = true
                return
            }
            if (value < 10) {
                writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_1, 0xFF)
                writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_0, LEDDigit[parseInt(valStr[0], 10)])
            } else {
                writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_1, LEDDigit[parseInt(valStr[0], 10)])
                writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_0, LEDDigit[parseInt(valStr[1], 10)])
            }
            digitValues[ClipBitDisplay.RIGHT] = value
            digitStates[ClipBitDisplay.RIGHT] = true
            return
        }

        value = Math.abs(value % 0xff)
        let lower = value % 16
        let upper = Math.floor(value / 16)

        if (display == ClipBitDisplay.LEFT) {
            writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, LEDDigit[upper])
            writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, LEDDigit[lower])
            digitValues[ClipBitDisplay.LEFT] = value
            digitStates[ClipBitDisplay.LEFT] = true
            return
        }
        writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_1, LEDDigit[upper])
        writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_0, LEDDigit[lower])
        digitValues[ClipBitDisplay.RIGHT] = value
        digitStates[ClipBitDisplay.RIGHT] = true
    }

    //% block="clear the $display ClipBit display"
    //% group="Digits"
    export function clearDigitDisplay( display : ClipBitDisplay ) {
        if( display == ClipBitDisplay.RIGHT ) {
            writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_1, 0xFF)
            writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_0, 0xFF)
            digitStates[ClipBitDisplay.RIGHT] = false
            return
        }
        writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, 0xFF)
        writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, 0xFF)
        digitStates[ClipBitDisplay.LEFT] = false
    }

    //% block="$display display value"
    //% group="Digits" advanced="true"
    export function getDigitValue(display: ClipBitDisplay = ClipBitDisplay.LEFT): number {
        return digitValues[display]
    }

    //% block="$display display is active"
    //% group="Digits" advanced="true"
    export function getDigitState(display: ClipBitDisplay = ClipBitDisplay.LEFT): boolean {
        return digitStates[display]
    }

    //% block="set ClipBit $display display to the text $value"
    //% group="Digits"
    export function setDigitText(display: ClipBitDisplay, value: string) {
        if( value.length < 2 )
            value = ' ' + value;
        
        let upper = LEDASCII[(value.charCodeAt(0) & 255) - 32] || 0b11111111 // Default to 'all off'
        let lower = LEDASCII[(value.charCodeAt(1) & 255) - 32] || 0b11111111

        if( display == ClipBitDisplay.LEFT ) {
            writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, upper)
            writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, lower)
            digitValues[ClipBitDisplay.LEFT] = 0
            digitStates[ClipBitDisplay.LEFT] = true
            return;
        }

        writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_0, lower)
        writeRegister(RIGHT_SEGMENT, PCA9555_CMD.OUTPUT_1, upper)
        digitValues[ClipBitDisplay.RIGHT] = 0
        digitStates[ClipBitDisplay.RIGHT] = true
    }

    //% shim=ClipBit::sendLogViaSerial
    export function sendLogViaSerial() {
        
    }

    control.runInBackground(() => {
        // Ensure we have up-to-date current values
        let old_a = readRegister(SYSTEM_IO, PCA9555_CMD.INPUT_0)
        let old_b = readRegister(SYSTEM_IO, PCA9555_CMD.INPUT_1)

        while (true) {
            // Read the new values
            let port_a = readRegister(SYSTEM_IO, PCA9555_CMD.INPUT_0)
            let port_b = readRegister(SYSTEM_IO, PCA9555_CMD.INPUT_1)

            if (port_a != old_a) {
                if ((port_a & ButtonMasks.C) != (old_a & ButtonMasks.C))
                    buttonEvent(ClipBitButton.C, (old_a & ButtonMasks.C) == ButtonMasks.C)
                if ((port_a & ButtonMasks.L1) != (old_a & ButtonMasks.L1))
                    buttonEvent(ClipBitButton.L1, (old_a & ButtonMasks.L1) == ButtonMasks.L1)
                if ((port_a & ButtonMasks.L2) != (old_a & ButtonMasks.L2))
                    buttonEvent(ClipBitButton.L2, (old_a & ButtonMasks.L2) == ButtonMasks.L2)
                if ((port_a & ButtonMasks.L3) != (old_a & ButtonMasks.L3))
                    buttonEvent(ClipBitButton.L3, (old_a & ButtonMasks.L3) == ButtonMasks.L3)
                if ((port_a & ButtonMasks.L4) != (old_a & ButtonMasks.L4))
                    buttonEvent(ClipBitButton.L4, (old_a & ButtonMasks.L4) == ButtonMasks.L4)
                if ((port_a & ButtonMasks.L5) != (old_a & ButtonMasks.L5))
                    buttonEvent(ClipBitButton.L5, (old_a & ButtonMasks.L5) == ButtonMasks.L5)
                if ((port_a & ButtonMasks.L6) != (old_a & ButtonMasks.L6))
                    buttonEvent(ClipBitButton.L6, (old_a & ButtonMasks.L6) == ButtonMasks.L6)
            }
            if (port_b != old_b) {
                if ((port_b & ButtonMasks.D) != (old_b & ButtonMasks.D))
                    buttonEvent(ClipBitButton.D, (old_b & ButtonMasks.D) == ButtonMasks.D)
                if ((port_b & ButtonMasks.R1) != (old_b & ButtonMasks.R1))
                    buttonEvent(ClipBitButton.R1, (old_b & ButtonMasks.R1) == ButtonMasks.R1)
                if ((port_b & ButtonMasks.R2) != (old_b & ButtonMasks.R2))
                    buttonEvent(ClipBitButton.R2, (old_b & ButtonMasks.R2) == ButtonMasks.R2)
                if ((port_b & ButtonMasks.R3) != (old_b & ButtonMasks.R3))
                    buttonEvent(ClipBitButton.R3, (old_b & ButtonMasks.R3) == ButtonMasks.R3)
                if ((port_b & ButtonMasks.R4) != (old_b & ButtonMasks.R4))
                    buttonEvent(ClipBitButton.R4, (old_b & ButtonMasks.R4) == ButtonMasks.R4)
                if ((port_b & ButtonMasks.R5) != (old_b & ButtonMasks.R5))
                    buttonEvent(ClipBitButton.R5, (old_b & ButtonMasks.R5) == ButtonMasks.R5)
                if ((port_b & ButtonMasks.R6) != (old_b & ButtonMasks.R6))
                    buttonEvent(ClipBitButton.R6, (old_b & ButtonMasks.R6) == ButtonMasks.R6)
            }
            
            // Sync with the old values
            old_a = port_a
            old_b = port_b

            pause( 50 )
        }
    })

}