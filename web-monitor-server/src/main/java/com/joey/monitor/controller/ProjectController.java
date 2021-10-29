package com.joey.monitor.controller;

import com.joey.monitor.dto.AddRecordDTO;
import com.joey.monitor.dto.UpdateConfigDTO;
import com.joey.monitor.dto.UserProjectDTO;
import com.joey.monitor.entity.Project;
import com.joey.monitor.common.response.Response;
import com.joey.monitor.common.response.Result;
import com.joey.monitor.service.ProjectService;
import com.joey.monitor.service.RecordService;
import com.joey.monitor.vo.ProjectVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

@CrossOrigin
@Api(tags = "Project")
@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private RecordService recordService;

    @ApiOperation("获取分页后的项目")
    @GetMapping("/pagedProjects")
    public Response<Page<ProjectVO>> getPagedProjects(@RequestParam int pageNum, @RequestParam int pageSize) {
        var pagedProjects = projectService.getPagedProjects(pageNum - 1, pageSize);
        if(null == pagedProjects) {
            return Response.failure(Result.ERROR);
        }

        return Response.success(pagedProjects);
    }

    @ApiOperation("获取项目")
    @GetMapping("/{id}")
    public Response<Project> getProject(@PathVariable int id) {
        var project = projectService.getProject(id);
        return Response.success(project);
    }

    @ApiOperation("创建项目")
    @PostMapping
    public Response<Project> createProject(@Validated @RequestBody Project project) {
        var createdProject = projectService.createProject(project);
        return Response.success(createdProject);
    }

    @ApiOperation("编辑项目")
    @PutMapping
    public Response<Project> updateProject(@Validated @RequestBody Project project) {
        var updatedProject = projectService.updateProject(project);
        return Response.success(updatedProject);
    }

    @ApiOperation("删除项目")
    @DeleteMapping("/{id}")
    public Response deleteProject(@PathVariable int id) {
        projectService.deleteProject(id);
        return Response.success();
    }

    @ApiOperation("添加用户")
    @PostMapping("/addUser")
    public Response addUser(@Validated @RequestBody UserProjectDTO userProjectDto) {
        projectService.addUser(userProjectDto.getUserId(), userProjectDto.getProjectId());
        return Response.success();
    }

    @ApiOperation("编辑配置")
    @PostMapping("/updateConfig")
    public Response updateConfig(@Validated @RequestBody UpdateConfigDTO updateConfigDTO) {
        projectService.updateConfig(updateConfigDTO.getProjectId(), updateConfigDTO.getConfig());
        return Response.success();
    }

    @ApiOperation("增加记录")
    @PostMapping("/addRecord")
    public Response addRecord(@Validated @RequestBody AddRecordDTO addRecordDTO) {
        projectService.addRecord(addRecordDTO.getProjectId(), addRecordDTO.getRecord());
        return Response.success();
    }

    @ApiOperation("获取分页记录")
    @PostMapping("/pagedRecords")
    public Response getPagedRecords(@RequestParam int projectId, @RequestParam int pageNum, @RequestParam int pageSize) {
        var pagedRecords = recordService.getPagedRecordsByProjectId(projectId, pageNum - 1, pageSize);
        if(null == pagedRecords) {
            return Response.failure(Result.ERROR);
        }

        return Response.success(pagedRecords);
    }

    @PostMapping("/download")
    public void download(HttpServletResponse response) {
        try {
            // path是指想要下载的文件的路径
            File file = new File("C://Users//16019//Documents//WeChat Files//wxid_ce4ky3x7milm11//FileStorage//File//2021-09//【加勒比海盗】 - 原版_原版谱_pop_31787.pdf");
            // 获取文件名
            String filename = file.getName();
            // 获取文件后缀名
            String ext = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();

            // 将文件写入输入流
            FileInputStream fileInputStream = new FileInputStream(file);
            InputStream fis = new BufferedInputStream(fileInputStream);
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();

            // 清空response
            response.reset();
            // 设置response的Header
            response.setCharacterEncoding("UTF-8");
            //Content-Disposition的作用：告知浏览器以何种方式显示响应返回的文件，用浏览器打开还是以附件的形式下载到本地保存
            //attachment表示以附件方式下载   inline表示在线打开   "Content-Disposition: inline; filename=文件名.mp3"
            // filename表示文件的默认名称，因为网络传输只支持URL编码的相关支付，因此需要将文件名URL编码后进行传输,前端收到后需要反编码才能获取到真正的名称
            response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
            // 告知浏览器文件的大小
            response.addHeader("Content-Length", "" + file.length());
            OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            outputStream.write(buffer);
            outputStream.flush();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
