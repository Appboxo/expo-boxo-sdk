import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoBoxoSdk.web.ts
// and on native platforms to ExpoBoxoSdk.ts
import ExpoBoxoSdkModule from './ExpoBoxoSdkModule';
import { ChangeEventPayload, ConfigOptions, MiniappOptions } from './ExpoBoxoSdk.types';

export function setConfig(options: ConfigOptions) {
  ExpoBoxoSdkModule.setConfig(options);
}

export function openMiniapp(options: MiniappOptions) {
  ExpoBoxoSdkModule.openMiniapp(options);
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

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ChangeEventPayload, ConfigOptions, MiniappOptions };
