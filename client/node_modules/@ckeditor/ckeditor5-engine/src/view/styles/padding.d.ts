/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module engine/view/styles/padding
 */
import type { StylesProcessor } from '../stylesmap';
/**
 * Adds a margin CSS styles processing rules.
 *
 * ```ts
 * editor.data.addStyleProcessorRules( addPaddingRules );
 * ```
 *
 * The normalized value is stored as:
 *
 * ```ts
 * const styles = {
 * 	padding: {
 * 		top,
 * 		right,
 * 		bottom,
 * 		left
 * 	}
 * };
 * ```
 */
export declare function addPaddingRules(stylesProcessor: StylesProcessor): void;
