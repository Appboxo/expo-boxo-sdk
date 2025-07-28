"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withIosPlugin = config => {
    return (0, config_plugins_1.withInfoPlist)(config, config => {
        config.modResults.ITSAppUsesNonExemptEncryption = false;
        config.modResults['NSPhotoLibraryUsageDescription'] = 'To select images from gallery';
        config.modResults['NSCameraUsageDescription'] = 'The camera needs to scan QR codes';
        return config;
    });
};
exports.default = withIosPlugin;
