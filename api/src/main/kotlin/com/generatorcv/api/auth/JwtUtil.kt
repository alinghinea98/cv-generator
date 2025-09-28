package com.generatorcv.api.auth

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import java.util.*
import javax.crypto.SecretKey

object JwtUtil {
    private val key: SecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256)
    private const val EXPIRATION: Long = 1000 * 60 * 60 // 1h

    fun generateToken(email: String): String {
        val now = Date()
        val expiry = Date(now.time + EXPIRATION)
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(key)
            .compact()
    }

    fun validateToken(token: String): String? {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
            claims.body.subject
        } catch (e: Exception) {
            null
        }
    }
}
