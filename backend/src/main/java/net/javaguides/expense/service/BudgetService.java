package net.javaguides.expense.service;

import net.javaguides.expense.dto.BudgetDto;

import java.util.List;

public interface BudgetService {
    BudgetDto createBudget(BudgetDto budgetDto);

    BudgetDto getBudgetById(Long budgetId);

    List<BudgetDto> getAllBudgets();

    List<BudgetDto> getBudgetsByMonth(String month);

    BudgetDto updateBudget(Long budgetId, BudgetDto budgetDto);

    void deleteBudget(Long budgetId);
}
