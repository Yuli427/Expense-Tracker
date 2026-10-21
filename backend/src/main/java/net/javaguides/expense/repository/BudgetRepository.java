package net.javaguides.expense.repository;

import net.javaguides.expense.entity.Budget;
import net.javaguides.expense.entity.Expense;
import net.javaguides.expense.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget,Long> {

    List<Budget> findByUser(User user);

    Optional<Budget> findByIdAndUser(Long id, User user);

    List<Budget> findByUserAndMonth(User user, String month);
}
