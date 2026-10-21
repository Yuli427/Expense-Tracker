package net.javaguides.expense.service.impl;

import net.javaguides.expense.Mapper.ExpenseMapper;
import net.javaguides.expense.Mapper.IncomeMapper;
import net.javaguides.expense.dto.*;
import net.javaguides.expense.dto.Ai.AiExpenseRequest;
import net.javaguides.expense.dto.Ai.AiExpenseResponse;
import net.javaguides.expense.dto.Ai.AiIncomeRequest;
import net.javaguides.expense.dto.Ai.AiIncomeResponse;
import net.javaguides.expense.entity.Category;
import net.javaguides.expense.entity.Expense;
import net.javaguides.expense.entity.Income;
import net.javaguides.expense.entity.User;
import net.javaguides.expense.exceptions.ResourceNotFoundException;
import net.javaguides.expense.repository.CategoryRepository;
import net.javaguides.expense.repository.ExpenseRepository;
import net.javaguides.expense.repository.IncomeRepository;
import net.javaguides.expense.repository.UserRepository;
import net.javaguides.expense.service.AiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;
    private final ExpenseRepository expenseRepository;
    private final PromptTemplate promptTemplate;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final PromptTemplate incomePromptTemplate;


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

    public AiServiceImpl(ChatClient.Builder chatClientBuilder, ExpenseRepository expenseRepository, UserRepository userRepository, CategoryRepository categoryRepository,IncomeRepository incomeRepository)
    {
        this.chatClient=chatClientBuilder.build();
        this.expenseRepository=expenseRepository;
        this.userRepository=userRepository;
        this.categoryRepository = categoryRepository;
        this.incomeRepository=incomeRepository;

        this.promptTemplate=new PromptTemplate(
                new ClassPathResource("prompts/generate-expense.st")
        );

        this.incomePromptTemplate = new PromptTemplate(
                new ClassPathResource("prompts/generate-income.st")
        );
    }



    @Override
    public ExpenseDto generateExpense(AiExpenseRequest request) {
        AiExpenseResponse response= chatClient
                .prompt(
                        promptTemplate.create(
                                Map.of(
                                        "prompt",request.getPrompt(),
                                        "currentTime", LocalDateTime.now()
                                )
                        )
                )
                .call()
                .entity(AiExpenseResponse.class);

        Expense expense= new Expense();
        expense.setAmount(response.getAmount());
        expense.setDescription(response.getDescription());
        expense.setExpenseDate(response.getExpenseDate());


        Category category=categoryRepository.findByName(response.getCategory())
                .orElseGet(() -> {

                    Category newCategory = new Category();

                    newCategory.setName(response.getCategory());

                    return categoryRepository.save(newCategory);
                });


        expense.setCategory(category);
        expense.setUser(getCurrentUser());
        Expense savedExpense=expenseRepository.save(expense);
        return ExpenseMapper.mapToExpenseDto(savedExpense);




    }


    @Override
    public IncomeDto generateIncome(AiIncomeRequest request) {

        AiIncomeResponse response = chatClient
                .prompt(
                        incomePromptTemplate.create(
                                Map.of(
                                        "prompt", request.getPrompt(),
                                        "currentTime", LocalDateTime.now()
                                )
                        )
                )
                .call()
                .entity(AiIncomeResponse.class);

        Income income = new Income();

        income.setAmount(response.getAmount());
        income.setDescription(response.getDescription());
        income.setIncomeDate(response.getIncomeDate());
        income.setIncomeCategory(response.getCategory());

        income.setUser(getCurrentUser());

        Income savedIncome = incomeRepository.save(income);

        return IncomeMapper.mapToincomeDto(savedIncome);
    }
}

