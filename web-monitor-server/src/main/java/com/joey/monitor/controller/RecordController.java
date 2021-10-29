package com.joey.monitor.controller;

import com.joey.monitor.common.response.Response;
import com.joey.monitor.entity.Project;
import com.joey.monitor.entity.Record;
import com.joey.monitor.service.RecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "Record")
@RestController
@RequestMapping("/record")
public class RecordController {

    @Autowired
    private RecordService recordService;

    @ApiOperation("获取记录")
    @GetMapping("/{id}")
    public Response<Record> getRecord(@PathVariable int id) {
        var record = recordService.getRecord(id);
        return Response.success(record);
    }

    @ApiOperation("获取记录回放")
    @GetMapping("/{id}/events")
    public Response<String> getRecordEvents(@PathVariable int id) {
        var recordEvents = recordService.getRecordEvents(id);
        return Response.success(recordEvents);
    }
}
