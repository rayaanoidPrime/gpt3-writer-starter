import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";
const generateAction = async(req , res)=>{
  console.log(`Prompt : ${basePromptPrefix}${req.body.userInput}`);
  const baseCompletion = await openai.createCompletion({
    prompt : `${basePromptPrefix}${req.body.userInput}`,
    model : 'text-davinci-003',
    temperature : 0.7,
    max_tokens : 400
  });

  const baseCompletionOutput = baseCompletion.data.choices[0];
  console.log(baseCompletionOutput);

  return res.status(200).json({output : baseCompletionOutput});
}

export default generateAction;