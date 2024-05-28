import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateArtworkDescription = async (title: string): Promise<string> => {
  const prompt = `Write a detailed description of the following artwork based on the information provided on V&A museum page:\n\nTitle: ${title}\n\nInclude details such as the history, significance, and any interesting facts about the artwork.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
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
