package net.javaguides.expense.service;

import net.javaguides.expense.dto.Ai.AiExpenseRequest;
import net.javaguides.expense.dto.Ai.AiIncomeRequest;
import net.javaguides.expense.dto.ExpenseDto;
import net.javaguides.expense.dto.IncomeDto;

public interface AiService {
    ExpenseDto generateExpense(AiExpenseRequest request);
    IncomeDto generateIncome(AiIncomeRequest request);
}
