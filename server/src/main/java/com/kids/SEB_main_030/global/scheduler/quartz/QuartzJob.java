package com.kids.SEB_main_030.global.scheduler.quartz;

import com.kids.SEB_main_030.global.scheduler.service.SchedulerService;
import lombok.RequiredArgsConstructor;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
@RequiredArgsConstructor
@Component
public class QuartzJob extends QuartzJobBean {
    private final SchedulerService schedulerService;
    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        try {
            schedulerService.mainService();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}