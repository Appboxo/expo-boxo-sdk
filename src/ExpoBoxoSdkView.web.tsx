import * as React from 'react';

import { ExpoBoxoSdkViewProps } from './ExpoBoxoSdk.types';

export default function ExpoBoxoSdkView(props: ExpoBoxoSdkViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
