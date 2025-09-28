package com.generatorcv.api.auth

import com.generatorcv.api.auth.dto.*
import com.generatorcv.api.domain.User
import com.generatorcv.api.repo.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val repo: UserRepository
) {
    private val encoder = BCryptPasswordEncoder()

    fun register(req: RegisterRequest): String {
        if (repo.findByEmail(req.email) != null) {
            throw IllegalArgumentException("Email already exists")
        }
        val user = User(
            name = req.name,
            email = req.email,
            password = encoder.encode(req.password)
        )
        repo.save(user)
        return JwtUtil.generateToken(user.email)
    }

    fun login(req: LoginRequest): String {
        val user = repo.findByEmail(req.email) ?: throw IllegalArgumentException("User not found")
        if (!encoder.matches(req.password, user.password)) {
            throw IllegalArgumentException("Invalid password")
        }
        return JwtUtil.generateToken(user.email)
    }
}
