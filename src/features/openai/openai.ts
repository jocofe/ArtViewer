import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateArtworkDescription = async (title: string, imageId: string, author: string): Promise<string> => {
  const prompt = `Write a detailed description with a maximum of three hundred words and with an end point of the work with ID: \n\n${imageId}\n\n on the V&A museum page. If you can't provide me information, try make a description with the \n\n${title}\n\n of the art piece or the \n\n${author}\n\n. I want just the description, without title, subtitles or the ID in text, this description will show in a app web and must be serious.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Verificar si la respuesta es válida y si contiene datos
    if (response && response.choices) {
      const generatedText = response.choices.map(choice => choice.message.content).join('');
      return generatedText.trim();
    } else {
      throw new Error('No valid response from OpenAI chat model');
    }
  } catch (error) {
    console.error('Error fetching the completion from OpenAI:', error);
    throw error;
  }
};
