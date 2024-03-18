import Theme from '@theme';
import { getCssClass } from '@design-system/infrastructure/utils';

import OriginalMailItem, { IMailItemProps } from './MailItem';
import { FONT_FAMILY } from '@design-system/themes/styles/typo/font-family';

const MailItem: React.ComponentType<IMailItemProps> = Theme.styled(
  OriginalMailItem
).attrs(({ className }) => ({
  className: getCssClass('sl-mailbox-item', className),
}))`
    height: 100%;
    width: 478px;
    padding: ${(props) => props.theme.space.s};
    box-shadow: inset 0px -1px 0px ${(props) => props.theme.background['01']};

    &.sl-mailbox-item__read {
      background: ${(props) => props.theme.background['02']};
    }

    &.sl-mailbox-item__active {
      background: ${(props) => props.theme.background.primary.lighter};
    }

    .sl-mailbox-item {
      &__name {
        width: 75%;

        h4 {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      &__created-at, &__content {
        color: ${(props) => props.theme.foreground['02']};

        p {
          color: ${(props) => props.theme.foreground['02']};
        }

        pre {
          margin: 0;
          font-family: ${FONT_FAMILY.TYPO_FONT_FAMILY_DEFAULT};
        }
      }

      &__content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
      }

      &__unread-dot {
        width: ${(props) => props.theme.space.s};
        height: ${(props) => props.theme.space.s};
        border-radius: 50%;
        background-color: ${(props) => props.theme.background.primary.base};
        margin-right: ${(props) => props.theme.space.xs};
      }

      &__tag {
        gap: 8px;
        margin-top: ${(props) => props.theme.space.xxs};
        flex-wrap: wrap;
      }

      &__attachment {
        margin-left: ${(props) => props.theme.space.xs};
      }
    }
`;

export default MailItem;
