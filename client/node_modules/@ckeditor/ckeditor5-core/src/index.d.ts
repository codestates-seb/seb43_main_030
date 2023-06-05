/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module core
 */
export { default as Plugin, type PluginDependencies, type PluginConstructor } from './plugin';
export { default as Command, type CommandExecuteEvent } from './command';
export { default as MultiCommand } from './multicommand';
export type { CommandsMap } from './commandcollection';
export type { PluginsMap, default as PluginCollection } from './plugincollection';
export { default as Context, type ContextConfig } from './context';
export { default as ContextPlugin, type ContextPluginDependencies } from './contextplugin';
export { type EditingKeystrokeCallback } from './editingkeystrokehandler';
export { default as Editor, type EditorReadyEvent, type EditorDestroyEvent } from './editor/editor';
export type { EditorConfig, LanguageConfig, ToolbarConfig, ToolbarConfigItem } from './editor/editorconfig';
export { default as attachToForm } from './editor/utils/attachtoform';
export { default as DataApiMixin, type DataApi } from './editor/utils/dataapimixin';
export { default as ElementApiMixin, type ElementApi } from './editor/utils/elementapimixin';
export { default as secureSourceElement } from './editor/utils/securesourceelement';
export { default as PendingActions, type PendingAction } from './pendingactions';
export declare const icons: {
    bold: string;
    cancel: string;
    caption: string;
    check: string;
    cog: string;
    eraser: string;
    image: string;
    lowVision: string;
    importExport: string;
    paragraph: string;
    plus: string;
    text: string;
    alignBottom: string;
    alignMiddle: string;
    alignTop: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    alignJustify: string;
    objectLeft: string;
    objectCenter: string;
    objectRight: string;
    objectFullWidth: string;
    objectInline: string;
    objectBlockLeft: string;
    objectBlockRight: string;
    objectSizeFull: string;
    objectSizeLarge: string;
    objectSizeSmall: string;
    objectSizeMedium: string;
    pencil: string;
    pilcrow: string;
    quote: string;
    threeVerticalDots: string;
};
import './augmentation';
