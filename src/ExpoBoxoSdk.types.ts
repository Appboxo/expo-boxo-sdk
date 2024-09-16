export type ChangeEventPayload = {
  value: string;
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

