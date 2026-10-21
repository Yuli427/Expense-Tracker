package net.javaguides.expense.controller;


import lombok.AllArgsConstructor;
import net.javaguides.expense.dto.BudgetDto;
import net.javaguides.expense.service.BudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    private final BudgetService budgetService;


    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(
            @RequestBody BudgetDto budgetDto
    ) {
        BudgetDto savedBudget =
                budgetService.createBudget(budgetDto);

        return new ResponseEntity<>(
                savedBudget,
                HttpStatus.CREATED
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<BudgetDto> getBudgetById(
            @PathVariable("id") Long budgetId
    ) {
        BudgetDto budgetDto =
                budgetService.getBudgetById(budgetId);

        return ResponseEntity.ok(budgetDto);
    }


    @GetMapping
    public ResponseEntity<List<BudgetDto>> getAllBudgets() {

        List<BudgetDto> budgets =
                budgetService.getAllBudgets();

        return ResponseEntity.ok(budgets);
    }

    // get budgets by month
    @GetMapping("/month/{month}")
    public ResponseEntity<List<BudgetDto>> getBudgetsByMonth(
            @PathVariable("month") String month
    ) {
        List<BudgetDto> budgets =
                budgetService.getBudgetsByMonth(month);

        return ResponseEntity.ok(budgets);
    }


    @PutMapping("/{id}")
    public ResponseEntity<BudgetDto> updateBudget(
            @PathVariable("id") Long budgetId,
            @RequestBody BudgetDto budgetDto
    ) {
        BudgetDto updatedBudget =
                budgetService.updateBudget(
                        budgetId,
                        budgetDto
                );

        return ResponseEntity.ok(updatedBudget);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBudget(
            @PathVariable("id") Long budgetId
    ) {
        budgetService.deleteBudget(budgetId);

        return ResponseEntity.ok(
                "Budget deleted successfully!"
        );
    }
}
