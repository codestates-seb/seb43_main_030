/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/labeledfield/utils
 */
import InputTextView from '../inputtext/inputtextview';
import InputNumberView from '../inputnumber/inputnumberview';
import type LabeledFieldView from './labeledfieldview';
import type DropdownView from '../dropdown/dropdownview';
/**
 * A helper for creating labeled inputs.
 *
 * It creates an instance of a {@link module:ui/inputtext/inputtextview~InputTextView input text} that is
 * logically related to a {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView labeled view} in DOM.
 *
 * The helper does the following:
 *
 * * It sets input's `id` and `ariaDescribedById` attributes.
 * * It binds input's `isReadOnly` to the labeled view.
 * * It binds input's `hasError` to the labeled view.
 * * It enables a logic that cleans up the error when user starts typing in the input.
 *
 * Usage:
 *
 * ```ts
 * const labeledInputView = new LabeledFieldView( locale, createLabeledInputText );
 * console.log( labeledInputView.fieldView ); // A text input instance.
 * ```
 *
 * @param labeledFieldView The instance of the labeled field view.
 * @param viewUid An UID string that allows DOM logical connection between the
 * {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView#labelView labeled view's label} and the input.
 * @param statusUid An UID string that allows DOM logical connection between the
 * {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView#statusView labeled view's status} and the input.
 * @returns The input text view instance.
 */
export declare function createLabeledInputText(labeledFieldView: LabeledFieldView, viewUid: string, statusUid: string): InputTextView;
/**
 * A helper for creating labeled number inputs.
 *
 * It creates an instance of a {@link module:ui/inputnumber/inputnumberview~InputNumberView input number} that is
 * logically related to a {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView labeled view} in DOM.
 *
 * The helper does the following:
 *
 * * It sets input's `id` and `ariaDescribedById` attributes.
 * * It binds input's `isReadOnly` to the labeled view.
 * * It binds input's `hasError` to the labeled view.
 * * It enables a logic that cleans up the error when user starts typing in the input.
 *
 * Usage:
 *
 * ```ts
 * const labeledInputView = new LabeledFieldView( locale, createLabeledInputNumber );
 * console.log( labeledInputView.fieldView ); // A number input instance.
 * ```
 *
 * @param labeledFieldView The instance of the labeled field view.
 * @param viewUid An UID string that allows DOM logical connection between the
 * {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView#labelView labeled view's label} and the input.
 * @param statusUid An UID string that allows DOM logical connection between the
 * {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView#statusView labeled view's status} and the input.
 * @returns The input number view instance.
 */
export declare function createLabeledInputNumber(labeledFieldView: LabeledFieldView, viewUid: string, statusUid: string): InputNumberView;
/**
 * A helper for creating labeled dropdowns.
 *
 * It creates an instance of a {@link module:ui/dropdown/dropdownview~DropdownView dropdown} that is
 * logically related to a {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView labeled field view}.
 *
 * The helper does the following:
 *
 * * It sets dropdown's `id` and `ariaDescribedById` attributes.
 * * It binds input's `isEnabled` to the labeled view.
 *
 * Usage:
 *
 * ```ts
 * const labeledInputView = new LabeledFieldView( locale, createLabeledDropdown );
 * console.log( labeledInputView.fieldView ); // A dropdown instance.
 * ```
 *
 * @param labeledFieldView The instance of the labeled field view.
 * @param viewUid An UID string that allows DOM logical connection between the
 * {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView#labelView labeled view label} and the dropdown.
 * @param statusUid An UID string that allows DOM logical connection between the
 * {@link module:ui/labeledfield/labeledfieldview~LabeledFieldView#statusView labeled view status} and the dropdown.
 * @returns The dropdown view instance.
 */
export declare function createLabeledDropdown(labeledFieldView: LabeledFieldView, viewUid: string, statusUid: string): DropdownView;
