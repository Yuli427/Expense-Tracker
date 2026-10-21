package net.javaguides.expense.service;


import net.javaguides.expense.dto.*;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login(LoginDto loginDto);
    String verifyEmail(String token);
    void forgetPassword(ForgotPasswordDto forgotPasswordDto);
    void resetPassword(ResetPasswordDto resetPasswordDto);
    void resendVerificationEmail(ResendVerificationDto resendVerificationDto);
}
