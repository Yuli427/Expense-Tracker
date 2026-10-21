package net.javaguides.expense.service;

import net.javaguides.expense.dto.Ai.AiAnalyticsRequest;
import net.javaguides.expense.dto.Ai.AiAnalyticsResponse;

public interface AnalyticsAiService {
    AiAnalyticsResponse chat(AiAnalyticsRequest request);
}
