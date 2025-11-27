package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class MiniappOptions : Record {
    @Field
    val appId: String = ""

    @Field
    val data: Map<String, Any>? = null

    @Field
    val theme: String? = null

    @Field
    val extraUrlParams: Map<String, Any>? = null

    @Field
    val urlSuffix: String? = null

    @Field
    val colors: Map<String, String>? = null

    @Field
    val enableSplash: Boolean = true

    @Field
    val saveState: Boolean = false

    @Field
    val pageAnimation: String? = null
}