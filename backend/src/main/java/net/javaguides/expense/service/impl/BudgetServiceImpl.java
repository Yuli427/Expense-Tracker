package net.javaguides.expense.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.expense.Mapper.BudgetMapper;
import net.javaguides.expense.Mapper.ExpenseMapper;
import net.javaguides.expense.dto.BudgetDto;
import net.javaguides.expense.entity.Budget;
import net.javaguides.expense.entity.Category;
import net.javaguides.expense.entity.Expense;
import net.javaguides.expense.entity.User;
import net.javaguides.expense.exceptions.ResourceNotFoundException;
import net.javaguides.expense.repository.BudgetRepository;
import net.javaguides.expense.repository.CategoryRepository;
import net.javaguides.expense.repository.UserRepository;
import net.javaguides.expense.service.BudgetService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class BudgetServiceImpl implements BudgetService {
    UserRepository userRepository;
    BudgetRepository budgetRepository;
    CategoryRepository categoryRepository;


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
    public BudgetDto createBudget(BudgetDto budgetDto) {
        System.out.println("1. DTO amount = " + budgetDto.amount());
        Budget budget= BudgetMapper.mapToBudget(budgetDto);
        System.out.println("2. Entity amount = " + budget.getAmount());
        budget.setUser(getCurrentUser());

        Budget savedBudget= budgetRepository.save(budget);
        System.out.println("3. Saved amount = " + savedBudget.getAmount());
        return BudgetMapper.mapToBudgetDto(savedBudget);
    }

    @Override
    public BudgetDto getBudgetById(Long budgetId) {

        Budget budget = budgetRepository.findByIdAndUser(budgetId,getCurrentUser())
                .orElseThrow(()->new ResourceNotFoundException("Budget not found with id: "+budgetId));


        return BudgetMapper.mapToBudgetDto(budget);
    }

    @Override
    public List<BudgetDto> getAllBudgets() {
        User currentUser = getCurrentUser();
        List<Budget>budgets=budgetRepository.findByUser(currentUser);
        return budgets.stream()
                .map((budget)-> BudgetMapper.mapToBudgetDto(budget))
                .collect(Collectors.toList());
    }

    @Override
    public List<BudgetDto> getBudgetsByMonth(String month) {
        User currentUser = getCurrentUser();
        List<Budget>budgets=budgetRepository.findByUserAndMonth(currentUser,month);
        return budgets.stream()
                .map((budget)-> BudgetMapper.mapToBudgetDto(budget))
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDto updateBudget(Long budgetId, BudgetDto budgetDto) {
        Budget budget=budgetRepository.findByIdAndUser(budgetId,getCurrentUser())
                .orElseThrow(()->new ResourceNotFoundException("budget not found with id:"+budgetId));

        budget.setAmount(budgetDto.amount());
        budget.setMonth(budgetDto.month());
        if(budgetDto.categoryDto()!=null){

            Category category= categoryRepository.findById(budgetDto.categoryDto().id())
                    .orElseThrow(()->new ResourceNotFoundException("Category not found with id: "+budgetDto.categoryDto().id()));

            budget.setCategory(category);
        }
        Budget updatedBudget=budgetRepository.save(budget);

        return BudgetMapper.mapToBudgetDto(updatedBudget);
    }

    @Override
    public void deleteBudget(Long budgetId) {
        Budget budget =budgetRepository.findByIdAndUser(budgetId,getCurrentUser())
                .orElseThrow(() -> new ResourceNotFoundException("Budget not found with id: " + budgetId));
        budgetRepository.delete(budget);

    }
}
