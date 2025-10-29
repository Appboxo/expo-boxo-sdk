//
//  ConsentScreenConfigOptions.swift
//  ExpoBoxoSdk
//
//  Created by Azamat Kushmanov on 29/10/25.
//

import ExpoModulesCore

struct ConsentScreenConfigOptions : Record {
    @Field
    var title: String?

    @Field
    var noRequiredFieldsDescription: String?

    @Field
    var requiredFieldsDescription: String?

    @Field
    var allowButtonTitle: String?

    @Field
    var cancelButtonTitle: String?
}
