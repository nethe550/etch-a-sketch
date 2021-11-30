<div style="background-color:rgb(45,45,50);border-radius:6px;text-align:center;padding:2em;color:rgb(255,255,255);font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight:100;">
    <div style="display:flex;flex-direction:row;justify-content:center;align-items:center;">
        <h1 style="border:none;padding:1em 1em;font-weight:200;display:flex;flex-direction:row;align-items:center;column-gap:0.5em;">Etch-A-Sketch <code style="padding:0.25em;background-color:rgb(35,35,40);font-family:'Courier New', Courier, monospace;border-radius:6px;font-size:14px;color:rgb(200,175,100);">v 1.0.0</code></h1>
    </div>
    <p>An implementation of the popular toy using the HTML Canvas API and vanilla Javascript.</p>
    <hr style="width:70%;" />
    <br />
    <div style="display:flex;flex-direction:row;justify-content:center;padding:8px;column-gap:4em;flex-wrap:wrap;">
        <img src="https://i.pinimg.com/originals/44/d7/ac/44d7ac222f3033492705a09e0bac7193.png" width="191" height="158" style="border-radius:6px;" />
        <div style="flex-grow:1;max-width:60%;text-align:left;">
            <h1 style="font-weight:200;border:none;">Usage</h1>
            <p style="margin-left:2.5%;">
                The Etch-A-Sketch controller is re-usable and fully configurable, making it easy to implement into nearly any UI design.
                <br />
                <div style="margin-left:4%;">
                    <h2 style="font-weight:200">Usage Requirements:</h2>
                    <ul>
                        <li>
                            Required UI controls (clear button, sensitivity slider, line color, etc.).
                            <br />
                            The default configuration specifies all required UI controls.
                        </li>
                        <li>
                            Credit to the author defined in the <a style="color:rgb(64,128,255)" href="#mit-license">license</a>. (<a style="color:rgb(64,128,255)" href="https://github.com/nethe550">nethe550</a>)
                        </li>
                    </ul>
                    ...and thats it!
                    <br />
                    <br />
                    <br />
                    </div>
                </div>
            </div>
        </p>
    <div style="margin:0 auto;text-align:left;width:90%;">
        <h1 style="font-weight:200;border:none;">Configuration</h1>
        <div style="margin-left:2.5%;">
            <p>The default configuration:</p>
            <pre style="font-family:'Courier New', Courier, monospace;color:rgb(200,175,100);border-radius:6px;">
{
    <span style="color:rgb(175,255,175);">// The button to clear the screen.</span>
    clear: <span style="color:rgb(100,200,255);">'#clear'</span>,
    sensitivity: {
        <span style="color:rgb(175,255,175);">// The sensitivity slider (input of type 'range').</span>
        slider: <span style="color:rgb(100,200,255);">'#sensitivity'</span>,<br />
        <span style="color:rgb(175,255,175);">// The sensitivity output label. Displays the current sensitivity.</span>
        label: <span style="color:rgb(100,200,255);">'#sensitivity-value'</span>
    },
    line: {
        <span style="color:rgb(175,255,175);">// The line color input. (of type 'color')</span>
        color: <span style="color:rgb(100,200,255);">'#color'</span>,<br />
        <span style="color:rgb(175,255,175);">// The line size slider. (input of type 'range')</span>
        size: <span style="color:rgb(100,200,255);">'#size'</span>,<br />
        <span style="color:rgb(175,255,175);">// The line size output label. Displays the current line size.</span>
        label: <span style="color:rgb(100,200,255);">'#size-value'</span>
    },
    dpad: {
        <span style="color:rgb(175,255,175);">// The up button for directional controls.</span>
        up: <span style="color:rgb(100,200,255);">'#up'</span>,<br />
        <span style="color:rgb(175,255,175);">// The left button for directional controls.</span>
        left: <span style="color:rgb(100,200,255);">'#left'</span>,<br />
        <span style="color:rgb(175,255,175);">// The down button for directional controls.</span>
        down: <span style="color:rgb(100,200,255);">'#down'</span>,<br />
        <span style="color:rgb(175,255,175);">// The right button for directional controls.</span>
        right: <span style="color:rgb(100,200,255);">'#right'</span>
    }
}
            </pre>  
        </div>
    </div>
    <br />
    <br />
    <hr style="width:70%" />
    <br />
    <br />
    <div id="mit-license" style="text-align:left;margin:0 auto;width:90%;">
        <div style="display:flex;flex-direction:row;column-gap:4em;margin-right:4em;">
            <h1 style="font-weight:200;word-wrap:nowrap;white-space:nowrap;align-self:center;border:none;">The MIT License</h1>
            <h2 style="font-weight:200;margin-left:auto;">(<a href="https://mit-license.org/">MIT</a>)</h2>
        </div>
        <br />
        <div style="margin-left:2.5%;">
            <pre style="font-family:'Courier New', Courier, monospace;text-align:left;justify-self:flex-start;padding:0.5em;background-color:rgb(35,35,40);border-radius:6px;flex-grow:1;color:rgb(200,175,100;overflow:auto;display:block;">
Copyright © 2021 nethe550
<br/>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </pre>
        </div>
    </div>
</div>