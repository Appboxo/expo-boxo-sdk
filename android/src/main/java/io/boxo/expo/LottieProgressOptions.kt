package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class LottieProgressOptions : Record {
    @Field
    val light: String = ""

    @Field
    val dark: String? = null

    @Field
    val width: Int? = null

    @Field
    val height: Int? = null

}
