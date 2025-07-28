import { ConfigPlugin, AndroidConfig,  withAndroidManifest } from '@expo/config-plugins';

const withAndroidPlugin: ConfigPlugin = config => {

  return withAndroidManifest(config, config => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

//     AndroidConfig.Manifest.addMetaDataItemToMainApplication(
//       mainApplication,
//       'Test Key',
//       'Value'
//     );

    return config;
  });
};

export default withAndroidPlugin;