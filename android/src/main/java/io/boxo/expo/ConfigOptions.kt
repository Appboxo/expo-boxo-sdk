package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ConfigOptions : Record {
    @Field
    val clientId: String = ""

    @Field
    val userId: String = ""

    @Field
    val language: String = "en"

    @Field
    val sandboxMode: Boolean = false

    @Field
    val multitaskMode: Boolean = false

    @Field
    val theme: String = "system"

    @Field
    val isDebug: Boolean = false

    @Field
    val showPermissionsPage: Boolean = true

    @Field
    val showClearCache: Boolean = true

    @Field
    val showAboutPage: Boolean = true

    @Field
    val consentScreenConfig: ConsentScreenConfigOptions? = null
}