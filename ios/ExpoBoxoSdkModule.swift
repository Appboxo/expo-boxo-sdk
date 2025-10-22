import ExpoModulesCore
import BoxoSDK

public class ExpoBoxoSdkModule: Module {
    
    public func definition() -> ModuleDefinition {
        Name("ExpoBoxoSdk")
        
        Events("customEvent", "paymentEvent", "miniappLifecycle", "onAuth", "miniappList")
        
        Function("setConfig") { (options : ConfigOptions) in
            var globalTheme : Theme = .System
            switch (options.theme) {
            case "dark":
                globalTheme = .Dark
            case "light":
                globalTheme = .Light
            default:
                globalTheme = .System
            }
            
            let config = Config(clientId: options.clientId, theme: globalTheme)
            config.setUserId(id: options.userId)
            config.language = options.language
            config.sandboxMode = options.sandboxMode
            config.permissionsPage = options.showPermissionsPage
            config.showClearCache = options.showClearCache
            config.showAboutPage = options.showAboutPage
            
            Boxo.shared.setConfig(config: config)
        }
        
        Function("openMiniapp") { (options : MiniappOptions) in
            let miniApp = Boxo.shared.getMiniapp(appId: options.appId)
            miniApp.setData(data: options.data)
            miniApp.delegate = self
            
            let miniappConfig = MiniappConfig()
            miniappConfig.saveState = options.saveState
            miniappConfig.enableSplash(isSplashEnabled: options.enableSplash)
            miniappConfig.setExtraParams(extraParams: options.extraUrlParams)
            miniappConfig.urlSuffix = options.urlSuffix ?? ""
            
            switch options.pageAnimation {
                case "BOTTOM_TO_TOP":
                    miniappConfig.pageAnimation = .BOTTOM_TO_TOP
                case "TOP_TO_BOTTOM":
                    miniappConfig.pageAnimation = .TOP_TO_BOTTOM
                case "LEFT_TO_RIGHT":
                    miniappConfig.pageAnimation = .LEFT_TO_RIGHT
                case "RIGHT_TO_LEFT":
                    miniappConfig.pageAnimation = .RIGHT_TO_LEFT
                case "FADE_IN":
                    miniappConfig.pageAnimation = .FADE_IN
                default:
                    miniappConfig.pageAnimation = .BOTTOM_TO_TOP
            }

            if let theme = options.theme {
                switch theme {
                case "dark":
                    miniappConfig.setTheme(theme: .Dark)
                case "light":
                    miniappConfig.setTheme(theme: .Light)
                case "system":
                    miniappConfig.setTheme(theme: .System)
                default:
                    break
                }
            }
            
            if let colors = options.colors {
                miniappConfig.setColor(color: MiniappColor(primary: colors["primary_color"] ?? "", secondary: colors["secondary_color"] ?? "", tertiary: colors["tertiary_color"] ?? ""))
            }
            
            miniApp.setConfig(config: miniappConfig)
            DispatchQueue.main.async {
                miniApp.open(viewController: UIApplication.shared.delegate!.window!!.rootViewController!)
            }
        }
        
        Function("setAuthCode") { (appId : String, authCode: String) in
            DispatchQueue.main.async {
                Boxo.shared.getMiniapp(appId: appId).setAuthCode(authCode: authCode)
            }
        }

        Function("setAuthTokens") { (appId : String, tokens: [String : Any]) in
            DispatchQueue.main.async {
                Boxo.shared.getMiniapp(appId: appId).setAuthTokens(tokens)
            }
        }
        
        Function("sendCustomEvent") { (customEvent : CustomEventData) in
            let event = CustomEvent()
            event.requestId = customEvent.requestId ?? 0
            event.type = customEvent.type ?? ""
            event.errorType = customEvent.errorType ?? ""
            event.payload = customEvent.payload
            
            DispatchQueue.main.async {
                Boxo.shared.getMiniapp(appId: customEvent.appId).sendCustomEvent(customEvent: event)
            }
        }
        
        Function("sendPaymentEvent") { (paymentEvent : PaymentEventData) in
            let paymentData = PaymentData()
            paymentData.transactionToken = paymentEvent.transactionToken ?? ""
            paymentData.miniappOrderId = paymentEvent.miniappOrderId ?? ""
            paymentData.amount = paymentEvent.amount ?? 0.0
            paymentData.currency = paymentEvent.currency ?? ""
            paymentData.status = paymentEvent.status ?? ""
            paymentData.hostappOrderId = paymentEvent.hostappOrderId ?? ""
            paymentData.extraParams = paymentEvent.extraParams
            
            DispatchQueue.main.async {
                Boxo.shared.getMiniapp(appId: paymentEvent.appId).sendPaymentEvent(paymentData: paymentData)
            }
        }
        
        Function("closeMiniapp") { (appId : String) in
            if let miniapp = Boxo.shared.getExistingMiniapp(appId: appId) {
                DispatchQueue.main.async {
                    miniapp.close()
                }
            }
        }
        
        Function("hideMiniapps") {
            DispatchQueue.main.async {
                Boxo.shared.hideMiniapps()
            }
        }
        
        Function("logout") {
            DispatchQueue.main.async {
                Boxo.shared.logout()
            }
        }
        
        Function("getMiniapps") {
            Boxo.shared.getMiniapps { miniapps, error in
                if let error = error {
                    self.sendEvent("miniappList", ["error" : error])
                } else {
                    self.sendEvent("miniappList", ["miniapps" : miniapps.map { miniappData in
                        return [
                            "appId" : miniappData.appId,
                            "name" : miniappData.name,
                            "category" : miniappData.category,
                            "logo" : miniappData.logo,
                            "description" : miniappData.longDescription
                        ]
                    }])
                }
            }
        }
    }
}

extension ExpoBoxoSdkModule : MiniappDelegate {
    public func didReceivePaymentEvent(miniapp: Miniapp, paymentData: PaymentData) {
        let dict = [
            "appId" : miniapp.appId,
            "transactionToken" : paymentData.transactionToken,
            "miniappOrderId" : paymentData.miniappOrderId,
            "amount" : paymentData.amount,
            "currency" : paymentData.currency,
            "status" : paymentData.status,
            "hostappOrderId" : paymentData.hostappOrderId,
            "extraParams" : paymentData.extraParams ?? [String : Any]()
        ] as [String: Any]
        
        sendEvent("paymentEvent", dict)
    }
    
    public func didReceiveCustomEvent(miniapp: Miniapp, customEvent: CustomEvent) {
        let dict = [
            "appId" : miniapp.appId,
            "requestId" : customEvent.requestId,
            "type" : customEvent.type,
            "errorType" : customEvent.errorType,
            "payload" : customEvent.payload ?? [String : Any]()
        ] as [String: Any]
        
        sendEvent("customEvent", dict)
    }
    
    public func onLaunch(miniapp: Miniapp) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onLaunch"
        ]
        
        sendEvent("miniappLifecycle", dict)
    }
    
    public func onResume(miniapp: Miniapp) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onResume"
        ]
        
        sendEvent("miniappLifecycle", dict)
    }
    
    public func onPause(miniapp: Miniapp) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onPause"
        ]
        
        sendEvent("miniappLifecycle", dict)
    }
    
    public func onClose(miniapp: Miniapp) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onClose"
        ]
        
        sendEvent("miniappLifecycle", dict)
    }
    
    public func onError(miniapp: Miniapp, message: String) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onError",
            "error" : message
        ]
        
        sendEvent("miniappLifecycle", dict)
    }
    
    public func onUserInteraction(miniapp: Miniapp) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onUserInteraction"
        ]
        
        sendEvent("miniappLifecycle", dict)
    }
    
    public func onAuth(miniapp: Miniapp) {
        let dict = [
            "appId" : miniapp.appId,
            "lifecycle" : "onAuth"
        ]
        
        sendEvent("onAuth", dict)
    }
}
