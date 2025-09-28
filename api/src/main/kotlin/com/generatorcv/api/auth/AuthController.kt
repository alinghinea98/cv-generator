package com.generatorcv.api.auth

import org.springframework.http.ResponseEntity
import jakarta.validation.Valid
import com.generatorcv.api.auth.dto.UserResponse
import com.generatorcv.api.auth.dto.*
import com.generatorcv.api.auth.AuthService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController(
    private val service: AuthService
) {

    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<String> {
        return ResponseEntity.ok(service.register(request))
    }

    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): AuthResponse {
        val token = service.login(req)
        return AuthResponse(token)
    }
}
