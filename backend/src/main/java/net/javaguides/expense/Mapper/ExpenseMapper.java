package net.javaguides.expense.Mapper;


import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.dto.ExpenseDto;
import net.javaguides.expense.entity.Category;
import net.javaguides.expense.entity.Expense;

    public class ExpenseMapper {


        public static ExpenseDto mapToExpenseDto(Expense expense){
            return new ExpenseDto(expense.getId(),
                    expense.getAmount(),
                    expense.getExpenseDate(),
                    expense.getDescription(),
                    new CategoryDto(expense.getCategory().getId(), expense.getCategory().getName()));
        }


        public static Expense mapToExpense(ExpenseDto expenseDto){
            return new Expense(expenseDto.id(),
                    expenseDto.amount(),
                    expenseDto.expenseDate(),
                    expenseDto.description(),
                    new Category(expenseDto.categoryDto().id(), expenseDto.categoryDto().name()),
                            null);
        }

    }

