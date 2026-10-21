package net.javaguides.expense.controller;

import lombok.AllArgsConstructor;
import net.javaguides.expense.dto.IncomeDto;
import net.javaguides.expense.service.IncomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

        private IncomeService incomeService;

        // Create Income
        @PostMapping
        public ResponseEntity<IncomeDto> createIncome(
                @RequestBody IncomeDto incomeDto) {

            IncomeDto savedIncome = incomeService.createIncome(incomeDto);

            return new ResponseEntity<>(savedIncome, HttpStatus.CREATED);
        }

        // Get Income By ID
        @GetMapping("/{id}")
        public ResponseEntity<IncomeDto> getIncomeById(
                @PathVariable("id") Long incomeId) {

            IncomeDto incomeDto = incomeService.getIncomeById(incomeId);

            return ResponseEntity.ok(incomeDto);
        }

        // Get All Incomes
        @GetMapping
        public ResponseEntity<List<IncomeDto>> getAllIncomes() {

            List<IncomeDto> incomes = incomeService.getAllIncomes();

            return ResponseEntity.ok(incomes);
        }

        // Update Income
        @PutMapping("/{id}")
        public ResponseEntity<IncomeDto> updateIncome(
                @PathVariable("id") Long incomeId,
                @RequestBody IncomeDto incomeDto) {

            IncomeDto updatedIncome =
                    incomeService.updateIncome(incomeId, incomeDto);

            return ResponseEntity.ok(updatedIncome);
        }

        // Delete Income
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteIncome(
                @PathVariable("id") Long incomeId) {

            incomeService.deleteIncome(incomeId);

            return ResponseEntity.ok("Income deleted successfully!");
        }

}
