/**
 * @author nethe550
 * @description The Etch-A-Sketch manager class.
 */

const DEFAULT_SENSITIVITY = 5;

const DEFAULT_LINE = {
    color: '#ffffff',
    size: 1
}

const DEFAULT_CONFIG = {
    clear: '#clear',
    sensitivity: {
        slider: '#sensitivity',
        label: '#sensitivity-value'
    },
    line: {
        color: '#color',
        size: '#size',
        label: '#size-value'
    },
    dpad: {
        up: '#up',
        left: '#left',
        down: '#down',
        right: '#right'
    }
}

/**
 * Clamps a value to the specified range.
 * @param {number} value - The value to clamp.
 * @param {number} min - The minimum value in range.
 * @param {number} max - The maximum value in range.
 * @returns {number} - The clamped value.
 */
const clamp = (value, min, max) => {

    if (value > max) return max;
    if (value < min) return min;
    return value;

}

/**
 * @typedef {{ clear: string|HTMLButtonElement|HTMLInputElement, sensitivity: { slider: string|HTMLInputElement, label: string|HTMLElement }, line: { color: string|HTMLInputElement, size: string|HTMLInputElement, label: string|HTMLElement }, dpad: { up: string|HTMLButtonElement|HTMLInputElement, left: string|HTMLButtonElement|HTMLInputElement, down: string|HTMLButtonElement|HTMLInputElement, right: string|HTMLButtonElement|HTMLInputElement } }} EtchASketchConfig
 * @typedef {[ { x1: number, y1: number, x2: number, y2: number } ]} EtchASketchImage
 * @typedef {{ x: number, y: number }} Cursor
 */

/**
 * An enumeration of movement directions.
 * @enum {number}
 */
const Direction = {
    UP: 0x0,
    LEFT: 0x1,
    DOWN: 0x2,
    RIGHT: 0x3
};

/**
 * @class
 */
class EtchASketch {

    /**
     * Creates a new Etch-A-Sketch manager.
     * @param {string} selector - The CSS selector of the display canvas.
     * @param {string} parentSelector - The CSS selector of the display canvas's parent.
     * @param {EtchASketchConfig} config - The Etch-A-Sketch configuration to use.
     * @param {boolean} autoResize - Whether to automatically resize the display canvas.
     */
    constructor(selector, parentSelector, config=DEFAULT_CONFIG, autoResize=true) {

        /**
         * @type {HTMLCanvasElement}
         */
        this.display = document.querySelector(selector);

        if (!this.display) throw new ReferenceError(`No display element found with selector '${selector}'.`);
        if (!HTMLCanvasElement.prototype.isPrototypeOf(this.display)) throw new TypeError(`Display element with selector '${selector}' is not a valid HTML canvas.`);

        /**
         * @type {HTMLElement}
         */
        this.parent = document.querySelector(parentSelector);

        if (!this.parent) throw new ReferenceError(`No display wrapper element found with selector '${parentSelector}'.`);
        if (!HTMLDivElement.prototype.isPrototypeOf(this.parent)) {
            console.warn(`Parent display element '${parentSelector}' is not a HTMLDivElement. This may cause issues with auto-resizing displays. Disabling auto-resizing.`);
            autoResize = false;
        }

        /**
         * @type {EtchASketchConfig}
         */
        this.config = this.validateConfig(config);

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = this.display.getContext('2d');

        /**
         * @type {Cursor}
         */
        this.cursor = { x: Math.floor(this.display.width / 2), y: Math.floor(this.display.height / 2) };

        /**
         * @type {number}
         */
        this.cursorSensitivity = DEFAULT_SENSITIVITY;

        /**
         * @type {string}
         */
        this.lineColor = DEFAULT_LINE.color;

        /**
         * @type {number}
         */
        this.lineSize = DEFAULT_LINE.size;

        /**
         * @type {EtchASketchImage}
         */
        this.image = [{ x1: this.cursor.x, y1: this.cursor.y, x2: this.cursor.x, y2: this.cursor.y }]; // init image with cursor pos

        this.registerListeners(autoResize);
        this.update();

    }

    /**
     * Validates an Etch-A-Sketch controls configuration object, and will convert any CSS selectors into their respective HTML elements.
     * @param {EtchASketchConfig} config - The Etch-A-Sketch controls configuration object to verify.
     * @returns {EtchASketchConfig} - The valid Etch-A-Sketch controls, or throws an error if invalid.
     */
    validateConfig(config) {

        try {
            if (!config) throw new TypeError(`Etch-A-Sketch configuration must be defined, or use the default configuration.`);
            if (!config['clear']) throw new ReferenceError(`Etch-A-Sketch configuration specified is missing property 'clear'. (typeof string)`);
            if (!config['sensitivity']) throw new ReferenceError(`Etch-A-Sketch configuration specified is missing property 'sensitivity'. (typeof object)`);
            if (!config['line']) throw new ReferenceError(`Etch-A-Sketch configuration specified is missing property 'line'. (typeof object)`);
            if (!config['dpad']) throw new ReferenceError(`Etch-A-Sketch configuration specified is missing property 'dpad'. (typeof object)`);
            if (!config['dpad']['up']) throw new ReferenceError(`Etch-A-Sketch dpad configuration specified is missing property 'up'. (typeof string)`);
            if (!config['dpad']['left']) throw new ReferenceError(`Etch-A-Sketch dpad configuration specified is missing property 'left'. (typeof string)`);
            if (!config['dpad']['down']) throw new ReferenceError(`Etch-A-Sketch dpad configuration specified is missing property 'down'. (typeof string)`);
            if (!config['dpad']['right']) throw new ReferenceError(`Etch-A-Sketch dpad configuration specified is missing property 'right'. (typeof string)`);

            // clear
            if (typeof config.clear != 'string' &&
                !HTMLButtonElement.prototype.isPrototypeOf(config.clear) &&
                !HTMLInputElement.prototype.isPrototypeOf(config.clear)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'clear' must be of type string, HTMLButtonElement, or HTMLInputElement.`);
            }

            // sensitivity
            if (typeof config.sensitivity != 'object') throw new TypeError(`Etch-A-Sketch configuration property 'sensitivity' must of of type Object.`);

            // line
            if (typeof config.line != 'object') throw new TypeError(`Etch-A-Sketch configuration property 'line' must of of type Object.`);

            // dpad
            if (typeof config.dpad != 'object') throw new TypeError(`Etch-A-Sketch configuration property 'dpad' must of of type Object.`);

            // sensitivity
            if (typeof config.sensitivity.slider != 'string' &&
                !HTMLInputElement.prototype.isPrototypeOf(config.sensitivity.slider)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'sensitivity.slider' must be of type string or HTMLInputElement.`);
            }

            if (typeof config.sensitivity.label != 'string' &&
                !HTMLElement.prototype.isPrototypeOf(config.sensitivity.label)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'sensitivity.label' must be of type string or HTMLElement.`);
            }

            // line
            if (typeof config.line.color != 'string' &&
                !HTMLInputElement.prototype.isPrototypeOf(config.line.color)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'line.color' must be of type string or HTMLInputElement.`);
            }

            if (typeof config.line.size != 'string' &&
                !HTMLElement.prototype.isPrototypeOf(config.line.size)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'line.size' must be of type string or HTMLInputElement.`);
            }

            if (typeof config.line.label != 'string' &&
                !HTMLElement.prototype.isPrototypeOf(config.line.label)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'line.label' must be of type string or HTMLElement.`);
            }

            // dpad
            if (typeof config.dpad.up != 'string' &&
                !HTMLButtonElement.prototype.isPrototypeOf(config.dpad.up) &&
                !HTMLInputElement.prototype.isPrototypeOf(config.dpad.up)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'dpad.up' must be of type string, HTMLButtonElement, or HTMLInputElement.`);
            }

            if (typeof config.dpad.left != 'string' &&
                !HTMLButtonElement.prototype.isPrototypeOf(config.dpad.left) &&
                !HTMLInputElement.prototype.isPrototypeOf(config.dpad.left)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'dpad.left' must be of type string, HTMLButtonElement, or HTMLInputElement.`);
            }

            if (typeof config.dpad.down != 'string' &&
                !HTMLButtonElement.prototype.isPrototypeOf(config.dpad.down) &&
                !HTMLInputElement.prototype.isPrototypeOf(config.dpad.down)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'dpad.down' must be of type string, HTMLButtonElement, or HTMLInputElement.`);
            }

            if (typeof config.dpad.right != 'string' &&
                !HTMLButtonElement.prototype.isPrototypeOf(config.dpad.right) &&
                !HTMLInputElement.prototype.isPrototypeOf(config.dpad.right)) {
                
                throw new TypeError(`Etch-A-Sketch configuration property 'dpad.right' must be of type string, HTMLButtonElement, or HTMLInputElement.`);
            }

            // clear
            if (typeof config.clear == 'string') {

                const selector = config.clear;
                config.clear = document.querySelector(selector);
                if (!config.clear) throw new ReferenceError(`Could not find Etch-A-Sketch control 'clear' with selector '${selector}'.`);

            }

            // sensitivity
            if (typeof config.sensitivity.slider == 'string') {

                const selector = config.sensitivity.slider;
                config.sensitivity.slider = document.querySelector(selector);
                if (!config.sensitivity.slider) throw new ReferenceError(`Could not find Etch-A-Sketch control 'sensitivity.slider' with selector '${selector}'.`);

            }

            if (typeof config.sensitivity.label == 'string') {

                const selector = config.sensitivity.label;
                config.sensitivity.label = document.querySelector(selector);
                if (!config.sensitivity.label) throw new ReferenceError(`Could not find Etch-A-Sketch control 'sensitivity.label' with selector '${selector}'.`);

            }

            // line
            if (typeof config.line.color == 'string') {

                const selector = config.line.color;
                config.line.color = document.querySelector(selector);
                if (!config.line.color) throw new ReferenceError(`Could not find Etch-A-Sketch control 'line.color' with selector '${selector}'.`);

            }

            if (typeof config.line.size == 'string') {

                const selector = config.line.size;
                config.line.size = document.querySelector(selector);
                if (!config.line.size) throw new ReferenceError(`Could not find Etch-A-Sketch control 'line.size' with selector '${selector}'.`);

            }

            if (typeof config.line.label == 'string') {

                const selector = config.line.label;
                config.line.label = document.querySelector(selector);
                if (!config.line.label) throw new ReferenceError(`Could not find Etch-A-Sketch control 'line.label' with selector '${selector}'.`);

            }

            // dpad
            if (typeof config.dpad.up === 'string') {

                const selector = config.dpad.up;
                config.dpad.up = document.querySelector(selector);
                if (!config.dpad.up) throw new ReferenceError(`Could not find Etch-A-Sketch control 'dpad.up' with selector '${selector}'.`);

            }

            if (typeof config.dpad.left === 'string') {

                const selector = config.dpad.left;
                config.dpad.left = document.querySelector(selector);
                if (!config.dpad.left) throw new ReferenceError(`Could not find Etch-A-Sketch control 'dpad.left' with selector '${selector}'.`);

            }

            if (typeof config.dpad.down === 'string') {

                const selector = config.dpad.down;
                config.dpad.down = document.querySelector(selector);
                if (!config.dpad.down) throw new ReferenceError(`Could not find Etch-A-Sketch control 'dpad.down' with selector '${selector}'.`);

            }

            if (typeof config.dpad.right === 'string') {

                const selector = config.dpad.right;
                config.dpad.right = document.querySelector(selector);
                if (!config.dpad.right) throw new ReferenceError(`Could not find Etch-A-Sketch control 'dpad.right' with selector '${selector}'.`);

            }

            return config;
        }
        catch (e) {

            console.info('%cThe configuration passed to the Etch-A-Sketch\nconstructor is invalid. \n\nSee the error below:', 'font-size: 14px; color: rgb(255,128,128);');
            throw e;

        }

    }

    /**
     * Adds relevant event listeners to configured inputs and the window to connect user features.
     * @function
     * @param {boolean} autoResize - Whether to automatically resize the display.
     */
    registerListeners(autoResize=true) {

        if (autoResize) {
            const resizeDisplayDimensions = (init=false) => {
    
                this.display.width = this.display.parentElement.clientWidth;
                this.display.height = this.display.parentElement.clientHeight - 4;
                
                if (init) {
                    this.clearScreen();
                    this.cursor = { x: Math.floor(this.display.width / 2), y: Math.floor(this.display.height / 2) };
                }

            };
    
            window.addEventListener('DOMContentLoaded', () => resizeDisplayDimensions.bind(this)(true), false);
            window.addEventListener('resize', () => resizeDisplayDimensions.bind(this)(false), false);
        }

        window.addEventListener('DOMContentLoaded', () => {
            this.config.sensitivity.slider.value = '5';
            this.config.line.color.value = '#ffffff';
            this.config.line.size.value = '1';
        });

        this.config.clear.addEventListener('click', this.clearScreen.bind(this), false);

        this.config.sensitivity.slider.addEventListener('input', this.adjustSensitivity.bind(this), false);
        this.config.sensitivity.slider.addEventListener('keydown', (e) => e.preventDefault(), false);

        this.config.line.color.addEventListener('change', this.adjustLineColor.bind(this), false);
        this.config.line.size.addEventListener('input', this.adjustLineSize.bind(this), false);
        this.config.line.size.addEventListener('keydown', (e) => e.preventDefault(), false);

        this.config.dpad.up.addEventListener('click', () => this.moveCursor.bind(this)(Direction.UP), false);
        this.config.dpad.left.addEventListener('click', () => this.moveCursor.bind(this)(Direction.LEFT), false);
        this.config.dpad.down.addEventListener('click', () => this.moveCursor.bind(this)(Direction.DOWN), false);
        this.config.dpad.right.addEventListener('click', () => this.moveCursor.bind(this)(Direction.RIGHT), false);

        window.addEventListener('keydown', (e) => {

            switch (e.code) {

                case 'ArrowUp':
                    return this.moveCursor.bind(this)(Direction.UP);

                case 'ArrowLeft':
                    return this.moveCursor.bind(this)(Direction.LEFT);

                case 'ArrowDown':
                    return this.moveCursor.bind(this)(Direction.DOWN);

                case 'ArrowRight':
                    return this.moveCursor.bind(this)(Direction.RIGHT);

                default: return;

            }

        });

        window.onbeforeunload = (e) => {
            
            if (this.image.length > 1) {
                e = e || window.event;
    
                const unloadMessage = 'Warning: Unloading this page will cause you to lose all drawing data.';
    
                if (e) e.returnValue = unloadMessage;
    
                return unloadMessage;
            }

        };

    }

    /**
     * Adjusts the cursor sensitivity based on the configured sensitivity slider.
     */
    adjustSensitivity() {

        this.cursorSensitivity = parseInt(this.config.sensitivity.slider.value);
        this.config.sensitivity.label.innerText = this.cursorSensitivity;

    }

    /**
     * Adjusts the line color based on the configured color input.
     */
    adjustLineColor() {

        this.lineColor = this.config.line.color.value;

    }

    /**
     * Adjusts the line size based on the configured size slider.
     */
    adjustLineSize() {

        this.lineSize = parseInt(this.config.line.size.value);
        this.config.line.label.innerText = this.lineSize + 'px';

    }

    /**
     * Moves the cursor according to the specified direction.
     * @param {(0x0|0x1|0x2|0x3|0x4)} direction - The direction to move the cursor in.
     */
    moveCursor(direction) {

        let prevX = 0;
        let prevY = 0;

        switch (direction) {

            case Direction.UP:
                prevX = this.cursor.x;
                prevY = this.cursor.y;
                this.cursor.y -= this.cursorSensitivity;
                break;

            case Direction.LEFT:
                prevX = this.cursor.x;
                prevY = this.cursor.y;
                this.cursor.x -= this.cursorSensitivity;
                break;

            case Direction.DOWN:
                prevX = this.cursor.x;
                prevY = this.cursor.y;
                this.cursor.y += this.cursorSensitivity;
                break;
            
            case Direction.RIGHT:
                prevX = this.cursor.x;
                prevY = this.cursor.y;
                console.log(this.cursor.x);
                this.cursor.x += this.cursorSensitivity;
                break;

        }

        let prevCursorX = this.cursor.x;
        let prevCursorY = this.cursor.y;

        this.cursor.x = clamp(Math.floor(this.cursor.x), 0, this.display.width);
        this.cursor.y = clamp(Math.floor(this.cursor.y), 0, this.display.height);


        if (this.cursor.x == prevCursorX && this.cursor.y == prevCursorY) this.image.push({ x1: prevX, y1: prevY, x2: this.cursor.x, y2: this.cursor.y });

    }

    /**
     * Clears the display.
     * @param {boolean} deleteImage - Whether to delete the image too.
     */
    clearScreen(deleteImage=false) {

        const prevStyle = this.ctx.fillStyle;

        this.ctx.fillStyle = 'rgb(65,65,70)';
        this.ctx.fillRect(0, 0, this.display.width, this.display.height);

        this.ctx.fillStyle = prevStyle;

        if (deleteImage) this.image = [];

    }

    /**
     * Renders the cursor.
     */
    renderCursor() {

        const prevStyle = this.ctx.fillStyle;

        this.ctx.fillStyle = 'rgba(128,128,128,0.5)';

        const lineWidth = 1;
        const lineLength = 10;

        // top
        this.ctx.fillRect(this.cursor.x - lineWidth / 2, this.cursor.y - lineLength, lineWidth, lineLength);
        // left
        this.ctx.fillRect(this.cursor.x - lineLength, this.cursor.y - lineWidth / 2, lineLength, lineWidth);
        // bottom
        this.ctx.fillRect(this.cursor.x - lineWidth / 2, this.cursor.y - lineWidth / 2, lineWidth, lineLength);
        // right
        this.ctx.fillRect(this.cursor.x - lineWidth / 2, this.cursor.y - lineWidth / 2, lineLength, lineWidth);

        this.ctx.fillStyle = prevStyle;

    }

    /**
     * Renders the drawn image.
     */
    renderImage() {

        this.clearScreen(false);

        if (this.image.length > 0) {

            this.ctx.strokeStyle = this.lineColor;
            this.ctx.lineWidth = this.lineSize;
            this.ctx.lineJoin = 'miter';
    
            this.image.map((line) => {

                this.ctx.beginPath();

                this.ctx.moveTo(line.x1, line.y1);
                this.ctx.lineTo(line.x2, line.y2);

                this.ctx.stroke();

            });

        }

    }

    /**
     * Called when a display update is required.
     */
    update() {

        // delete excess image points if too long.
        if (this.image.length > 25565) this.image.splice(0, 1);

        this.renderImage();
        this.renderCursor();

        setTimeout(this.update.bind(this), 3.3333); // 300 fps

    }

}