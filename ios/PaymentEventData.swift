//
//  PaymentEventData.swift
//  ExpoBoxoSdk
//
//  Created by Azamat Kushmanov on 18/9/24.
//

import ExpoModulesCore

struct PaymentEventData : Record {
    @Field
    var appId: String = ""
    
    @Field
    var transactionToken: String?
    
    @Field
    var miniappOrderId: String?
    
    @Field
    var currency: String?
    
    @Field
    var amount: Double?
    
    @Field
    var hostappOrderId: String?
    
    @Field
    var status: String?
    
    @Field
    var extraParams: [String : Any]?
}
