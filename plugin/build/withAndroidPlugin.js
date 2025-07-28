"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withAndroidPlugin = config => {
    return (0, config_plugins_1.withAndroidManifest)(config, config => {
        const mainApplication = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
        //     AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        //       mainApplication,
        //       'Test Key',
        //       'Value'
        //     );
        return config;
    });
};
exports.default = withAndroidPlugin;
