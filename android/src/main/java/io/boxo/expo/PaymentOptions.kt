package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class PaymentOptions : Record {
    @Field
    val appId: String = ""

    @Field
    val transactionToken: String? = null

    @Field
    val miniappOrderId: String? = null

    @Field
    val currency: String? = null

    @Field
    val amount: Double? = null

    @Field
    val hostappOrderId: String? = null

    @Field
    val status: String? = null

    @Field
    val extraParams: Map<String, Any>? = null
}