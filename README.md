# expo-boxo-sdk

Expo wrapper over Appboxo SDK for IOS and Android.

## Install

```bash
npm install @appboxo/expo-boxo-sdk
```

## API

* [`setConfig(...)`](#setconfig)
* [`openMiniapp(...)`](#openminiapp)
* [`setAuthCode(...)`](#setauthcode)
* [`closeMiniapp(...)`](#closeminiapp)
* [`sendCustomEvent(...)`](#sendcustomevent)
* [`sendPaymentEvent(...)`](#sendpaymentevent)
* [`getMiniapps()`](#getminiapps)
* [`hideMiniapps()`](#hideminiapps)
* [`logout()`](#logout)
* [`addAuthListener( ...)`](#AuthListener)
* [`addCustomEventListener()`](#CustomEventListener)
* [`addPaymentEventListener()`](#PaymentEventListener)
* [`addMiniappLifecycleListener()`](#MiniappLifecycleListener)
* [`addMiniappListListener()`](#MiniappListListener)

### setConfig(...)

```typescript
setConfig(options: ConfigOptions)
```

Set global configs

| Prop                      | Type                                       | Description                                                                              |
|---------------------------| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **`clientId`**            | <code>string</code>                        | your client id from dashboard                                                            |
| **`userId`**              | <code>string</code>                        | hostapp userId, will be used for the Consent Management                                  |
| **`sandboxMode`**         | <code>boolean</code>                       | switch to sandbox mode                                                                   |
| **`multitaskMode`**       | <code>boolean</code>                       | Each miniapp appears as a task in the Recents screen. !It works only on android devices. |
| **`theme`**               | <code>'light' \| 'dark' \| 'system'</code> | theme for splash screen and other native components used inside miniapp.                 |
| **`isDebug`**             | <code>boolean</code>                       | enables webview debugging                                                                |
| **`showPermissionsPage`** | <code>boolean</code>                       | use it to hide "Settings" from Miniapp menu                                              |
| **`showClearCache`**      | <code>boolean</code>                       | use it to hide "Clear cache" from Miniapp menu                                           |


--------------------


### openMiniapp(...)

```typescript
openMiniapp(options: MiniappOptions)
```

Open miniapp with options

| Prop                 | Type                                       | Description                                                                                       |
| -------------------- |--------------------------------------------| ------------------------------------------------------------------------------------------------- |
| **`appId`**          | <code>string</code>                        | miniapp id                                                                                        |
| **`data`**           | <code>Record<string, any></code>           | (optional) data as Map that is sent to miniapp                                                    |
| **`theme`**          | <code>'light' \| 'dark' \| 'system'</code> | (optional) miniapp theme "dark" \| "light" (by default is system theme)                           |
| **`extraUrlParams`** | <code>Record<string, string></code>        | (optional) extra query params to append to miniapp URL (like: http://miniapp-url.com/?param=test) |
| **`urlSuffix`**      | <code>string</code>                        | (optional) suffix to append to miniapp URL (like: http://miniapp-url.com/?param=test)             |
| **`colors`**         | <code>Record<string, string></code>        | (optional) provide colors to miniapp if miniapp supports                                          |
| **`enableSplash`**   | <code>boolean</code>                       | (optional) use to skip miniapp splash screen                                                      |

Color options 

| Prop                 | Type                |
| -------------------- | ------------------- |
| **`primaryColor`**   | <code>string</code> |
| **`secondaryColor`** | <code>string</code> |
| **`tertiaryColor`**  | <code>string</code> |

--------------------


### setAuthCode(...)

```typescript
setAuthCode(appId: string, authCode: string)
```

get AuthCode from hostapp backend and send it to miniapp

--------------------


### closeMiniapp(...)

```typescript
closeMiniapp(appId: string)
```

close miniapp by appId

--------------------


### sendCustomEvent(...)

```typescript
sendCustomEvent(customEventData: CustomEventData)
```

send custom event to miniapp

| Prop            | Type                |
| --------------- | ------------------- |
| **`appId`**     | <code>string</code> |
| **`requestId`** | <code>number</code> |
| **`type`**      | <code>string</code> |
| **`errorType`** | <code>string</code> |
| **`payload`**   | <code>object</code> |


--------------------


### sendPaymentEvent(...)

```typescript
sendPaymentEvent(paymentData: PaymentData)
```

send payment data to miniapp

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`appId`**            | <code>string</code> |
| **`transactionToken`** | <code>string</code> |
| **`miniappOrderId`**   | <code>string</code> |
| **`amount`**           | <code>number</code> |
| **`currency`**         | <code>string</code> |
| **`status`**           | <code>string</code> |
| **`hostappOrderId`**   | <code>string</code> |
| **`extraParams`**      | <code>object</code> |


--------------------


### getMiniapps()

```typescript
getMiniapps()
```
Get list of miniapps. To get results subscribe to
* [`addMiniappListListener()`](#MiniappListListener)
--------------------


### hideMiniapps()

```typescript
hideMiniapps()
```

Miniapp opens on a native screen. To show payment processing page need to hide miniapp screen.
To use this function need to enable 'enableMultitaskMode: true' in Appboxo.setConfigs()

--------------------

### logout()

```typescript
logout()
```
When host app user logs out, it is highly important to clear all miniapp storage data.

--------------------

#### AuthListener

```typescript
Boxo.addAuthListener((authEvent) => {
    Boxo.setAuthCode(authEvent.appId, authCode)
});
```

#### CustomEventListener

```typescript
Boxo.addCustomEventListener((customEvent) => {
  ..handle custom event
});
```

#### PaymentEventListener

```typescript
Boxo.addPaymentEventListener((paymentData) => {
  Boxo.hideMiniapps();
  .. show payment page
  paymentData.status = "success";
  ..confirm payment
  Boxo.sendPaymentEvent(paymentData);
  Boxo.openMiniapp({ appId: paymentData.appId })
});
```

#### MiniappLifecycleListener

```typescript
Boxo.addMiniappLifecycleListener((lifecycleData) => {
  console.log(lifecycleData);
});
```

| Prop            | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`appId`**     | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`lifecycle`** | <code>string</code> | onLaunch - Called when the miniapp will launch with Appboxo.open(...) onResume - Called when the miniapp will start interacting with the user onPause - Called when the miniapp loses foreground state onClose - Called when clicked close button in miniapp or when destroyed miniapp page onError - Called when miniapp fails to launch due to internet connection issues onUserInteraction - Called whenever touch event is dispatched to the miniapp page. onAuth - Called when the miniapp starts login and user allows it |
| **`error`**     | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


#### MiniappListListener

```typescript
Boxo.addMiniappListListener((result) => {
  console.log(result.miniapps);
});
```

Get miniapp list

| Prop           | Type                       |
| -------------- | -------------------------- |
| **`miniapps`** | <code>[MiniappData]</code> |
| **`error`**    | <code>string</code>        |

MiniappData

| Prop              | Type                |
| ----------------- | ------------------- |
| **`appId`**       | <code>string</code> |
| **`name`**        | <code>string</code> |
| **`category`**    | <code>string</code> |
| **`description`** | <code>string</code> |
| **`logo`**        | <code>string</code> |
