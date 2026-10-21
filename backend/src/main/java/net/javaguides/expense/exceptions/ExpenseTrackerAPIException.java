package net.javaguides.expense.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
@AllArgsConstructor
public class ExpenseTrackerAPIException extends RuntimeException {
    private HttpStatus status;
    private  String message;
}
