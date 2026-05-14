//
//  LottieProgressOptions.swift
//  ExpoBoxoSdk
//

import ExpoModulesCore

struct LottieProgressOptions: Record {
    @Field
    var light: String = ""

    @Field
    var dark: String?

    @Field
    var width: Int?

    @Field
    var height: Int?
}
