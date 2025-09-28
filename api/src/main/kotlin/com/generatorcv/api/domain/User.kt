package com.generatorcv.api.domain

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    val name: String,
    @Column(unique = true)
    val email: String,
    val password: String
)