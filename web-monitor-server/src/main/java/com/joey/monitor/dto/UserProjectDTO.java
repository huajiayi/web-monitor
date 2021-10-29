package com.joey.monitor.dto;

import lombok.Value;

import javax.validation.constraints.NotNull;

@Value
public class UserProjectDTO {

    @NotNull(message = "userId不可为空")
    private Integer userId;

    @NotNull(message = "projectId不可为空")
    private Integer projectId;
}
