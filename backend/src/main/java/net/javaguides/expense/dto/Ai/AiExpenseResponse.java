package net.javaguides.expense.dto.Ai;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiExpenseResponse {
    private BigDecimal amount;
    private LocalDate expenseDate;
    private String description;
    private String category;
}
