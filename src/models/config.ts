import type {
  ColorStyle,
  Edges,
  Locale,
  Scope,
  SupportedSchemes,
  SupportedFundSource,
  SupportedPaymentAuthentications,
  TapCurrencyCode,
  Theme,
  AuthorizeType,
  PayButtonType,
} from './enums';

export type Merchant = { id: String };
export type PaymentAgreement = {
  id: String;
  contract: Contract;
};
export type Contract = {
  id: String;
};
export type Transaction = {
  metadata: Object;
  paymentAgreement: PaymentAgreement;
};

export type Phone = { countryCode: String; number: String };

export type InterfaceConfig = {
  locale: Locale;
  theme: Theme;
  edges: Edges;
  loader: boolean;
  colorStyle: ColorStyle;
  powered: boolean;
};
export type Addons = {
  loader: boolean;
};
export type Acceptance = {
  supportedSchemes: SupportedSchemes[];
  supportedFundSource: SupportedFundSource[];
  supportedPaymentAuthentications: SupportedPaymentAuthentications[] | [];
};
export type Contact = {
  email: String;
  phone: Phone;
};
export type Name = {
  lang: Locale;
  first: String;
  last: String;
  middle: String;
};
export type Customer = {
  id?: String;
  name?: Name[];
  nameOnCard?: String;
  editable?: boolean;
  contact?: Contact;
};
export type AuthenticationTransactionInvoice = {
  id: string;
};

export type AuthenticationPost = {
  url: String;
};

export type AuthenticationTransaction = {
  transaction: String;
  order: String;
};

export type Order = {
  id?: String;
  amount?: number;
  currency?: TapCurrencyCode;
  description?: String;
  reference?: String;
  metadata?: Object;
};

export type Invoice = {
  id: String;
};

export type Post = {
  url: String;
};

export type Features = {
  alternativeCardInputs: {
    cardNFC: boolean;
    cardScanner: boolean;
  };
  acceptanceBadge: boolean;
  customerCards: {
    saveCard: boolean;
    autoSaveCard: boolean;
  };
};

export type Config = {
  buttonType: PayButtonType;
  merchant?: Merchant;
  order: Order;
  invoice?: Invoice;
  post?: Post;
  operator: { publicKey: string; hashString: string };
  interface?: InterfaceConfig;
  scope?: Scope;
  customer: Customer;
  transaction?: {
    authentication: boolean;
    authorize: { type: AuthorizeType; time: number };
    paymentAgreement: { id: string; contract: { id: string } };
    reference: string;
    metadata: Object;
  };
};
