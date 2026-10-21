package net.javaguides.expense.service;

import net.javaguides.expense.dto.IncomeDto;
import java.util.List;

public interface IncomeService {
    IncomeDto createIncome(IncomeDto incomeDto);

    IncomeDto getIncomeById(Long incomeId);

    List<IncomeDto> getAllIncomes();

    IncomeDto updateIncome(Long incomeId, IncomeDto incomeDto);

    void deleteIncome(Long incomeId);
}
