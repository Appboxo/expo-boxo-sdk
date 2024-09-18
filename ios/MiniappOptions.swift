//
//  MiniappOptions.swift
//  ExpoBoxoSdk
//
//  Created by Azamat Kushmanov on 18/9/24.
//

import ExpoModulesCore

struct MiniappOptions: Record {
    @Field
    var appId: String = ""
    
    @Field
    var data: [String : Any]?
    
    @Field
    var theme: String?
    
    @Field
    var extraUrlParams: [String : String]?
    
    @Field
    var urlSuffix: String?
    
    @Field
    var colors: [String : String]?
    
    @Field
    var enableSplash: Bool = true
    
    @Field
    var saveState: Bool = true
}
