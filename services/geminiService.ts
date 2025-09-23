
import { GoogleGenAI } from "@google/genai";
import { PlanItem, IndicatorGroup } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

function formatDataForPrompt(planData: PlanItem[], indicatorData: IndicatorGroup[]): string {
    let prompt = "الرجاء تحليل البيانات التالية المتعلقة بخطة إشراف تربوي ومؤشرات أداء. البيانات مقسمة إلى قسمين: خطة الأداء، والمؤشرات الدورية.\n\n";

    prompt += "--- خطة الأداء ---\n";
    planData.forEach(item => {
        prompt += `- المجال: ${item.field}, الهدف: ${item.objective}, المؤشر: ${item.indicator}, النشاط: ${item.activity}\n`;
    });

    prompt += "\n--- المؤشرات الدورية ---\n";
    indicatorData.forEach(group => {
        prompt += `\n**${group.category}**\n`;
        group.indicators.forEach(indicator => {
            prompt += `- ${indicator.text}\n`;
        });
    });

    prompt += "\n\n--- المطلوب ---\n";
    prompt += "بناءً على البيانات المقدمة، قم بتقديم ملخص تنفيذي للخطة، ثم حدد أهم 3 أولويات يجب التركيز عليها، واقترح توصيتين لتحسين الفعالية أو مواجهة التحديات المحتملة. استخدم تنسيق ماركداون واضح للعناوين والنقاط.";

    return prompt;
}

export const generateSummary = async (planData: PlanItem[], indicatorData: IndicatorGroup[]): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
    }

    try {
        const prompt = formatDataForPrompt(planData, indicatorData);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.5,
                topP: 0.95,
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("An error occurred while communicating with the AI service. Please check the console for details.");
    }
};
