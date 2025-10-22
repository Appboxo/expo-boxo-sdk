package io.boxo.expo

import android.os.Handler
import android.os.Looper
import io.boxo.data.models.MiniappData
import io.boxo.data.models.PageAnimation
import io.boxo.js.params.CustomEvent
import io.boxo.js.params.PaymentData
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import io.boxo.sdk.*

class ExpoBoxoSdkModule : Module() {
    private var handler: Handler? = null

    override fun definition() = ModuleDefinition {
        Name("ExpoBoxoSdk")

        handler = Handler(Looper.getMainLooper())

        Events("customEvent", "paymentEvent", "miniappLifecycle", "onAuth", "miniappList")

        Function("setConfig") { options: ConfigOptions ->
            val globalTheme: Config.Theme = when (options.theme) {
                "light" -> Config.Theme.LIGHT
                "dark" -> Config.Theme.DARK
                else -> Config.Theme.SYSTEM
            }
            Boxo.init(appContext.activityProvider!!.currentActivity.application)
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
                        .showAboutPage(options.showAboutPage)
                        .debug(options.isDebug)
                        .build()
                )
        }

        Function("openMiniapp") { options: MiniappOptions ->
            val miniapp: Miniapp = Boxo.getMiniapp(options.appId)
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
                .setLifecycleListener(object : Miniapp.LifecycleListener {
                    override fun onClose(miniapp: Miniapp) {
                        sendEvent(
                            "miniappLifecycle", mapOf(
                                "appId" to miniapp.appId,
                                "lifecycle" to "onClose"
                            )
                        )
                    }

                    override fun onError(miniapp: Miniapp, message: String) {
                        sendEvent(
                            "miniappLifecycle", mapOf(
                                "appId" to miniapp.appId,
                                "lifecycle" to "onError",
                                "error" to message
                            )
                        )
                    }

                    override fun onLaunch(miniapp: Miniapp) {
                        sendEvent(
                            "miniappLifecycle", mapOf(
                                "appId" to miniapp.appId,
                                "lifecycle" to "onLaunch"
                            )
                        )
                    }

                    override fun onPause(miniapp: Miniapp) {
                        sendEvent(
                            "miniappLifecycle", mapOf(
                                "appId" to miniapp.appId,
                                "lifecycle" to "onPause"
                            )
                        )
                    }

                    override fun onResume(miniapp: Miniapp) {
                        sendEvent(
                            "miniappLifecycle", mapOf(
                                "appId" to miniapp.appId,
                                "lifecycle" to "onResume"
                            )
                        )
                    }

                    override fun onUserInteraction(miniapp: Miniapp) {
                        sendEvent(
                            "miniappLifecycle", mapOf(
                                "appId" to miniapp.appId,
                                "lifecycle" to "onUserInteraction"
                            )
                        )
                    }
                })
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
            val pageAnimation = runCatching { PageAnimation.valueOf(options.pageAnimation ?: "") }
                    .getOrDefault(PageAnimation.BOTTOM_TO_TOP)
            configBuilder.pageAnimation(pageAnimation)
            configBuilder.enableSplash(options.enableSplash)
            configBuilder.saveState(options.saveState)
            miniapp.setConfig(configBuilder.build())
            miniapp.open(appContext.currentActivity!!)
        }

        Function("setAuthCode") { appId: String, authCode: String ->
            Boxo.getMiniapp(appId)
                .setAuthCode(authCode)
        }

        Function("setAuthTokens") { appId: String, tokens: Map<String, String> ->
            Boxo.getMiniapp(appId)
                .setAuthTokens(tokens)
        }

        Function("sendCustomEvent") { customEvent: CustomEventData ->
            handler?.post {
                Boxo.getMiniapp(customEvent.appId)
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
                Boxo.getMiniapp(paymentEvent.appId)
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
            Boxo.getExistingMiniapp(appId)?.close()
        }

        Function("hideMiniapps") {
            Boxo.hideMiniapps()
        }

        Function("logout") {
            Boxo.logout()
        }

        Function("getMiniapps") {
            Boxo.getMiniapps(object : MiniappListCallback {
                override fun onFailure(e: Exception) {
                    sendEvent("miniappList", mapOf("error" to e.toString()))
                }

                override fun onSuccess(miniapps: List<MiniappData>) {
                    sendEvent("miniappList", mapOf("miniapps" to miniapps.map {
                        mapOf(
                            "name" to it.name,
                            "description" to it.description,
                            "appId" to it.appId,
                            "logo" to it.logo,
                            "category" to it.category,
                        )
                    }))
                }
            })
        }
    }
}
