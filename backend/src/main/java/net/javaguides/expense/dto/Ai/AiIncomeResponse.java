package net.javaguides.expense.dto.Ai;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class AiIncomeResponse {
    private BigDecimal amount;
    private LocalDate incomeDate;
    private String description;
    private String category;
}
