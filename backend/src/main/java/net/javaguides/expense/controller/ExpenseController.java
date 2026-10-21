package net.javaguides.expense.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.dto.ExpenseDto;
import net.javaguides.expense.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name="CRUD REST APIs for Expense Resource",
        description = "CRUD REST APIs for Expense Resource - Create Expense"+"Update Expense, Get Expense, and Delete Expense"
)
@AllArgsConstructor
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private ExpenseService expenseService;


    @Operation(
            summary = "Create Expense REST API to save expense into database"

    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP STATUS 201 CREATED"
    )
    //Build create REST API
    @PostMapping
    public ResponseEntity<ExpenseDto>createExpense(@RequestBody ExpenseDto expenseDto){
        ExpenseDto expense=expenseService.createExpense(expenseDto);
        return  new ResponseEntity<>(expense, HttpStatus.CREATED);
    }


    @Operation(
            summary = "Get Expense REST API to get expense in the database"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 GET"
    )

    @GetMapping("{id}")
    public ResponseEntity<ExpenseDto>getCategoryById(@PathVariable("id")Long categoryId){
            ExpenseDto expense=expenseService.getExpenseById(categoryId);
        return   ResponseEntity.ok(expense);
    }

    @Operation(
            summary = "Get all Expense REST API in the database"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 OK"
    )

    @GetMapping
    public ResponseEntity<List<ExpenseDto>>getAllExpenses(){
        List<ExpenseDto>categories=expenseService.getAllExpenses();
        return ResponseEntity.ok(categories);
    }


    @Operation(
            summary = "Update existed Expense REST API"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 OK"
    )
    //update category REST API
    @PutMapping("{id}")
    public ResponseEntity<ExpenseDto>updateExpense(@PathVariable("id") Long expenseId, @RequestBody ExpenseDto expenseDto){
        ExpenseDto updatedExpense=expenseService.updateExpense(expenseId,expenseDto);

        return ResponseEntity.ok(updatedExpense);

    }
    @Operation(
            summary = "Delete Expense REST API"

    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP STATUS 200 OK"
    )

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteExpenseById(@PathVariable("id")Long expenseId){
        expenseService.deleteExpenseById(expenseId);
        return ResponseEntity.ok("Expense deleted successfully.");
    }
}
