const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.generateCaption = async (topic) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a creative caption for the topic for a instagram aimed at people using the following topic:\n\nTopic: ${topic} \n\nIt is not related to advertising in anyway`,
      temperature: 0.9,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    if (response.status === 200) {
      console.log("-----------------------");
      console.log("------- SUCCESS -------");
      console.log("-----------------------");
      console.log("------- CAPTION -------");
      console.log("-----------------------");
      console.log(response.data.choices[0].text);
      console.log("-----------------------");
    }

    const caption = response.data.choices[0].text;
    return caption;
  } catch (error) {
    console.log(error);
  }
};
