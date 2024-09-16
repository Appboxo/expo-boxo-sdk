import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoBoxoSdk.web.ts
// and on native platforms to ExpoBoxoSdk.ts
import ExpoBoxoSdkModule from './ExpoBoxoSdkModule';
import ExpoBoxoSdkView from './ExpoBoxoSdkView';
import { ChangeEventPayload, ExpoBoxoSdkViewProps } from './ExpoBoxoSdk.types';

// Get the native constant value.
export const PI = ExpoBoxoSdkModule.PI;

export function hello(): string {
  return ExpoBoxoSdkModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoBoxoSdkModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoBoxoSdkModule ?? NativeModulesProxy.ExpoBoxoSdk);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoBoxoSdkView, ExpoBoxoSdkViewProps, ChangeEventPayload };
