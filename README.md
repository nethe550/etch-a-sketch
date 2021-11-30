# Etch-A-Sketch
An implementation of the popular toy using the HTML Canvas API and vanilla Javascript.

For an improved README, see [this](https://github.com/nethe550/etch-a-sketch/README.html) version.

<img align="left" width="191" height="158" style="border-radius:6px;" src="https://i.pinimg.com/originals/44/d7/ac/44d7ac222f3033492705a09e0bac7193.png" />

## Usage
The Etch-A-Sketch controller is re-useable and fully configurable, making it easy to implement into nearly any UI design.

<hr />

### Usage Requirements
- Required UI controls (clear button, sensitivity slider, line color, etc.). The default configuration specifies all required UI controls. 
- Credit to the author defined in the license. (nethe550)
...and that's it!

# Configuration
The default configuration:
```js
{
    // The button to clear the screen.
    clear: '#clear',
    sensitivity: {

        // The sensitivity slider (input of type 'range').
        slider: '#sensitivity',

        // The current sensitivity output label.
        label: '#sensitivity-value'

    },
    line: {

        // The line color input. (of type 'color')
        color: '#color',

        // The line size slider. (input of type 'range')
        size: '#size',

        // The current line size output label.
        label: '#size-value'

    },
    dpad: {

        // The up button for directional controls.
        up: '#up',

        // The left button for directional controls.
        left: '#left',

        // The down button for directional controls.
        down: '#down',

        // The right button for directional controls.
        right: '#right'

    }
}
```

# License
```
Copyright © 2021 nethe550

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
