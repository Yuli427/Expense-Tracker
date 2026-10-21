package net.javaguides.expense.service.impl;

import net.javaguides.expense.dto.Ai.AiAnalyticsRequest;
import net.javaguides.expense.dto.Ai.AiAnalyticsResponse;
import net.javaguides.expense.entity.*;
import net.javaguides.expense.exceptions.ResourceNotFoundException;
import net.javaguides.expense.repository.BudgetRepository;
import net.javaguides.expense.repository.ExpenseRepository;
import net.javaguides.expense.repository.IncomeRepository;
import net.javaguides.expense.repository.UserRepository;
import net.javaguides.expense.service.AnalyticsAiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsAiServiceImpl implements AnalyticsAiService {

    private final ChatClient chatClient;
    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final BudgetRepository budgetRepository;
    private final PromptTemplate promptTemplate;

    public AnalyticsAiServiceImpl(
            ChatClient.Builder chatClientBuilder,
            ExpenseRepository expenseRepository,
            IncomeRepository incomeRepository,
            UserRepository userRepository,
            BudgetRepository budgetRepository
    ) {
        this.chatClient = chatClientBuilder.build();
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
        this.budgetRepository=budgetRepository;

        this.promptTemplate = new PromptTemplate(
                new ClassPathResource("prompts/analytics-chat.st")
        );
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String usernameOrEmail = authentication.getName();

        return userRepository
                .findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Current user not found"
                        )
                );
    }

    @Override
    public AiAnalyticsResponse chat(AiAnalyticsRequest request) {

        User currentUser = getCurrentUser();

        List<Expense> expenses =
                expenseRepository.findByUser(currentUser);

        List<Income> incomes =
                incomeRepository.findByUser(currentUser);

        List<Budget> budgets= budgetRepository.findByUser(currentUser);

        String expenseData=expenses.stream()
                .map(  expense->"Amount: " + expense.getAmount()
                        + ", Description: " + expense.getDescription()
                        + ", Category: " + expense.getCategory().getName()
                        + ", Date: " + expense.getExpenseDate()
                ).collect(Collectors.joining("/n"));

        String incomeData=incomes.stream()
                .map(  income->"Amount: " + income.getAmount()
                        + ", Description: " + income.getDescription()
                        + ", Category: " + income.getIncomeCategory()
                        + ", Date: " + income.getIncomeDate()
                ).collect(Collectors.joining("/n"));


        String budgetData=budgets.stream()
                .map(budget -> "Amount: "+ budget.getAmount()
                        +", month: "+budget.getMonth() + "Category: "+ budget.getCategory().getName()).collect(Collectors.joining("\n"));




        return chatClient
                .prompt(
                        promptTemplate.create(
                                Map.of(
                                        "prompt", request.getPrompt(),
                                        "currentTime", LocalDateTime.now(),
                                        "expenses", expenseData,
                                        "incomes", incomeData,
                                        "budgets",budgetData
                                )
                        )
                )
                .call()
                .entity(AiAnalyticsResponse.class);
    }
}