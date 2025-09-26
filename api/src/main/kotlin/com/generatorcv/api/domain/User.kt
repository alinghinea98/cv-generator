package com.generatorcv.api.domain

import jakarta.persistence.*
import java.util.*

@Entity
data class User(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    val name: String,
    val email: String
)