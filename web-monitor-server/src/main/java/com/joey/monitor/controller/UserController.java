package com.joey.monitor.controller;

import com.joey.monitor.common.response.Response;
import com.joey.monitor.common.response.Result;
import com.joey.monitor.entity.User;
import com.joey.monitor.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Api(tags = "User")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @ApiOperation("获取分页后的用户")
    @GetMapping("/pagedUsers")
    public Response<Page<User>> getPagedUsers(@RequestParam int pageNum, @RequestParam int pageSize) {
        var pagedUsers = userService.getPagedUsers(pageNum - 1, pageSize);
        if(null == pagedUsers) {
            return Response.failure(Result.ERROR);
        }

        return Response.success(pagedUsers);
    }

    @ApiOperation("获取用户")
    @GetMapping("/{id}")
    public Response<User> getUser(@PathVariable int id) {
        var user = userService.getUser(id);
        return Response.success(user);
    }

    @ApiOperation("创建用户")
    @PostMapping
    public Response<User> createUser(@Validated @RequestBody User user) {
        var createdUser = userService.createUser(user);
        return Response.success(createdUser);
    }

    @ApiOperation("编辑用户")
    @PutMapping
    public Response<User> updateUser(@Validated @RequestBody User user) {
        var updatedUser = userService.updateUser(user);
        return Response.success(updatedUser);
    }

    @ApiOperation("删除用户")
    @DeleteMapping("/{id}")
    public Response deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return Response.success();
    }
}
