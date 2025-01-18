import { ChatOpenAI } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import z from 'zod';
import { PromptTemplate } from '@langchain/core/prompts';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentiment: z
      .enum(['positive', 'negative', 'neutral'])
      .describe(
        'The sentiment of the comment with respect to the subject and only three allowed values: positive, negative, or neutral',
      ),
    summary: z
      .string()
      .describe(
        'A very short summary of the comment, describing user sentiment',
      ),
  }),
);

const getPrompt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `Analyze the general internet comment about product, service, or topic.
        Follow the instructions and format your response as a JSON string, and match the format instructions no matter what!

        {formatInstructions}

        {entry}`,
    inputVariables: ['entry'],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.format({ entry: content });

  return input;
};

export const analyze = async (prompt: string) => {
  const input = await getPrompt(prompt);
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  });
  const result = await model.invoke(input);

  try {
    return parser.parse(result.content as string);
  } catch (error) {
    console.log('====== error parsing result: ', error);
  }
};
