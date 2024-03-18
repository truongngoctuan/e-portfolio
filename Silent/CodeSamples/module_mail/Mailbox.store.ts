import { proxy, useSnapshot } from 'valtio';
import {
  SearchInfoType,
  ComposerSize,
  TabIds,
  CardErrorsType,
  MailboxType,
} from './Mailbox.type';

import {
  assignPatient,
  AssignPatientRequest,
  getInboxMails,
  getKimAccounts,
  GetKimAccountsRequest,
  GetMailsRequest,
  getOutboxMails,
  MailItemDTO,
  markRead,
  MarkReadRequest,
  syncInboxMailByAccount,
} from 'app_mail';
import { Order, PaginationRequest } from 'common';
import { EmailItem, SearchType } from 'mail_common';
import { getIndexSelectedMail } from './Mailbox.helper';

export interface IMailInfo {
  mails: MailItemDTO[];
  countUnread: number;
  total: number;
  pagination: PaginationRequest;
  searchInfo: SearchInfoType;
  isReload: boolean;
}

export interface IMailboxStore {
  mailboxType: MailboxType;
  loadingMailList: boolean;
  loadingMailDetails: boolean;
  loading: boolean;
  loadingSyncMails: boolean;
  isSearching: boolean;
  listAccount: string[];
  notification: boolean;
  selectedTabId: TabIds;
  selectedAccount: string;
  selectedMailId: string | null;
  cardError: CardErrorsType;
  [TabIds.Inbox]: IMailInfo;
  [TabIds.Outbox]: IMailInfo;
  composerArea: {
    size: ComposerSize;
  };
  viewMailData: EmailItem | null;
}

export interface IMailboxActions {
  setMailboxType: (type: MailboxType) => void;
  setActiveTab: (selectedTab: TabIds) => void;
  setComposer: (size: ComposerSize) => void;
  setActiveAccount: (selectedAccount: string) => void;
  setPagination: (pagination: PaginationRequest) => void;
  setSearchInfo: (searchInfo: SearchInfoType, isSearching?: boolean) => void;
  setViewMail: (selectedMailId: string) => void;
  setNotification: (notification: boolean) => void;
  setViewMailData: (emailItem: EmailItem | null) => void;
  reloadList: (selectedTabId?: TabIds) => void;
  getMails: (payload: GetMailsRequest, tabId: TabIds) => Promise<void>;
  getAccounts: (payload: GetKimAccountsRequest) => Promise<void>;
  prepareMailbox: () => void;
  markAsReadOrUnread: (payload: Partial<MarkReadRequest>) => Promise<void>;
  assignPatientToMail: (
    payload: Partial<AssignPatientRequest>
  ) => Promise<void>;
  syncInboxMails: (isLoading?: boolean) => void;
  setCardError: (cardError: CardErrorsType) => void;
  resetStore: () => void;
}

const initMailInfo: IMailInfo = {
  mails: [],
  countUnread: 0,
  total: 0,
  pagination: {
    page: 1,
    pageSize: 30,
    sortBy: '',
    order: Order.DESC,
  },
  searchInfo: {
    searchType: SearchType.SearchType_From,
    searchValue: '',
  },
  isReload: false,
};

/**
 * Mailbox initial state
 */
const initState: IMailboxStore = {
  mailboxType: null,
  loading: false,
  loadingMailList: false,
  loadingMailDetails: false,
  loadingSyncMails: false,
  isSearching: false,
  listAccount: [],
  inbox: initMailInfo,
  outbox: initMailInfo,
  notification: false,
  selectedTabId: TabIds.Inbox, // Make default selected tab id is inbox tab
  selectedAccount: '',
  selectedMailId: null,
  cardError: null,
  composerArea: {
    size: null,
  },
  viewMailData: null,
};

export const mailboxStore = proxy<IMailboxStore>(initState);

/**
 * Define Mailbox actions
 */
export const mailboxActions: IMailboxActions = {
  setMailboxType: (type) => {
    mailboxStore.mailboxType = type;
  },
  setActiveTab: (newTabId: TabIds) => {
    mailboxStore.selectedTabId = newTabId;
  },
  setActiveAccount: (selectedAccount: string) => {
    mailboxStore.selectedAccount = selectedAccount;
  },
  setViewMail: (selectedMailId: string) => {
    mailboxStore.selectedMailId = selectedMailId;
  },
  setPagination: (pagination: PaginationRequest) => {
    mailboxStore[mailboxStore.selectedTabId].pagination = pagination;
    mailboxActions.reloadList();
  },
  setSearchInfo: (searchInfo: SearchInfoType, isSearching = true) => {
    mailboxStore[mailboxStore.selectedTabId].searchInfo = searchInfo;
    mailboxStore.isSearching = isSearching;
  },
  setNotification: (notification: boolean) => {
    mailboxStore.notification = notification;
  },
  setViewMailData: (emailItem: EmailItem | null) => {
    mailboxStore.viewMailData = emailItem;
  },
  reloadList: (selectedTabId: TabIds = mailboxStore.selectedTabId) => {
    mailboxStore[selectedTabId] = {
      ...mailboxStore[selectedTabId],
      isReload: true,
    };
  },
  getMails: async (payload: GetMailsRequest, selectedTabId: TabIds) => {
    if (mailboxStore[selectedTabId].isReload) {
      mailboxStore.loadingMailList = true;
      try {
        const fullyPayload = {
          ...payload,
          searchType: payload.searchValue
            ? mailboxStore[selectedTabId].searchInfo.searchType
            : null,
        };
        const { emailItems, total, unread } =
          selectedTabId === TabIds.Inbox
            ? await getInboxMails(fullyPayload)
            : await getOutboxMails(fullyPayload);
        mailboxStore[selectedTabId] = {
          ...mailboxStore[selectedTabId],
          mails: emailItems,
          countUnread: unread,
          total,
          isReload: false,
        };
      } finally {
        mailboxStore.loadingMailList = false;
        mailboxStore.isSearching = false;
      }
    }
  },
  getAccounts: async (payload: GetKimAccountsRequest) => {
    mailboxStore.loading = true;
    try {
      const { accounts } = await getKimAccounts(payload);
      if (accounts?.length) {
        mailboxStore.listAccount = accounts;
        mailboxStore.selectedAccount = accounts[0];
      }
    } finally {
      mailboxStore.loading = false;
    }
  },
  prepareMailbox: () => {
    mailboxStore.inbox.isReload = true;
    mailboxStore.outbox.isReload = true;
  },
  markAsReadOrUnread: async (payload: MarkReadRequest) => {
    const { id, isRead } = payload;
    const { selectedTabId } = mailboxStore;
    try {
      await markRead({
        ...payload,
        inbox: mailboxStore.selectedTabId === TabIds.Inbox,
      });
    } finally {
      const mailIndex = mailboxStore[selectedTabId].mails.findIndex(
        (mail) => mail.id === id
      );
      if (mailIndex !== -1) {
        mailboxStore[selectedTabId].mails[mailIndex].emailItem.isRead = isRead;
      }

      if (!isRead) {
        mailboxStore.selectedMailId = null;
        mailboxStore[selectedTabId].countUnread += 1;
      } else {
        mailboxStore[selectedTabId].countUnread -= 1;
      }
    }
  },
  assignPatientToMail: async (payload: AssignPatientRequest) => {
    const { selectedMailId, selectedTabId } = mailboxStore;
    try {
      await assignPatient({
        id: selectedMailId,
        inbox: selectedTabId === TabIds.Inbox,
        ...payload,
      });
    } finally {
      const { patient } = payload;
      const selectedMailIndex = getIndexSelectedMail(
        selectedMailId,
        mailboxStore[selectedTabId].mails
      );
      mailboxStore[selectedTabId].mails[selectedMailIndex].emailItem.patient =
        patient;
    }
  },
  syncInboxMails: async (isLoading = true) => {
    mailboxStore.loadingSyncMails = isLoading;
    try {
      await syncInboxMailByAccount({
        accountEmail: mailboxStore.selectedAccount,
      });
    } catch (error) {
      if (error?.message) {
        mailboxStore.cardError = error?.message as CardErrorsType;
      }
    } finally {
      mailboxStore.loadingSyncMails = false;
    }
  },
  setCardError: (cardError) => {
    mailboxStore.cardError = cardError;
  },
  resetStore: () => {
    Object.assign(mailboxStore, { ...initState });
  },
  setComposer: (size: ComposerSize) => {
    mailboxStore.composerArea = {
      size: size,
    };
  },
};

export function useMailboxStore() {
  return useSnapshot(mailboxStore);
}
