package net.javaguides.expense.dto;

import java.math.BigDecimal;

public record BudgetDto(Long id,
                        BigDecimal amount,
                        String month,
                        CategoryDto categoryDto)

 {
    }
