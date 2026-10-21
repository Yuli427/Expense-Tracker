package net.javaguides.expense.service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String to, String verificationLink) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("smalltools933@gmail.com");
        message.setTo(to);
        message.setSubject("Verify your Expense Tracker App email");
        message.setText(
                "Please click the link below to verify your email:\n\n"
                        + verificationLink
                        + "\n\nThis link will expire in 1 hour.");

        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String email, String token) {

        String resetLink =
                " http://localhost:5173/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Reset your password");
        message.setText(
                "Click the link below to reset your password:\n\n"
                        + resetLink
        );

        mailSender.send(message);
    }
}




