package net.javaguides.expense.Mapper;

import net.javaguides.expense.dto.BudgetDto;
import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.entity.Budget;
import net.javaguides.expense.entity.Category;

public class BudgetMapper {

    public static BudgetDto mapToBudgetDto(Budget budget){
        return new BudgetDto(budget.getId(),
                budget.getAmount(),
                budget.getMonth(),
                new CategoryDto(budget.getCategory().getId(),budget.getCategory().getName()));

    }

    public static Budget mapToBudget(BudgetDto budgetdto){
        return new Budget(budgetdto.id(),budgetdto.amount(),budgetdto.month(),new Category(budgetdto.categoryDto().id(),budgetdto.categoryDto().name()),null);
    }
}
