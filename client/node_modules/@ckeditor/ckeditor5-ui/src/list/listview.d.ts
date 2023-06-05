/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/list/listview
 */
import View from '../view';
import type DropdownPanelFocusable from '../dropdown/dropdownpanelfocusable';
import type ViewCollection from '../viewcollection';
import { FocusTracker, KeystrokeHandler, type Locale } from '@ckeditor/ckeditor5-utils';
import '../../theme/components/list/list.css';
/**
 * The list view class.
 */
export default class ListView extends View<HTMLUListElement> implements DropdownPanelFocusable {
    /**
     * Collection of the child list views.
     */
    readonly items: ViewCollection;
    /**
     * Tracks information about DOM focus in the list.
     */
    readonly focusTracker: FocusTracker;
    /**
     * Instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     */
    readonly keystrokes: KeystrokeHandler;
    /**
     * Label used by assistive technologies to describe this list element.
     *
     * @observable
     */
    ariaLabel: string | undefined;
    /**
     * Helps cycling over focusable {@link #items} in the list.
     */
    private readonly _focusCycler;
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
     * Focuses the first focusable in {@link #items}.
     */
    focus(): void;
    /**
     * Focuses the last focusable in {@link #items}.
     */
    focusLast(): void;
}
