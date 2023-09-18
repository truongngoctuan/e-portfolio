import React, { useId } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextEditorProps } from './PlainTextEditor.type';
import {
  defaultLexicalComposerConfig,
  TEST_ID,
} from './PlainTextEditor.constant';
import { getCssClass } from '@tutum/design-system/infrastructure/utils';
import PlainTextEditorStyleWrapper from './PlainTextEditor.styled';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const PlainTextEditor: React.FC<PlainTextEditorProps> = (props) => {
  const {
    className,
    placeholder,
    onChange,
    children,
    editorConfig,
    nodes = [],
    editable = true,
  } = props;

  const plainTextPluginKey = useId();

  const onChangePluginKey = useId();

  return (
    <LexicalComposer
      initialConfig={{
        ...defaultLexicalComposerConfig,
        nodes: [...defaultLexicalComposerConfig.nodes, ...nodes],
        ...editorConfig,
        editorState: props.initEditorState,
        editable,
      }}
    >
      <PlainTextEditorStyleWrapper>
        <PlainTextPlugin
          key={plainTextPluginKey}
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable
              data-testid={TEST_ID}
              className={getCssClass(
                'sl-lexical-plaintext-contenteditable',
                className
              )}
            />
          }
          placeholder={
            <span className="sl-lexical-plaintext-placeholder">
              {placeholder}
            </span>
          }
        />
        <OnChangePlugin
          key={onChangePluginKey}
          onChange={onChange}
          ignoreSelectionChange
          ignoreHistoryMergeTagChange
        />
        {children}
      </PlainTextEditorStyleWrapper>
    </LexicalComposer>
  );
};

export default PlainTextEditor;
