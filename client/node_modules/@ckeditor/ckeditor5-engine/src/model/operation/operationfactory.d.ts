/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import Operation from './operation';
import type Document from '../document';
/**
 * A factory class for creating operations.
 */
export default abstract class OperationFactory {
    /**
     * Creates an operation instance from a JSON object (parsed JSON string).
     *
     * @param json Deserialized JSON object.
     * @param document Document on which this operation will be applied.
     */
    static fromJSON(json: any, document: Document): Operation;
}
