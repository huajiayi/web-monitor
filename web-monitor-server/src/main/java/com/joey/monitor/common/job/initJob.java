package com.joey.monitor.common.job;

import com.joey.monitor.entity.Config;
import com.joey.monitor.entity.Project;
import com.joey.monitor.repository.ProjectRepository;
import com.joey.monitor.service.ConfigService;
import com.joey.monitor.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class initJob {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ConfigService configService;

    @PostConstruct
    public void init() {
        if(projectRepository.existsDefault() == 0) {
            var defaultConfig = new Config()
                    .setCheckoutEveryNth(-1)
                    .setCheckoutEveryNms(-1)
                    .setBlockClass("rr-block")
                    .setBlockSelector("")
                    .setIgnoreClass("rr-ignore")
                    .setMaskTextClass("rr-mask")
                    .setMaskTextSelector("")
                    .setMaskAllInputs(false)
                    .setMaskInputOptions("{\"password\": true}")
                    .setMaskInputFn("")
                    .setMaskTextFn("")
                    .setSlimDOMOptions("{}")
                    .setInlineStylesheet(true)
                    .setHooks("{}")
                    .setPackFn("")
                    .setSampling("")
                    .setRecordCanvas(false)
                    .setCollectFonts(false)
                    .setRecordLog(false)
                    .setUserTriggeredOnInput(false);

            var config = configService.createConfig(defaultConfig);
            projectRepository.createDefault(config.getId());
        }
    }
}
