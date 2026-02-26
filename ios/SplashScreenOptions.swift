//
//  SplashScreenOptions.swift
//  ExpoBoxoSdk
//

import ExpoModulesCore

struct SplashScreenOptions: Record {
    @Field
    var lightProgressIndicator: String = ""

    @Field
    var lightProgressTrack: String = ""

    @Field
    var darkProgressIndicator: String = ""

    @Field
    var darkProgressTrack: String = ""

    @Field
    var lightBackground: String = ""

    @Field
    var darkBackground: String = ""
}
