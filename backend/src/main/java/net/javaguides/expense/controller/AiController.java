package net.javaguides.expense.controller;

import lombok.AllArgsConstructor;
import net.javaguides.expense.dto.Ai.AiAnalyticsRequest;
import net.javaguides.expense.dto.Ai.AiAnalyticsResponse;
import net.javaguides.expense.dto.Ai.AiExpenseRequest;
import net.javaguides.expense.dto.Ai.AiIncomeRequest;
import net.javaguides.expense.dto.ExpenseDto;
import net.javaguides.expense.dto.IncomeDto;
import net.javaguides.expense.service.AiService;
import net.javaguides.expense.service.AnalyticsAiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiService aiService;
    private final AnalyticsAiService  analyticsAiService;

    @PostMapping("/generate-expense")
    public ExpenseDto generateExpense(@RequestBody AiExpenseRequest request) {
        return aiService.generateExpense(request);

    }

    @PostMapping("/generate-income")
    public IncomeDto generateIncome(@RequestBody AiIncomeRequest request) {
        return aiService.generateIncome(request);

    }
    @PostMapping("/analytics-chat")
    public AiAnalyticsResponse analyticsChat(
            @RequestBody AiAnalyticsRequest request
    ) {
        return analyticsAiService.chat(request);
    }
}