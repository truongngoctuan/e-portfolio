import { styled, css } from '../../models';
import { getCssClass } from '../../infrastructure/utils';
import { COLOR } from '../../themes/styles';
import OriginalReactSelect from './ReactSelect';

export const SLSelectMixin = css`
  & {
    .react-select__control {
      border-radius: 4px;
      border: 1px solid ${(props) => props.theme.background['01']};
      &:hover {
        cursor: pointer;
        border: 1px solid ${COLOR.COLOR_PALETTE_BLUE_BASE};
      }
      &--is-disabled {
        background: ${(props) => props.theme.background['02']};
        background-color: ${(props) => props.theme.background['02']};
        border: 1px solid ${(props) => props.theme.background['01']};
        .react-select__single-value {
          color: ${(props) => props.theme.foreground['03']};
        }
      }
    }
    .react-select__placeholder {
      color: ${COLOR.COLOR_TEXT_03};
    }
    &.bp4-intent-danger {
      .react-select__control {
        border-color: ${COLOR.COLOR_PALETTE_RED_BASE};
      }
    }
    &.bp4-intent-warning {
      .react-select__control {
        border-color: ${COLOR.COLOR_PALETTE_ORANGE_BASE};
      }
    }
  }
`;

const StyledReactSelect = styled(OriginalReactSelect).attrs(
  ({ className }) => ({
    className: getCssClass('sl-react-select', className),
  })
)`
  ${SLSelectMixin}
`;

export default StyledReactSelect;
