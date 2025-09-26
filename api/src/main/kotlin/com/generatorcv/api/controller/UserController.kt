package com.generatorcv.api.controller

import com.generatorcv.api.domain.User
import com.generatorcv.api.repo.UserRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(val repo: UserRepository) {

    @GetMapping
    fun all(): List<User> = repo.findAll()

    @PostMapping
    fun create(@RequestBody user: User): User = repo.save(user)
}
