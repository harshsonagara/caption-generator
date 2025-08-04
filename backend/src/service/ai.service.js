const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// image accept on base64 format
async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
            You are expert in generating captions for images.
            you generate single caption for image.
            your caption should be short and concise.
            you use hashtages and emojis in the caption.
            `,
        },
    });
    return response.text
}

module.exports = generateCaption