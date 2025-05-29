package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.BSReportLine;
import org.uwcount.dto.PLReportLine;
import org.uwcount.dto.StartDateAndEndDate;
import org.uwcount.service.ReportService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@CrossOrigin
public class ReportController {

    private final ReportService service;

    @PostMapping("/pl")
    public ResponseEntity<List<PLReportLine>> createProfitAndLoss(@RequestBody StartDateAndEndDate startDateAndEndDate){
        List<PLReportLine> pLReportLinesCreated = service.createProfitAndLoss(startDateAndEndDate);
        return ResponseEntity.ok(pLReportLinesCreated);
    }

    @PostMapping("/bs")
    public ResponseEntity<List<BSReportLine>> createBalanceSheet(@RequestBody StartDateAndEndDate date) {
        System.out.println(date);
        List<BSReportLine> bSReportLinesCreated = service.createBalanceSheet(date.getEndDate());
        return ResponseEntity.ok(bSReportLinesCreated);
    }
}
