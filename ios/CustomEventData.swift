//
//  CustomEventData.swift
//  ExpoBoxoSdk
//
//  Created by Azamat Kushmanov on 18/9/24.
//

import ExpoModulesCore

struct CustomEventData : Record {
    @Field
    var appId: String = ""

    @Field
    var requestId: Int?

    @Field
    var type: String?

    @Field
    var errorType: String?

    @Field
    var payload: [String : Any]?
}
