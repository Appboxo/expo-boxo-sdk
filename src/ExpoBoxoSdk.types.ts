export type AuthEventPayload = {
  appId: string;
};

export type PaymentData = {
  appId: string;
  transactionToken?: string;
  miniappOrderId?: string;
  amount?: number;
  currency?: string;
  extraParams?: Record<string, any>;
  hostappOrderId?: string;
  status?: string;
};

export type CustomEventData = {
  appId: string;
  requestId?: number;
  type?: string;
  errorType?: string;
  payload?: Record<string, any>;
};

export type LifecycleData = {
  appId: string;
  lifecycle: string;
  error?: string
};

export type ConfigOptions = {
  clientId: string;
  userId?: string;
  language?: string;
  sandboxMode?: bool;
  multitaskMode?: bool;
  theme?: 'light'|'dark'|'system';
  isDebug?: bool;
  showPermissionsPage?: bool;
  showClearCache?: bool;
};

export type MiniappOptions = {
  appId: string;
  data?: Record<string, any>;
  theme?: string;
  extraUrlParams?: Record<string, string>;
  urlSuffix?:string;
  colors?: Record<string, string>;
  enableSplash?: bool;
  saveState?: bool;
};

export type MiniappListResult = {
  miniapps?: Array<MiniappData>;
  error?: string;
}

export type MiniappData = {
  appId: string;
  name: string;
  category: string;
  description: string;
  logo: string;
}

