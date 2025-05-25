package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.PLReportLine;
import org.uwcount.dto.StartDateAndEndDate;
import org.uwcount.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@CrossOrigin
public class ReportController {

    private final ReportService service;

    @PostMapping("/pl")
    public ResponseEntity<List<PLReportLine>> createProfitAndLoss(@RequestBody StartDateAndEndDate startDateAndEndDate){
        System.out.println("startDateAndEndDate: 22: " + startDateAndEndDate);
        List<PLReportLine> pLReportLineCreated = service.createProfitAndLoss(startDateAndEndDate);
        return ResponseEntity.ok(pLReportLineCreated);
    }
}
