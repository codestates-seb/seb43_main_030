/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ui/button/buttonview
 */
import View from '../view';
import IconView from '../icon/iconview';
import { env, getEnvKeystrokeText, uid } from '@ckeditor/ckeditor5-utils';
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
export default class ButtonView extends View {
    /**
     * @inheritDoc
     */
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        const ariaLabelUid = uid();
        // Implement the Button interface.
        this.set('class', undefined);
        this.set('labelStyle', undefined);
        this.set('icon', undefined);
        this.set('isEnabled', true);
        this.set('isOn', false);
        this.set('isVisible', true);
        this.set('isToggleable', false);
        this.set('keystroke', undefined);
        this.set('label', undefined);
        this.set('tabindex', -1);
        this.set('tooltip', false);
        this.set('tooltipPosition', 's');
        this.set('type', 'button');
        this.set('withText', false);
        this.set('withKeystroke', false);
        this.children = this.createCollection();
        this.labelView = this._createLabelView(ariaLabelUid);
        this.iconView = new IconView();
        this.iconView.extendTemplate({
            attributes: {
                class: 'ck-button__icon'
            }
        });
        this.keystrokeView = this._createKeystrokeView();
        this.bind('_tooltipString').to(this, 'tooltip', this, 'label', this, 'keystroke', this._getTooltipString.bind(this));
        const template = {
            tag: 'button',
            attributes: {
                class: [
                    'ck',
                    'ck-button',
                    bind.to('class'),
                    bind.if('isEnabled', 'ck-disabled', value => !value),
                    bind.if('isVisible', 'ck-hidden', value => !value),
                    bind.to('isOn', value => value ? 'ck-on' : 'ck-off'),
                    bind.if('withText', 'ck-button_with-text'),
                    bind.if('withKeystroke', 'ck-button_with-keystroke')
                ],
                type: bind.to('type', value => value ? value : 'button'),
                tabindex: bind.to('tabindex'),
                'aria-labelledby': `ck-editor__aria-label_${ariaLabelUid}`,
                'aria-disabled': bind.if('isEnabled', true, value => !value),
                'aria-pressed': bind.to('isOn', value => this.isToggleable ? String(!!value) : false),
                'data-cke-tooltip-text': bind.to('_tooltipString'),
                'data-cke-tooltip-position': bind.to('tooltipPosition')
            },
            children: this.children,
            on: {
                click: bind.to(evt => {
                    // We can't make the button disabled using the disabled attribute, because it won't be focusable.
                    // Though, shouldn't this condition be moved to the button controller?
                    if (this.isEnabled) {
                        this.fire('execute');
                    }
                    else {
                        // Prevent the default when button is disabled, to block e.g.
                        // automatic form submitting. See ckeditor/ckeditor5-link#74.
                        evt.preventDefault();
                    }
                })
            }
        };
        // On Safari we have to force the focus on a button on click as it's the only browser
        // that doesn't do that automatically. See #12115.
        if (env.isSafari) {
            template.on.mousedown = bind.to(evt => {
                this.focus();
                evt.preventDefault();
            });
        }
        this.setTemplate(template);
    }
    /**
     * @inheritDoc
     */
    render() {
        super.render();
        if (this.icon) {
            this.iconView.bind('content').to(this, 'icon');
            this.children.add(this.iconView);
        }
        this.children.add(this.labelView);
        if (this.withKeystroke && this.keystroke) {
            this.children.add(this.keystrokeView);
        }
    }
    /**
     * Focuses the {@link #element} of the button.
     */
    focus() {
        this.element.focus();
    }
    /**
     * Creates a label view instance and binds it with button attributes.
     *
     * @param ariaLabelUid The aria label UID.
     */
    _createLabelView(ariaLabelUid) {
        const labelView = new View();
        const bind = this.bindTemplate;
        labelView.setTemplate({
            tag: 'span',
            attributes: {
                class: [
                    'ck',
                    'ck-button__label'
                ],
                style: bind.to('labelStyle'),
                id: `ck-editor__aria-label_${ariaLabelUid}`
            },
            children: [
                {
                    text: bind.to('label')
                }
            ]
        });
        return labelView;
    }
    /**
     * Creates a view that displays a keystroke next to a {@link #labelView label }
     * and binds it with button attributes.
     */
    _createKeystrokeView() {
        const keystrokeView = new View();
        keystrokeView.setTemplate({
            tag: 'span',
            attributes: {
                class: [
                    'ck',
                    'ck-button__keystroke'
                ]
            },
            children: [
                {
                    text: this.bindTemplate.to('keystroke', text => getEnvKeystrokeText(text))
                }
            ]
        });
        return keystrokeView;
    }
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
    _getTooltipString(tooltip, label, keystroke) {
        if (tooltip) {
            if (typeof tooltip == 'string') {
                return tooltip;
            }
            else {
                if (keystroke) {
                    keystroke = getEnvKeystrokeText(keystroke);
                }
                if (tooltip instanceof Function) {
                    return tooltip(label, keystroke);
                }
                else {
                    return `${label}${keystroke ? ` (${keystroke})` : ''}`;
                }
            }
        }
        return '';
    }
}
