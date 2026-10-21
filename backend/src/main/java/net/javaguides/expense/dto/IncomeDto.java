package net.javaguides.expense.dto;

import net.javaguides.expense.entity.Category;

import java.math.BigDecimal;
import java.time.LocalDate;


public record IncomeDto(
        Long id,
        BigDecimal amount,
        String description,
        LocalDate incomeDate,
        String incomeCategory
) {
}
