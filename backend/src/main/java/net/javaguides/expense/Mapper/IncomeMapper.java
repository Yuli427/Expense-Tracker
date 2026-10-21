package net.javaguides.expense.Mapper;

import net.javaguides.expense.dto.IncomeDto;
import net.javaguides.expense.entity.Income;

public class IncomeMapper {


    public static IncomeDto mapToincomeDto(Income income) {
        return new IncomeDto
                (income.getId(), income.getAmount(), income.getDescription(), income.getIncomeDate(),income.getIncomeCategory());
    }

    public static Income mapToIncome(IncomeDto incomeDto){
        return new Income(incomeDto.id(),incomeDto.amount(),incomeDto.description(),incomeDto.incomeDate(),incomeDto.incomeCategory(),null);
    }

}


//    private Long id;
//    private BigDecimal amount;
//    private String description;
//    private LocalDate incomeDate;