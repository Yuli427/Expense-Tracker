package net.javaguides.expense.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Entity
@Table(name = "budget")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    Long id;

    BigDecimal amount;
    String month;

    @ManyToOne
    @JoinColumn(name="category_id",nullable = false)
    Category category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id",nullable = false)
    User user;
}
