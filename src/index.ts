import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import ExpoBoxoSdkModule from './ExpoBoxoSdkModule';
import { CustomEventData, PaymentData, AuthEventPayload, ConfigOptions, MiniappOptions } from './ExpoBoxoSdk.types';

export function setConfig(options: ConfigOptions) {
  ExpoBoxoSdkModule.setConfig(options);
}

export function openMiniapp(options: MiniappOptions) {
  ExpoBoxoSdkModule.openMiniapp(options);
}

export function setAuthCode(appId:string, authCode:string) {
  ExpoBoxoSdkModule.setAuthCode(appId, authCode);
}

export function sendPaymentEvent(paymentData:PaymentData) {
  ExpoBoxoSdkModule.sendPaymentEvent(paymentData);
}

export function sendCustomEvent(event:CustomEventData) {
  ExpoBoxoSdkModule.sendCustomEvent(event);
}

export function logout() {
  ExpoBoxoSdkModule.logout();
}

export function hideMiniapps() {
  ExpoBoxoSdkModule.hideMiniapps();
}

export function closeMiniapp(appId:string) {
  ExpoBoxoSdkModule.closeMiniapp(appId);
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

export { CustomEventData, PaymentData, AuthEventPayload, ConfigOptions, MiniappOptions };
