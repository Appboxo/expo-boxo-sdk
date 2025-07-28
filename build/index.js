import { NativeModulesProxy, EventEmitter } from 'expo-modules-core';
import ExpoBoxoSdkModule from './ExpoBoxoSdkModule';
/**
 * Set global configs
 */
export function setConfig(options) {
    ExpoBoxoSdkModule.setConfig(options);
}
/**
 * Open miniapp with options
 */
export function openMiniapp(options) {
    ExpoBoxoSdkModule.openMiniapp(options);
}
/**
 * get AuthCode from hostapp backend and send it to miniapp
 */
export function setAuthCode(appId, authCode) {
    ExpoBoxoSdkModule.setAuthCode(appId, authCode);
}
/**
 * send payment event to miniapp
 */
export function sendPaymentEvent(paymentData) {
    ExpoBoxoSdkModule.sendPaymentEvent(paymentData);
}
/**
 * send custom event to miniapp
 */
export function sendCustomEvent(event) {
    ExpoBoxoSdkModule.sendCustomEvent(event);
}
/**
 * When host app user logs out, it is highly important to clear all miniapp storage data.
 */
export function logout() {
    ExpoBoxoSdkModule.logout();
}
/**
 * Miniapp opens on a native screen. To show payment processing page need to hide miniapp screen.
 * To use this function need to enable 'multitaskMode: true' in Boxo.setConfig()
 */
export function hideMiniapps() {
    ExpoBoxoSdkModule.hideMiniapps();
}
/**
 * close miniapp by appId
 */
export function closeMiniapp(appId) {
    ExpoBoxoSdkModule.closeMiniapp(appId);
}
/**
 * Get list of miniapps
 */
export function getMiniapps() {
    ExpoBoxoSdkModule.getMiniapps();
}
const emitter = new EventEmitter(ExpoBoxoSdkModule ?? NativeModulesProxy.ExpoBoxoSdk);
export function addAuthListener(listener) {
    return emitter.addListener('onAuth', listener);
}
export function addCustomEventListener(listener) {
    return emitter.addListener('customEvent', listener);
}
export function addPaymentEventListener(listener) {
    return emitter.addListener('paymentEvent', listener);
}
export function addMiniappLifecycleListener(listener) {
    return emitter.addListener('miniappLifecycle', listener);
}
export function addMiniappListListener(listener) {
    return emitter.addListener('miniappList', listener);
}
//# sourceMappingURL=index.js.map