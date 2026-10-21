package net.javaguides.expense.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.expense.Mapper.IncomeMapper;
import net.javaguides.expense.dto.IncomeDto;
import net.javaguides.expense.entity.Category;
import net.javaguides.expense.entity.Income;
import net.javaguides.expense.entity.User;
import net.javaguides.expense.exceptions.ResourceNotFoundException;
import net.javaguides.expense.repository.CategoryRepository;
import net.javaguides.expense.repository.IncomeRepository;
import net.javaguides.expense.repository.UserRepository;
import net.javaguides.expense.service.IncomeService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class IncomeServiceImpl implements IncomeService {
    private IncomeRepository incomeRepository;
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
    public IncomeDto createIncome(IncomeDto incomeDto) {
        Income income= IncomeMapper.mapToIncome(incomeDto);
        income.setUser(getCurrentUser());
        Income savedIncome=incomeRepository.save(income);

        return IncomeMapper.mapToincomeDto(savedIncome);
    }

    @Override
    public IncomeDto getIncomeById(Long incomeId) {
        Income income = incomeRepository.findByIdAndUser(incomeId,getCurrentUser())
                .orElseThrow(()->new ResourceNotFoundException("Income not found with id :" +incomeId));


        return IncomeMapper.mapToincomeDto(income);
    }

    @Override
    public List<IncomeDto> getAllIncomes() {
        List<Income>incomes=incomeRepository.findByUser(getCurrentUser());
        return incomes.stream()
                .map((income)->IncomeMapper.mapToincomeDto(income))
                .collect(Collectors.toList());
    }

    @Override
    public IncomeDto updateIncome(Long incomeId, IncomeDto incomeDto) {
       Income income=incomeRepository.findByIdAndUser(incomeId,getCurrentUser())
               .orElseThrow(()->new ResourceNotFoundException("Income not found with id :" + incomeId));
       income.setAmount(incomeDto.amount());
       income.setIncomeDate(incomeDto.incomeDate());
       income.setDescription(incomeDto.description());
       income.setIncomeCategory(incomeDto.incomeCategory());

        Income updatedIncome = incomeRepository.save(income);

        return IncomeMapper.mapToincomeDto(updatedIncome);

    }

    @Override
    public void deleteIncome(Long incomeId) {
        Income income=incomeRepository.findByIdAndUser(incomeId,getCurrentUser())
                .orElseThrow(()->new ResourceNotFoundException("Income not found with id: " + incomeId));
        incomeRepository.delete(income);


    }
}
