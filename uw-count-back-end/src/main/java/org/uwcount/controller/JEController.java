package org.uwcount.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.uwcount.dto.JnlEntry;
import org.uwcount.service.JEService;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/je")
public class JEController {

    private final JEService service;

    @PostMapping("/add")
    public ResponseEntity<JnlEntry> add(@RequestBody JnlEntry je) {
        JnlEntry created = service.addJE(je);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
