/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import type DocumentSelection from '../documentselection';
import type Model from '../model';
import type Range from '../range';
import type Selection from '../selection';
/**
 * Returns a model range which is optimal (in terms of UX) for inserting a widget block.
 *
 * For instance, if a selection is in the middle of a paragraph, the collapsed range before this paragraph
 * will be returned so that it is not split. If the selection is at the end of a paragraph,
 * the collapsed range after this paragraph will be returned.
 *
 * Note: If the selection is placed in an empty block, the range in that block will be returned. If that range
 * is then passed to {@link module:engine/model/model~Model#insertContent}, the block will be fully replaced
 * by the inserted widget block.
 *
 * **Note:** Use {@link module:widget/utils#findOptimalInsertionRange} instead of this function outside engine.
 * This function is only exposed to be used by {@link module:widget/utils#findOptimalInsertionRange findOptimalInsertionRange()}
 * in the `widget` package and inside the `engine` package.
 *
 * @param selection The selection based on which the insertion position should be calculated.
 * @param model Model instance.
 * @param place The place where to look for optimal insertion range.
 * The default `auto` value will determine itself the best position for insertion.
 * The `before` value will try to find a position before selection.
 * The `after` value will try to find a position after selection.
 * @returns The optimal range.
 */
export declare function findOptimalInsertionRange(selection: Selection | DocumentSelection, model: Model, place?: 'auto' | 'before' | 'after'): Range;
