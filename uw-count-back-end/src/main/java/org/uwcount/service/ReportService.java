package org.uwcount.service;

import org.uwcount.dto.BSReportLine;
import org.uwcount.dto.PLReportLine;
import org.uwcount.dto.StartDateAndEndDate;

import java.time.LocalDate;
import java.util.List;

public interface ReportService {
    List<PLReportLine> createProfitAndLoss(StartDateAndEndDate startDateAndEndDate);

    List<BSReportLine> createBalanceSheet(LocalDate date);
}
