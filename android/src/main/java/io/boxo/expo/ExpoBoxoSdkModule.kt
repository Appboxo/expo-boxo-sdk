package io.boxo.expo

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.appboxo.sdk.*

class ExpoBoxoSdkModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("ExpoBoxoSdk")

        Events("customEvent", "paymentEvent", "miniappLifecycle", "onAuth")

        Function("setConfig") { options: ConfigOptions ->
            val globalTheme: Config.Theme = when (options.theme) {
                "light" -> Config.Theme.LIGHT
                "dark" -> Config.Theme.DARK
                else -> Config.Theme.SYSTEM
            }
            Appboxo
                .init(appContext.activityProvider!!.currentActivity.application)
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
//                .setCustomEventListener(this)
//                .setPaymentEventListener(this)
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
            miniapp.open(appContext.activityProvider!!.currentActivity)
        }

        Function("setAuthCode") { appId: String, authCode: String ->
            Appboxo.getMiniapp(appId)
                .setAuthCode(authCode)
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

        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { value: String ->
            // Send an event to JavaScript.
            sendEvent(
                "onChange", mapOf(
                    "value" to value
                )
            )
        }
    }
}
