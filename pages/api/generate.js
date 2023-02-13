import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const characterPrompt = req.body.characterPrompt;
  const userInput = req.body.userInput;

  console.log(`API: ${characterPrompt} ${userInput}`);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${characterPrompt} ${userInput}`,
    temperature: 0.7,
    max_tokens: 750,
  });

  const output = completion.data.choices.pop();

  res.status(200).json({ output });
};

export default generateAction;
