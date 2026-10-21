package net.javaguides.expense;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
		info = @Info(
				title="Expense Tracker REST API ",
				description = "Expense Tracker REST API Documentation",
				version="v1.0",
				contact = @Contact(
						name="Yultuz",
		                email ="yultuztahir427@gmail.com",
						url="https://www/javaguides.net"),
				license = @License(name = "Ottawa",
				url = "https://www.javaguides.net/license")




),

		externalDocs = @ExternalDocumentation(description = "Expense Tracker REST API for you",
		url = "https://www.javaguides.net/external-doc.html")
)
@SpringBootApplication
public class ExpenseTrackerAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerAppApplication.class, args);
	}

}
