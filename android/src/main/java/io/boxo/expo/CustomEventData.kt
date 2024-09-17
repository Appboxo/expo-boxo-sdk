package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class CustomEventData : Record {
    @Field
    val appId: String = ""

    @Field
    val requestId: Int? = null

    @Field
    val type: String? = null

    @Field
    val errorType: String? = null

    @Field
    val payload: Map<String, Any>? = null
}