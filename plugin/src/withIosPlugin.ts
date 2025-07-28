import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins';

const withIosPlugin: ConfigPlugin = config => {

  return withInfoPlist(config, config => {
    config.modResults.ITSAppUsesNonExemptEncryption = false;
    config.modResults['NSPhotoLibraryUsageDescription'] = 'To select images from gallery';
    config.modResults['NSCameraUsageDescription'] = 'The camera needs to scan QR codes';
    return config;
  });
};

export default withIosPlugin;