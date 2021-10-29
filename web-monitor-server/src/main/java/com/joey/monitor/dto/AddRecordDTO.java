package com.joey.monitor.dto;

import com.joey.monitor.entity.Record;
import lombok.Value;

import javax.validation.constraints.NotNull;

@Value
public class AddRecordDTO {

    @NotNull
    private Integer projectId;

    @NotNull
    private Record record;
}
