package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class SplashScreenOptions : Record {
    @Field
    val lightProgressIndicator: String = ""

    @Field
    val lightProgressTrack: String = ""

    @Field
    val darkProgressIndicator: String = ""

    @Field
    val darkProgressTrack: String = ""

    @Field
    val lightBackground: String = ""

    @Field
    val darkBackground: String = ""
}
