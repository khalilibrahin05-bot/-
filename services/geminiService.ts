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
        const completed = group.indicators.filter(i => i.completed).length;
        const total = group.indicators.length;
        prompt += `(الحالة: ${completed}/${total} مكتمل)\n`;
        group.indicators.forEach(indicator => {
            prompt += `- ${indicator.text} (${indicator.completed ? 'مكتمل' : 'غير مكتمل'})\n`;
        });
    });

    prompt += "\n\n--- المطلوب ---\n";
    prompt += "بناءً على البيانات المقدمة، قم بتقديم ملخص تنفيذي للخطة، ثم حدد أهم 3 أولويات يجب التركيز عليها، واقترح توصيتين لتحسين الفعالية أو مواجهة التحديات المحتملة. استخدم تنسيق ماركداون واضح للعناوين والنقاط.";

    return prompt;
}


export async function* generateSummaryStream(planData: PlanItem[], indicatorData: IndicatorGroup[]): AsyncGenerator<string> {
    if (!process.env.API_KEY) {
        throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
    }

    try {
        const prompt = formatDataForPrompt(planData, indicatorData);
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.5,
                topP: 0.95,
            }
        });
        
        for await (const chunk of responseStream) {
            yield chunk.text;
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("An error occurred while communicating with the AI service. Please check the console for details.");
    }
}