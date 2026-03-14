import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateIdea(answers) {
  if (!genAI) {
    // Fallback mock idea when Gemini is not configured,
    // so the app still works during development.
    return {
      businessName: `${answers.skill || 'Your skill'} Micro Studio`,
      tagline: 'A lean micro-business you can run from anywhere.',
      idea:
        'Use your existing skills to offer focused, high-value services to a small group of customers in India. Start with a simple offer, test it with real people, and grow from there.',
      targetCustomers: [
        'Busy young professionals in your city',
        'College students preparing for careers',
        'Local small business owners',
        'Online customers who value personal attention',
      ],
      pricing: {
        perUnit: '₹499 per session',
        weeklyPlan: '₹1,999 for a weekly bundle',
        monthlyPlan: '₹5,999 for a monthly membership',
      },
      materials: [
        'Smartphone with internet access',
        'Basic notebook or planning tool',
        'Free design and document tools (Canva, Google Docs, etc.)',
        'Simple booking + payment setup (UPI, WhatsApp, or Google Form)',
      ],
      startupChecklist: [
        'Define one clear service you will offer',
        'Write a simple 1-line pitch for your offer',
        'Create a basic price list and welcome message',
        'Set up a WhatsApp or Instagram account for the business',
        'Contact 5–10 people in your network to test the offer',
        'Collect feedback and adjust your pricing or offer',
        'Post your first 3 pieces of content to attract customers',
      ],
      startupCost: 'Low (under ₹2,000 using tools you already have)',
      profitPerSale: '₹300–₹700 depending on your pricing',
      breakEvenSales: '5–10 sales to cover basic setup costs',
      weeklyTimeCommitment: answers.hours || '5–10 hours per week',
      instaBio:
        'Helping busy people in India get results faster with simple, done-for-you services. DM to start your first project today 🚀',
      whatsappPitch:
        'Hey! I just launched a small micro-business using my skills to help people like you. I’m offering a simple service to get you quick results without much effort on your side. Would you like to see a short 2–3 point plan of how I can help you this week?',
    };
  }

  const prompt = `
  A user wants to start a micro-business in India.
  Skill: ${answers.skill}, Confidence: ${answers.confidence},
  Hours/week: ${answers.hours}, Tools: ${answers.tools},
  Budget: ${answers.budget}, Customers: ${answers.customerType}
  Return ONLY raw JSON with: businessName, tagline, idea,
  targetCustomers (array of 4), pricing (object: perUnit/weeklyPlan/monthlyPlan),
  materials (array), startupChecklist (array of 7),
  startupCost, profitPerSale, breakEvenSales,
  weeklyTimeCommitment, instaBio, whatsappPitch
  `;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  let text = result?.response?.text() ?? '';

  // Strip common markdown fences / labels
  text = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .replace(/^\s*json\s*/i, '')
    .trim();

  // Try to extract the JSON object between the first { and last }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    text = text.slice(firstBrace, lastBrace + 1);
  }

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error('Failed to parse Gemini JSON:', err, text);
    throw new Error('Could not parse idea from Gemini response');
  }
}

