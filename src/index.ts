import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import ExpoBoxoSdkModule from './ExpoBoxoSdkModule';
import { MiniappListResult, MiniappData, LifecycleData, CustomEventData, PaymentData, AuthEventPayload, ConfigOptions, MiniappOptions } from './ExpoBoxoSdk.types';

/**
 * Set global configs
 */
export function setConfig(options: ConfigOptions) {
  ExpoBoxoSdkModule.setConfig(options);
}

/**
 * Open miniapp with options
 */
export function openMiniapp(options: MiniappOptions) {
  ExpoBoxoSdkModule.openMiniapp(options);
}

/**
 * get AuthCode from hostapp backend and send it to miniapp
 */
export function setAuthCode(appId: string, authCode: string) {
  ExpoBoxoSdkModule.setAuthCode(appId, authCode);
}

/**
 * send payment event to miniapp
 */
export function sendPaymentEvent(paymentData: PaymentData) {
  ExpoBoxoSdkModule.sendPaymentEvent(paymentData);
}

/**
 * send custom event to miniapp
 */
export function sendCustomEvent(event: CustomEventData) {
  ExpoBoxoSdkModule.sendCustomEvent(event);
}

/**
 * When host app user logs out, it is highly important to clear all miniapp storage data.
 */
export function logout() {
  ExpoBoxoSdkModule.logout();
}

/**
 * Miniapp opens on a native screen. To show payment processing page need to hide miniapp screen.
 * To use this function need to enable 'multitaskMode: true' in Boxo.setConfig()
 */
export function hideMiniapps() {
  ExpoBoxoSdkModule.hideMiniapps();
}

/**
 * close miniapp by appId
 */
export function closeMiniapp(appId: string) {
  ExpoBoxoSdkModule.closeMiniapp(appId);
}

/**
 * Get list of miniapps
 */
export function getMiniapps() {
  ExpoBoxoSdkModule.getMiniapps();
}

const emitter = new EventEmitter(ExpoBoxoSdkModule ?? NativeModulesProxy.ExpoBoxoSdk);

export function addAuthListener(listener: (event: AuthEventPayload) => void): Subscription {
  return emitter.addListener<AuthEventPayload>('onAuth', listener);
}

export function addCustomEventListener(listener: (event: CustomEventData) => void): Subscription {
  return emitter.addListener<CustomEventData>('customEvent', listener);
}

export function addPaymentEventListener(listener: (event: PaymentData) => void): Subscription {
  return emitter.addListener<PaymentData>('paymentEvent', listener);
}

export function addMiniappLifecycleListener(listener: (lifecycleData: LifecycleData) => void): Subscription {
  return emitter.addListener<LifecycleData>('miniappLifecycle', listener);
}

export function addMiniappListListener(listener: (result: MiniappListResult) => void): Subscription {
  return emitter.addListener<MiniappListResult>('miniappList', listener);
}

export { MiniappListResult, MiniappData, LifecycleData, CustomEventData, PaymentData, AuthEventPayload, ConfigOptions, MiniappOptions };
