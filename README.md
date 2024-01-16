
> Open this page at [https://johnvidler.github.io/pxt-clip-bit/](https://johnvidler.github.io/pxt-clip-bit/)

![A ClipBit r3.0, in glorious Lancaster University red](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/clipbit-red.png)

# How to use this Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/johnvidler/pxt-clip-bit** and import

**OR** simply click [this link and make a copy of the example project to have everything automatically imported](https://makecode.microbit.org/_CfaTvuAoa8mM) for you!

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
![A button or LED reference](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/button_enum.png)

Used to select a single button reference from the drop-down list for any of the button or pixel command blocks

---
![on ClipBit button x pressed named y](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/on_any_clipbit_button_pressed.png)

The enclosed code here will be run whenever any button is pressed, and the of the button (if set) will also be supplied.

---
![on ClipBit button x pressed](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/on_clipbit_button_pressed.png)

Run the enclosed code when the selected Clip:bit button is pressed down

---
![on ClipBit button x released](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/on_clipbit_button_released.png)

Run the enclosed code when the selected Clip:bit button is released

---
![is button x pressed?](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/is_button_pressed.png)

Returns TRUE if the selected button currently being pressed down?

### Digits

---
![set ClipBit x display to the text y](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_display_to_the_text.png)

Set the selected 7-segment display to show a (limited) set of characters.

The limitations of the 8 LEDs on a 7-segment display mean that some characters are rendered slightly
strangely, but most normal ASCII characters are possible to some degree.

Note that the display modules are only capable of showing two characters, and will not scroll longer messages.

---
![clear the x ClipBit display](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/clear_the_clipbit_display.png)

Clear the selected 7-segment display
This will turn the display off

---
![set ClipBit x display to number y in format z](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_display_to.png)

Render a number on one of the Clip:bit 7-segment displays
This supports either DECIMAL or HEXADECIMAL modes


## Advanced Blocks

The following blocks are included to allow more advanced interaction with the clip:bit, and can be found bit pressing the `... more` button in the Makecode interface when the Clip:bit extension is selected

---
![The clipbit pixel 'strip'](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/the_clipbit_pixel_strip.png)

This variable returns the internal reference to the NeoPixel strip on the Clip:Bit, so it can be used with the NeoPixel extension.

---
![was button x pressed](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/was_pressed.png)

Since we last checked (when we last used this function for this button), has the button been pressed?

---
![get ClipBit button name for button x](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/get_clipbit_button_name_for.png)

Returns the button name (if set) for the supplied button

---
![set CliptBit button x name to y](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/set_clipbit_button_name_to.png)

Set the button name for the selected button.
This will be returned in the general button handler, and in calls to 'getButtonName'.

---
![is display x active](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/display_is_active.png)

Checks to see if a display module is actively displaying anything.

---
![get display x value](https://github.com/johnvidler/pxt-clip-bit/raw/master/.github/makecode/get_display_value.png)

Get the currently displayed value from the selected 7-segment display.



# Technical Details and Publications

Technical details of the board can be found here: https://johnvidler.co.uk/blog/the-clipbit-an-addon-for-the-microbit/

The Clip:bit has been used in the following academic publications:

> Lorraine Underwood, Elizabeth Edwards, John Edward Vidler, Elisa Rubegni, and Joe Finney. 2023. Introducing Classroom Cloudlet: a mobile, tangible, and transparent approach to Internet of Things education. In Proceedings of the 22nd Annual ACM Interaction Design and Children Conference (IDC '23). Association for Computing Machinery, New York, NY, USA, 740–744. https://doi.org/10.1145/3585088.3594487

> Elizabeth Edwards, John Edward Vidler, Lorraine Underwood, Elisa Rubegni, and Joe Finney. 2023. Supporting fieldwork for primary education with computing - micro:bit, clip:bit and game controllers. In Proceedings of the 22nd Annual ACM Interaction Design and Children Conference (IDC '23). Association for Computing Machinery, New York, NY, USA, 553–557. https://doi.org/10.1145/3585088.3593897

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
