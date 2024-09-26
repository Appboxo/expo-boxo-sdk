//
//  ConfigOptions.swift
//  ExpoBoxoSdk
//
//  Created by Azamat Kushmanov on 18/9/24.
//

import ExpoModulesCore

struct ConfigOptions: Record {
    @Field
    var clientId: String = ""
    
    @Field
    var userId: String = ""
    
    @Field
    var language: String = "en"
    
    @Field
    var sandboxMode: Bool = false
    
    @Field
    var multitaskMode: Bool = false
    
    @Field
    var theme: String = "system"
    
    @Field
    var isDebug: Bool = false
    
    @Field
    var showPermissionsPage: Bool = true
    
    @Field
    var showClearCache: Bool = true
    
    @Field
    var showAboutPage: Bool = true
}
