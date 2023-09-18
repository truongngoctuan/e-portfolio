import type { LexicalComposerInitialConfig } from '../../types';

export const defaultLexicalComposerConfig: LexicalComposerInitialConfig = {
  namespace: 'sl-lexical-custom-plain-text-editor',
  onError(error) {
    throw error;
  },
  theme: {
    plainText: 'sl-lexical-custom-plain-text-editor-theme',
  },
  nodes: [], // NOTE: declare default nodes here
};

export const TEST_ID = 'sl-lexical-custom-plain-text-editor';
