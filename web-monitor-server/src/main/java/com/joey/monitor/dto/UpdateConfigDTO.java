package com.joey.monitor.dto;

import com.joey.monitor.entity.Config;
import lombok.Value;

import javax.validation.constraints.NotNull;

@Value
public class UpdateConfigDTO {

    @NotNull
    private Integer projectId;

    @NotNull
    private Config config;
}
