/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/button/buttonview
 */
import View from '../view';
import IconView from '../icon/iconview';
import type ViewCollection from '../viewcollection';
import type { default as Button } from './button';
import { type Locale } from '@ckeditor/ckeditor5-utils';
import '../../theme/components/button/button.css';
/**
 * The button view class.
 *
 * ```ts
 * const view = new ButtonView();
 *
 * view.set( {
 * 	label: 'A button',
 * 	keystroke: 'Ctrl+B',
 * 	tooltip: true,
 * 	withText: true
 * } );
 *
 * view.render();
 *
 * document.body.append( view.element );
 * ```
 */
export default class ButtonView extends View<HTMLButtonElement> implements Button {
    /**
     * Collection of the child views inside of the button {@link #element}.
     */
    readonly children: ViewCollection;
    /**
     * Label of the button view. It is configurable using the {@link #label label attribute}.
     */
    readonly labelView: View;
    /**
     * The icon view of the button. Will be added to {@link #children} when the
     * {@link #icon icon attribute} is defined.
     */
    readonly iconView: IconView;
    /**
     * A view displaying the keystroke of the button next to the {@link #labelView label}.
     * Added to {@link #children} when the {@link #withKeystroke `withKeystroke` attribute}
     * is defined.
     */
    readonly keystrokeView: View;
    /**
     * @inheritDoc
     */
    class: string | undefined;
    /**
     * @inheritDoc
     */
    labelStyle: string | undefined;
    /**
     * @inheritDoc
     */
    icon: string | undefined;
    /**
     * @inheritDoc
     */
    isEnabled: boolean;
    /**
     * @inheritDoc
     */
    isOn: boolean;
    /**
     * @inheritDoc
     */
    isVisible: boolean;
    /**
     * @inheritDoc
     */
    isToggleable: boolean;
    /**
     * @inheritDoc
     */
    keystroke: string | undefined;
    /**
     * @inheritDoc
     */
    label: string | undefined;
    /**
     * @inheritDoc
     */
    tabindex: number;
    /**
     * @inheritDoc
     */
    tooltip: Button['tooltip'];
    /**
     * @inheritDoc
     */
    tooltipPosition: Button['tooltipPosition'];
    /**
     * @inheritDoc
     */
    type: Button['type'];
    /**
     * @inheritDoc
     */
    withText: boolean;
    /**
     * @inheritDoc
     */
    withKeystroke: boolean;
    /**
     * Tooltip of the button bound to the template.
     *
     * @see #tooltip
     * @see module:ui/button/buttonview~ButtonView#_getTooltipString
     * @internal
     * @observable
     */
    _tooltipString: string;
    /**
     * @inheritDoc
     */
    constructor(locale?: Locale);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Focuses the {@link #element} of the button.
     */
    focus(): void;
    /**
     * Creates a label view instance and binds it with button attributes.
     *
     * @param ariaLabelUid The aria label UID.
     */
    private _createLabelView;
    /**
     * Creates a view that displays a keystroke next to a {@link #labelView label }
     * and binds it with button attributes.
     */
    private _createKeystrokeView;
    /**
     * Gets the text for the tooltip from the combination of
     * {@link #tooltip}, {@link #label} and {@link #keystroke} attributes.
     *
     * @see #tooltip
     * @see #_tooltipString
     * @param tooltip Button tooltip.
     * @param label Button label.
     * @param keystroke Button keystroke.
     */
    private _getTooltipString;
}
