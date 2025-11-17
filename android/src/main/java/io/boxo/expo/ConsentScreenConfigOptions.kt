package io.boxo.expo

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ConsentScreenConfigOptions : Record {
    @Field
    val title: String? = ""

    @Field
    val noRequiredFieldsDescription: String? = ""

    @Field
    val requiredFieldsDescription: String? = ""

    @Field
    val allowButtonTitle: String? = ""

    @Field
    val cancelButtonTitle: String? = ""
}
