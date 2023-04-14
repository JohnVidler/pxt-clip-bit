//% blockNamespace=ClipBit
enum ClipBitButton {
    L1, L2, L3, L4, L5, L6,
    R1, R2, R3, R4, R5, R6,
    C, D
}

//% blockNamespace=ClipBit
enum ClipBitLED { C, D }

/**
 * Events are functions that take a function (lambda) as the last argument
 */
//% color="#AA278D"
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
        C = 0b00000001,
        L1 = 0b00000100,
        L2 = 0b00001000,
        L3 = 0b00010000,
        L4 = 0b00100000,
        L5 = 0b01000000,
        L6 = 0b10000000,
        D = 0b10000000,
        R1 = 0b00100000,
        R2 = 0b00010000,
        R3 = 0b00001000,
        R4 = 0b00000100,
        R5 = 0b00000010,
        R6 = 0b00000001
    }

    function writeRegister(address: number, register: number, value: number) {
        pins.i2cWriteBuffer(address, Buffer.fromArray([register, value]), false)
    }

    function readRegister(address: number, register: number) {
        pins.i2cWriteNumber(address, register, NumberFormat.UInt8BE, false)
        return pins.i2cReadNumber(address, NumberFormat.UInt8BE, false)
    }

    writeRegister(SYSTEM_IO, PCA9555_CMD.CONFIG_0, 0b11111101)
    writeRegister(SYSTEM_IO, PCA9555_CMD.CONFIG_1, 0b10111111)

    writeRegister(SYSTEM_IO, PCA9555_CMD.OUTPUT_0, 0b00000010)
    writeRegister(SYSTEM_IO, PCA9555_CMD.OUTPUT_1, 0b01000000)

    writeRegister(LEFT_SEGMENT, PCA9555_CMD.CONFIG_0, 0x00)
    writeRegister(LEFT_SEGMENT, PCA9555_CMD.CONFIG_1, 0x00)

    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_0, 0x00);
    writeRegister(LEFT_SEGMENT, PCA9555_CMD.OUTPUT_1, 0xFF);

    // Will be our PWM pin for 7-seg brightness, but just go fullbright for now
    pins.digitalWritePin(DigitalPin.P6, 0);
    //pins.analogWritePin( AnalogPin.P6, 800 )

    let pressHandlers: { [key: number]: () => void } = {};
    let releaseHandlers: { [key: number]: () => void } = {};

    function buttonEvent(button: ClipBitButton, state: boolean) {
        if( state ) {
            if (pressHandlers[button])
                pressHandlers[button]();
        } else {
            if (releaseHandlers[button])
                releaseHandlers[button]();
        }
    }

    //% block="on ClipBit button $button pressed"
    export function onClipBitButtonPressed(button: ClipBitButton = ClipBitButton.L1, handler: () => void) {
        pressHandlers[button] = handler;
    }

    //% block="on ClipBit button $button released"
    export function onClipBitButtonReleased(button: ClipBitButton = ClipBitButton.L1, handler: () => void) {
        releaseHandlers[button] = handler;
    }

    //% block="set ClipBit LED $led to $on"
    //% on.shadow="toggleOnOff"
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