import type { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import type { PropsWithChildren } from 'react';
import type {
  EditorState,
  Klass,
  LexicalEditor,
  LexicalNode,
  EditorConfig,
} from 'lexical';

interface PlainTextEditorProps extends PropsWithChildren {
  className?: string;
  placeholder: string | JSX.Element;
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
  contentEditable?: JSX.Element;
  initEditorState?: InitialEditorStateType;
  nodes?: ReadonlyArray<Klass<LexicalNode>>;
  editorConfig?: Partial<EditorConfig>;
  editable?: boolean;
}

export type { PlainTextEditorProps };
