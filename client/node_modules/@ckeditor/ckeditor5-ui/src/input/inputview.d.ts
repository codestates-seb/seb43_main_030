/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/input/inputview
 */
import View from '../view';
import { FocusTracker, type Locale } from '@ckeditor/ckeditor5-utils';
import '../../theme/components/input/input.css';
/**
 * The base input view class.
 */
export default class InputView extends View<HTMLInputElement> {
    /**
     * Stores information about the editor UI focus and propagates it so various plugins and components
     * are unified as a focus group.
     */
    readonly focusTracker: FocusTracker;
    /**
     * The value of the input.
     *
     * @observable
     */
    value: string | undefined;
    /**
     * The `id` attribute of the input (i.e. to pair with a `<label>` element).
     *
     * @observable
     */
    id: string | undefined;
    /**
     * The `placeholder` attribute of the input.
     *
     * @observable
     */
    placeholder: string | undefined;
    /**
     * Controls whether the input view is in read-only mode.
     *
     * @observable
     */
    isReadOnly: boolean;
    /**
     * Set to `true` when the field has some error. Usually controlled via
     * {@link module:ui/labeledinput/labeledinputview~LabeledInputView#errorText}.
     *
     * @observable
     */
    hasError: boolean;
    /**
     * The `id` of the element describing this field, e.g. when it has
     * some error; it helps screen readers read the error text.
     *
     * @observable
     */
    ariaDescribedById: string | undefined;
    /**
     * An observable flag set to `true` when the input is currently focused by the user.
     * Set to `false` otherwise.
     *
     * @readonly
     * @observable
     * @default false
     */
    isFocused: boolean;
    /**
     * An observable flag set to `true` when the input contains no text, i.e.
     * when {@link #value} is `''`, `null`, or `false`.
     *
     * @readonly
     * @observable
     * @default true
     */
    isEmpty: boolean;
    /**
     * Corresponds to the `inputmode` DOM attribute. Can be `text`, `numeric`, `decimal`, etc.
     *
     * @observable
     * @default 'text'
     */
    inputMode: string;
    /**
     * @inheritDoc
     */
    constructor(locale?: Locale);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
    /**
     * Moves the focus to the input and selects the value.
     */
    select(): void;
    /**
     * Focuses the input.
     */
    focus(): void;
    /**
     * Updates the {@link #isEmpty} property value on demand.
     */
    private _updateIsEmpty;
    /**
     * Sets the `value` property of the {@link #element DOM element} on demand.
     */
    private _setDomElementValue;
}
/**
 * Fired when the user types in the input. Corresponds to the native
 * DOM `input` event.
 *
 * @eventName ~InputView#input
 */
export type InputViewInputEvent = {
    name: 'input';
    args: [InputEvent];
};
