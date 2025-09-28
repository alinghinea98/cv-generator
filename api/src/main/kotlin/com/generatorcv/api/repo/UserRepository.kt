package com.generatorcv.api.repo

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*
import com.generatorcv.api.domain.User

interface UserRepository : JpaRepository<User, UUID> {
    fun findByEmail(email: String): User?
}