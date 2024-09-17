package io.boxo.expo

import android.os.Handler
import android.os.Looper
import com.appboxo.js.params.CustomEvent
import com.appboxo.js.params.PaymentData
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.appboxo.sdk.*

class ExpoBoxoSdkModule : Module() {
    private var handler: Handler? = null

    override fun definition() = ModuleDefinition {
        Name("ExpoBoxoSdk")

        handler = Handler(Looper.getMainLooper())

        Events("customEvent", "paymentEvent", "miniappLifecycle", "onAuth")

        Function("setConfig") { options: ConfigOptions ->
            val globalTheme: Config.Theme = when (options.theme) {
                "light" -> Config.Theme.LIGHT
                "dark" -> Config.Theme.DARK
                else -> Config.Theme.SYSTEM
            }
            Appboxo.init(appContext.activityProvider!!.currentActivity.application)
                .setConfig(
                    Config.Builder()
                        .setClientId(options.clientId)
                        .setUserId(options.userId)
                        .sandboxMode(options.sandboxMode)
                        .multitaskMode(options.multitaskMode)
                        .setTheme(globalTheme)
                        .setLanguage(options.language)
                        .permissionsPage(options.showPermissionsPage)
                        .showClearCache(options.showClearCache)
                        .debug(options.isDebug)
                        .build()
                )
        }

        Function("openMiniapp") { options: MiniappOptions ->
            val miniapp: Miniapp = Appboxo.getMiniapp(options.appId)
                .setCustomEventListener { _, miniapp, customEvent ->
                    sendEvent(
                        "customEvent", mapOf(
                            "appId" to miniapp.appId,
                            "requestId" to customEvent.requestId,
                            "type" to customEvent.type,
                            "errorType" to customEvent.errorType,
                            "payload" to customEvent.payload,
                        )
                    )
                }
                .setPaymentEventListener { _, miniapp, paymentData ->
                    sendEvent(
                        "paymentEvent", mapOf(
                            "appId" to miniapp.appId,
                            "transactionToken" to paymentData.transactionToken,
                            "miniappOrderId" to paymentData.miniappOrderId,
                            "amount" to paymentData.amount,
                            "currency" to paymentData.currency,
                            "extraParams" to paymentData.extraParams,
                            "hostappOrderId" to paymentData.hostappOrderId,
                            "status" to paymentData.status,
                        )
                    )
                }
                .setAuthListener { _, miniapp ->
                    sendEvent("onAuth", mapOf("appId" to miniapp.appId))
                }
//                .setLifecycleListener(this)
            if (options.data != null) miniapp.setData(options.data)
            val configBuilder = MiniappConfig.Builder()
            if (options.theme != null) {
                val miniappTheme: Config.Theme? = when (options.theme) {
                    "light" -> Config.Theme.LIGHT
                    "dark" -> Config.Theme.DARK
                    "system" -> Config.Theme.SYSTEM
                    else -> null
                }
                if (miniappTheme != null) {
                    configBuilder.setTheme(miniappTheme)
                }
            }
            options.extraUrlParams?.also { extraUrlParams ->
                val stringMap: MutableMap<String, String> = HashMap()
                for ((key, value) in extraUrlParams) stringMap[key] = value.toString()
                configBuilder.setExtraUrlParams(stringMap)
            }
            options.urlSuffix?.also { suffix -> configBuilder.setUrlSuffix(suffix) }
            options.colors?.also { colors ->
                configBuilder.setColors(
                    colors["primaryColor"] ?: "",
                    colors["secondaryColor"] ?: "",
                    colors["tertiaryColor"] ?: "",
                )
            }
            configBuilder.enableSplash(options.enableSplash)
            configBuilder.saveState(options.saveState)
            miniapp.setConfig(configBuilder.build())
            miniapp.open(appContext.currentActivity!!)
        }

        Function("setAuthCode") { appId: String, authCode: String ->
            Appboxo.getMiniapp(appId)
                .setAuthCode(authCode)
        }

        Function("sendCustomEvent") { customEvent: CustomEventData ->
            handler?.post {
                Appboxo.getMiniapp(customEvent.appId)
                    .sendEvent(
                        CustomEvent(
                            requestId = customEvent.requestId,
                            type = customEvent.type ?: "",
                            errorType = customEvent.errorType,
                            payload = customEvent.payload ?: emptyMap()
                        )
                    )
            }
        }

        Function("sendPaymentEvent") { paymentEvent: PaymentEventData ->
            handler?.post {
                Appboxo.getMiniapp(paymentEvent.appId)
                    .sendPaymentResult(
                        PaymentData(
                            transactionToken = paymentEvent.transactionToken ?: "",
                            miniappOrderId = paymentEvent.miniappOrderId ?: "",
                            amount = paymentEvent.amount ?: 0.0,
                            currency = paymentEvent.currency ?: "",
                            status = paymentEvent.status ?: "",
                            hostappOrderId = paymentEvent.hostappOrderId ?: "",
                            extraParams = paymentEvent.extraParams
                        )
                    )
            }
        }

        Function("closeMiniapp") { appId: String ->
            Appboxo.getExistingMiniapp(appId)?.close()
        }

        Function("hideMiniapps") {
            Appboxo.hideMiniapps()
        }
        Function("logout") {
            Appboxo.logout()
        }
    }
}
