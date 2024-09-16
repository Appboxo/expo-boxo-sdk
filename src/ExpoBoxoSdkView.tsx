import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoBoxoSdkViewProps } from './ExpoBoxoSdk.types';

const NativeView: React.ComponentType<ExpoBoxoSdkViewProps> =
  requireNativeViewManager('ExpoBoxoSdk');

export default function ExpoBoxoSdkView(props: ExpoBoxoSdkViewProps) {
  return <NativeView {...props} />;
}
