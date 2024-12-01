package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/get-data")
    public List<UserDto> getData(@RequestParam String startDate, @RequestParam String endDate, @RequestParam String reportType) {
        List<UserDto> data = null;
        if(reportType.equals("user")){
            data = reportService.getUserActivities(startDate, endDate);
        }
        return data;
    }
}
