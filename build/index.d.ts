import { Subscription } from 'expo-modules-core';
import { MiniappListResult, MiniappData, LifecycleData, CustomEventData, PaymentData, AuthEventPayload, ConfigOptions, MiniappOptions } from './ExpoBoxoSdk.types';
/**
 * Set global configs
 */
export declare function setConfig(options: ConfigOptions): void;
/**
 * Open miniapp with options
 */
export declare function openMiniapp(options: MiniappOptions): void;
/**
 * get AuthCode from hostapp backend and send it to miniapp
 */
export declare function setAuthCode(appId: string, authCode: string): void;
/**
 * send payment event to miniapp
 */
export declare function sendPaymentEvent(paymentData: PaymentData): void;
/**
 * send custom event to miniapp
 */
export declare function sendCustomEvent(event: CustomEventData): void;
/**
 * When host app user logs out, it is highly important to clear all miniapp storage data.
 */
export declare function logout(): void;
/**
 * Miniapp opens on a native screen. To show payment processing page need to hide miniapp screen.
 * To use this function need to enable 'multitaskMode: true' in Boxo.setConfig()
 */
export declare function hideMiniapps(): void;
/**
 * close miniapp by appId
 */
export declare function closeMiniapp(appId: string): void;
/**
 * Get list of miniapps
 */
export declare function getMiniapps(): void;
export declare function addAuthListener(listener: (event: AuthEventPayload) => void): Subscription;
export declare function addCustomEventListener(listener: (event: CustomEventData) => void): Subscription;
export declare function addPaymentEventListener(listener: (event: PaymentData) => void): Subscription;
export declare function addMiniappLifecycleListener(listener: (lifecycleData: LifecycleData) => void): Subscription;
export declare function addMiniappListListener(listener: (result: MiniappListResult) => void): Subscription;
export { MiniappListResult, MiniappData, LifecycleData, CustomEventData, PaymentData, AuthEventPayload, ConfigOptions, MiniappOptions };
//# sourceMappingURL=index.d.ts.map