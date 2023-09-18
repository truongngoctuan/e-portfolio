import React, { FC, memo, useMemo } from "react";
import type MailboxI18n from "@tutum/mvz/locales/en/Mailbox.json";

import { MailItemDTO } from "@tutum/hermes/bff/app_mvz_mail";
import { SearchType } from "@tutum/hermes/bff/mail_common";

import {
  BodyTextM,
  BodyTextS,
  Flex,
  H4,
  Svg,
} from "@tutum/design-system/components";
import { MailTag, MailContent, parseAddressToName } from "..";
import DateTimeUtil from "@tutum/infrastructure/utils/datetime.util";
import { DATE_TIME_WITHOUT_SECONDS_FORMAT } from "@tutum/mvz/constant/dateTime";
import i18n from "@tutum/infrastructure/i18n";
import { getPositionsToHighlight } from "@tutum/infrastructure/utils/match";
import { mailboxActions, useMailboxStore } from "../Mailbox.store";

const AttachmentIcon = "/images/attachment.svg";

export interface IMailItemProps extends MailItemDTO {
  className?: string;
  isOutbox: boolean;
}

const MailItem: FC<IMailItemProps> = (props) => {
  const { className, emailItem, id, date, isOutbox } = props;
  const {
    subject,
    body,
    from,
    to,
    category,
    patient,
    isRead,
    contentType,
    attachments,
    received,
  } = emailItem;
  const { name } = from;

  const mailboxStore = useMailboxStore();
  const { selectedMailId, selectedTabId, selectedAccount } = mailboxStore;
  const { setViewMail, markAsReadOrUnread } = mailboxActions;
  const { t } = i18n.useTranslation<keyof typeof MailboxI18n>({
    namespace: "Mailbox",
  });

  const handleClick = () => {
    setViewMail(id);
    if (!isRead) {
      markAsReadOrUnread({ id, isRead: true }); // Mark mail as read
    }
  };

  const renderHighlightTextSearching = (text: string) => {
    const { searchValue, searchType } = mailboxStore[selectedTabId].searchInfo;
    if (searchValue && searchType === SearchType.SearchType_Subject) {
      const styleTexts = getPositionsToHighlight(text, searchValue);

      return styleTexts.length
        ? styleTexts.map((item, index) => {
            return item.highlight ? (
              <strong key={index}>{item.value}</strong>
            ) : (
              item.value
            );
          })
        : text;
    }

    return text;
  };

  const classes = useMemo<string>(() => {
    const classesArr = [className];
    if (selectedMailId === id) {
      classesArr.push("sl-mailbox-item__active");
    }

    if (isRead) {
      classesArr.push("sl-mailbox-item__read");
    }

    return classesArr.join(" ");
  }, [isRead, selectedMailId, id]);

  return (
    <div className={classes} onClick={handleClick}>
      <Flex align="center" justify="space-between">
        <Flex className="sl-mailbox-item__name" align="center" mb={4}>
          {!isRead && <div className="sl-mailbox-item__unread-dot" />}
          <H4 fontWeight="SemiBold">{`${
            isOutbox
              ? `${t("To")}: ${parseAddressToName(to, t, selectedAccount).join(
                  ", "
                )}`
              : name
          }`}</H4>
        </Flex>
        <Flex align="center">
          <BodyTextS className="sl-mailbox-item__created-at">
            {DateTimeUtil.dateTimeFormat(
              received || date,
              DATE_TIME_WITHOUT_SECONDS_FORMAT
            )}
          </BodyTextS>
          {!!attachments?.length && (
            <Svg className="sl-mailbox-item__attachment" src={AttachmentIcon} />
          )}
        </Flex>
      </Flex>
      <BodyTextM>{renderHighlightTextSearching(subject)}</BodyTextM>
      <MailContent
        className="sl-mailbox-item__content"
        content={body}
        contentType={contentType}
      />
      {(category || patient) && (
        <Flex className="sl-mailbox-item__tag">
          {category && <MailTag value={category} type="category" />}
          {patient && <MailTag patient={patient} type="patient" />}
        </Flex>
      )}
    </div>
  );
};

export default memo(MailItem);
