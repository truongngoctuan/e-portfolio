import { COLOR, mixTypography } from '@tutum/design-system/themes/styles';
import { styled } from '../../../models';

const PlainTextEditorStyleWrapper = styled('div')`
  & {
    position: relative;
    width: 100%;
    caret-color: ${COLOR.COLOR_PALETTE_BLUE_BASE};

    .sl-lexical-plaintext-contenteditable {
      position: relative;
      z-index: 1;
    }
    .sl-lexical-plaintext-placeholder {
      position: absolute;
      left: 0;
      top: 50%;
      color: ${COLOR.COLOR_TEXT_03};
      transform: translateY(-50%);
      z-index: 0;
      ${mixTypography('bodyM')}
    }
  }
`;

export default PlainTextEditorStyleWrapper;
