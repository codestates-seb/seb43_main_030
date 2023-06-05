/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module image/image/utils
 */
import type { DocumentSelection, MatcherPattern, Schema, Selection, ViewContainerElement, DowncastWriter } from 'ckeditor5/src/engine';
import type { Editor } from 'ckeditor5/src/core';
/**
 * Creates a view element representing the inline image.
 *
 * ```html
 * <span class="image-inline"><img></img></span>
 * ```
 *
 * Note that `alt` and `src` attributes are converted separately, so they are not included.
 *
 * @internal
 */
export declare function createInlineImageViewElement(writer: DowncastWriter): ViewContainerElement;
/**
 * Creates a view element representing the block image.
 *
 * ```html
 * <figure class="image"><img></img></figure>
 * ```
 *
 * Note that `alt` and `src` attributes are converted separately, so they are not included.
 *
 * @internal
 */
export declare function createBlockImageViewElement(writer: DowncastWriter): ViewContainerElement;
/**
 * A function returning a `MatcherPattern` for a particular type of View images.
 *
 * @internal
 * @param matchImageType The type of created image.
 */
export declare function getImgViewElementMatcher(editor: Editor, matchImageType: 'imageBlock' | 'imageInline'): MatcherPattern;
/**
 * Considering the current model selection, it returns the name of the model image element
 * (`'imageBlock'` or `'imageInline'`) that will make most sense from the UX perspective if a new
 * image was inserted (also: uploaded, dropped, pasted) at that selection.
 *
 * The assumption is that inserting images into empty blocks or on other block widgets should
 * produce block images. Inline images should be inserted in other cases, e.g. in paragraphs
 * that already contain some text.
 *
 * @internal
 */
export declare function determineImageTypeForInsertionAtSelection(schema: Schema, selection: Selection | DocumentSelection): 'imageBlock' | 'imageInline';
