package net.javaguides.expense.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.expense.Mapper.CategoryMapper;
import net.javaguides.expense.Mapper.ExpenseMapper;
import net.javaguides.expense.dto.CategoryDto;
import net.javaguides.expense.dto.ExpenseDto;
import net.javaguides.expense.entity.Category;
import net.javaguides.expense.entity.Expense;
import net.javaguides.expense.entity.User;
import net.javaguides.expense.exceptions.ResourceNotFoundException;
import net.javaguides.expense.repository.CategoryRepository;
import net.javaguides.expense.repository.ExpenseRepository;
import net.javaguides.expense.repository.UserRepository;
import net.javaguides.expense.service.ExpenseService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ExpenseServiceImpl implements ExpenseService {
    //Expense inject
    private ExpenseRepository expenseRepository;
    private CategoryRepository categoryRepository;
    private UserRepository userRepository;


    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String usernameOrEmail = authentication.getName();

        return userRepository
                .findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Current user not found")
                );
    }


    @Override
    public ExpenseDto createExpense(ExpenseDto expenseDto) {
        Expense expense= ExpenseMapper.mapToExpense(expenseDto);
        expense.setUser(getCurrentUser());
        Expense savedExpense=expenseRepository.save(expense);

        return ExpenseMapper.mapToExpenseDto(savedExpense);

    }

    @Override
    public ExpenseDto getExpenseById(Long expenseId) {
        Expense expense = expenseRepository.findByIdAndUser(expenseId,getCurrentUser())
                .orElseThrow(()->new ResourceNotFoundException("Expense not found with id :" +expenseId));


        return ExpenseMapper.mapToExpenseDto(expense);
    }

    @Override
    public List<ExpenseDto> getAllExpenses() {
        User currentUser = getCurrentUser();
        List<Expense>expenses=expenseRepository.findByUser(currentUser);
        return expenses.stream()
                .map((expense)->ExpenseMapper.mapToExpenseDto(expense))
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseDto updateExpense(Long expenseId, ExpenseDto expenseDto) {
        Expense expense=expenseRepository.findByIdAndUser(expenseId,getCurrentUser())
                .orElseThrow(()->new ResourceNotFoundException("Expense not found with id :" +expenseId));
        expense.setAmount(expenseDto.amount());
        expense.setExpenseDate(expenseDto.expenseDate());
        if(expenseDto.categoryDto()!=null){

            Category category= categoryRepository.findById(expenseDto.categoryDto().id())
                    .orElseThrow(()->new ResourceNotFoundException("Category not found with id: "+expenseDto.categoryDto().id()));

            expense.setCategory(category);
        }
        Expense updateExpense=expenseRepository.save(expense);
        return ExpenseMapper.mapToExpenseDto(updateExpense);
    }

    @Override
    public void deleteExpenseById(Long expenseId) {
        Expense expense = expenseRepository.findByIdAndUser(expenseId,getCurrentUser())
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + expenseId));
        expenseRepository.delete(expense);

    }



}
