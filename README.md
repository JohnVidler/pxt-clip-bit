
> Open this page at [https://johnvidler.github.io/pxt-clip-bit/](https://johnvidler.github.io/pxt-clip-bit/)

![A ClipBit r3.0, in glorious Lancaster University red](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/clipbit-red.png)

## How to use this Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/johnvidler/pxt-clip-bit** and import

## Blocks

### Pixels and LEDs
These blocks control the two LEDs at the top of the Clip:bit, as well as the 12 full-colour RGB LEDs along both left and
right sides of the board. Each LED has an associated button, so we use the button name to address each LED as well.

---
![Set ClipBit LED x to on/off](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_led.png)
Turn on or off one of the Clip:bit LEDs.
This only affects the C and D LEDs as they can only be on or off, rather than the RGB ones for the Lx and Rx buttons.

---
![Turn off all ClipBit pixels](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/turn_off_all_clipbit_pixels.png)

Clears all color data for the pixels, and turns them off

---
![Clear ClipBit pixel x](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/clear_clipbit_pixel.png)

Clear a Clip:bit pixel. This effectively turns the LED off.

---
![Set ClipBit pixel brightness to x](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_pixel_brightness_to.png)

Sets the brightness of any pixels set after this point.

---
![set ClipBit pixel x to y](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_pixel_to.png)

Sets the pixel colour for each button on the Clip:Bit.
Note that while C and D are listed, the only colours those support are 'Red' and 'Black' which map to 'on' and 'off' respectively.

### Buttons

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/button_enum.png)

An enumerated list of valid buttons for the Clip:bit.

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/on_any_clipbit_button_pressed.png)

Code here will be run whenever any button is pressed

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/on_clipbit_button_pressed.png)

Run this code when the selected Clip:bit button is pressed down

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/on_clipbit_button_released.png)

Run this code when the selected Clip:bit button is released

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/is_button_pressed.png)

Is this button currently being pressed down?

### Digits

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_display_to_the_text.png)

Set the selected 7-segment display to show a (limited) set of characters.

The limitations of the 8 LEDs on a 7-segment display mean that some characters are rendered slightly
strangely, but most normal ASCII characters are possible to some degree.

Note that the display modules are only capable of showing two characters, and will not scroll longer messages.

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/clear_the_clipbit_display.png)

Clear the selected 7-segment display
This will turn the display off

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_display_to.png)

Render a number on one of the Clip:bit 7-segment displays
This supports either DECIMAL or HEXADECIMAL modes


## Advanced Blocks

The following blocks are included to allow more advanced interaction with the clip:bit, and can be found bit pressing the `... more` button in the Makecode interface when the Clip:bit extension is selected

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/the_clipbit_pixel_strip.png)

This variable returns the internal reference to the NeoPixel strip on the
Clip:Bit, so it can be used with the NeoPixel extension.

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/was_pressed.png)

Since we last checked, has this button been pressed?

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/get_clipbit_button_name_for.png)

Returns the button name (if set) for the supplied button

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_button_name_to.png)

Set the button name for the selected button.
This will be returned in the general button handler, and in calls to 'getButtonName'

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/display_is_active.png)

Checks to see if a display module is actively displaying anything

---
![Block Example](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/get_display_value.png)

Get the currently displayed value from the selected 7-segment display






#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
