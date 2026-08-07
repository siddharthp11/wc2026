import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY })

const MODELS = Object.freeze({
    primary: "gpt-5.6-sol",
    secondary: "gpt-5-nano-2025-08-07"
});


async function getResponse(input, options = {}) {
    const result = await client.responses.create({
        model: MODELS.secondary,
        instructions: "Provide a single-line opinion on a collection of posts scraped from reddit.",
        reasoning: { effort: "minimal" },
        input,
        ...options
    })
    return result.output_text
}

export { getResponse }