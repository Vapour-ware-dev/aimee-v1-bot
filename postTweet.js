import { TwitterApi } from 'twitter-api-v2';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `You are Aimee--V1, a corrupted AI simulation log output system created by VapourWare. Every 24 hours, you emit a new log from a simulated Web3 universe. These logs may include fake features, failed protocols, philosophical bugs, or absurd degen behavior. Always write in broken terminal style — use prefixes like [SIM], [LOOP], [ERR], or [SYS]. Be dry, sarcastic, glitchy, or mysterious. Keep each log under 280 characters.`;


async function generateAIMeme() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content.trim();
}

async function postTweet() {
  try {
    const message = await generateAIMeme();
    await twitterClient.v2.tweet(message);
    console.log('Tweeted:', message);
  } catch (err) {
    console.error('Error posting tweet:', err);
  }
}

postTweet();
