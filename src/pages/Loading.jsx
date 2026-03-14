import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateIdea } from '../gemini';

const MESSAGES = [
  'Analyzing your skill...',
  'Finding opportunities...',
  'Building your plan...',
];

function Loading() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('skillaunch_answers');
    if (!raw) {
      navigate('/onboarding', { replace: true });
      return;
    }

    const answers = JSON.parse(raw);

    let isMounted = true;

    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);

    (async () => {
      try {
        const idea = await generateIdea(answers);
        if (!isMounted) return;
        localStorage.setItem('skillaunch_idea', JSON.stringify(idea));
        navigate('/results', { replace: true });
      } catch (error) {
        console.error('Error generating idea', error);
        alert('Something went wrong while generating your idea. Please try again.');
        navigate('/onboarding', { replace: true });
      }
    })();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="card max-w-md w-full p-8 flex flex-col items-center">
        <div className="h-10 w-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-lg text-gray-200 mb-2">
          {MESSAGES[messageIndex]}
        </p>
        <p className="text-sm text-gray-400">
          Crafting a micro-business idea tailored to you...
        </p>
      </div>
    </main>
  );
}

export default Loading;

