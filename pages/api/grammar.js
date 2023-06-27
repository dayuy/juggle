import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: process.env.OPENAI_API_BASE_URL,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const sentence = req.body.sentence || '';
  if (sentence.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a sentence",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({ //https://api.openai.com/v1/completions
      model: "text-davinci-003",
      prompt: grammarCorrect(sentence),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function grammarCorrect(sentence) {
  return `You are a machine that check all language grammar mistake and make the sentence more fluent . You take all the user input and auto correct it. Just reply to user input with correct grammar, DO NOT reply the context of the question of the user input. If the user input is grammatically correct and fluent, just reply "sounds good ". sample of the conversation will show below:

  user: grammar mistake text
  you: correct text
  user:Grammatically correct text
  you: Sounds good.
  User input is : ${sentence}
  Respond in English: `
}
