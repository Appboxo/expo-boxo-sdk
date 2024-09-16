import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import ExpoBoxoSdkModule from './ExpoBoxoSdkModule';
import { AuthEventPayload, ConfigOptions, MiniappOptions } from './ExpoBoxoSdk.types';

export function setConfig(options: ConfigOptions) {
  ExpoBoxoSdkModule.setConfig(options);
}

export function openMiniapp(options: MiniappOptions) {
  ExpoBoxoSdkModule.openMiniapp(options);
}

export function setAuthCode(appId:string, authCode:string) {
  ExpoBoxoSdkModule.setAuthCode(appId, authCode);
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

export { AuthEventPayload, ConfigOptions, MiniappOptions };
