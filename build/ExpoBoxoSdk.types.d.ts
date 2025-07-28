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
    /**
     * onLaunch -  Called when the miniapp will launch with Boxo.open(...)
     * onResume -  Called when the miniapp will start interacting with the user
     * onPause -  Called when the miniapp loses foreground state
     * onClose -  Called when clicked close button in miniapp or when destroyed miniapp page
     * onError -  Called when miniapp fails to launch due to internet connection issues
     * onUserInteraction -  Called whenever touch event is dispatched to the miniapp page.
     */
    lifecycle: string;
    error?: string;
};
export type ConfigOptions = {
    /**
     * your client id from dashboard
     */
    clientId: string;
    /**
     * hostapp userId, will be used for the Consent Management
     */
    userId?: string;
    /**
     * language value will be passed to the miniapp
     */
    language?: string;
    /**
     * switch to sandbox mode
     */
    sandboxMode?: boolean;
    /**
     * Each miniapp appears as a task in the Recents screen.
     * !It works only on android devices.
     */
    multitaskMode?: boolean;
    /**
     * theme for splash screen and other native components used inside miniapp.
     */
    theme?: 'light' | 'dark' | 'system';
    /**
     * enables webview debugging
     */
    isDebug?: boolean;
    /**
     * use it to hide "Settings" from Miniapp menu
     */
    showPermissionsPage?: boolean;
    /**
     * use it to hide "Clear cache" from Miniapp menu
     */
    showClearCache?: boolean;
    /**
     * use it to hide "About Page" from Miniapp menu
     */
    showAboutPage?: boolean;
};
export type MiniappOptions = {
    /**
     * miniapp id
     */
    appId: string;
    /**
     * (optional) data as Map that is sent to miniapp
     */
    data?: Record<string, any>;
    /**
     * (optional) miniapp theme 'dark' | 'light' | 'system'  (by default is system theme)
     */
    theme?: 'light' | 'dark' | 'system';
    /**
     * (optional) extra query params to append to miniapp URL (like: http://miniapp-url.com/?param=test)
     */
    extraUrlParams?: Record<string, string>;
    /**
     * (optional) suffix to append to miniapp URL (like: http://miniapp-url.com/?param=test)
     */
    urlSuffix?: string;
    /**
     * (optional) provide colors to miniapp if miniapp supports
     */
    colors?: Record<string, string>;
    /**
     * (optional) use to skip miniapp splash screen
     */
    enableSplash?: boolean;
    /**
     * (optional) use to save state on close miniapp
     */
    saveState?: boolean;
    /**
     * (optional) use to change launch animation for miniapp.
     */
    pageAnimation?: 'BOTTOM_TO_TOP' | 'TOP_TO_BOTTOM' | 'LEFT_TO_RIGHT' | 'RIGHT_TO_LEFT' | 'FADE_IN';
};
export type MiniappListResult = {
    miniapps?: Array<MiniappData>;
    error?: string;
};
export type MiniappData = {
    appId: string;
    name: string;
    category: string;
    description: string;
    logo: string;
};
//# sourceMappingURL=ExpoBoxoSdk.types.d.ts.map