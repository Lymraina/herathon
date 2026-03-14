import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOTAL_QUESTIONS = 6;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    skill: '',
    confidence: '',
    hours: '',
    tools: '',
    budget: '',
    customerType: '',
  });

  const progress = (step / TOTAL_QUESTIONS) * 100;

  const handleTextChange = (field) => (e) => {
    setAnswers((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChoice = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (step < TOTAL_QUESTIONS) {
      setStep((s) => s + 1);
    } else {
      // Final step: save and navigate
      localStorage.setItem('skillaunch_answers', JSON.stringify(answers));
      navigate('/loading');
    }
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-display text-white mb-4">
              What skill do you have?
            </h2>
            <input
              type="text"
              className="w-full mt-2 rounded-2xl bg-card border border-white/10 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g. Cooking, Graphic design, Tutoring"
              value={answers.skill}
              onChange={handleTextChange('skill')}
            />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-display text-white mb-4">
              How confident are you?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleChoice('confidence', level)}
                  className={`rounded-2xl px-4 py-3 border text-sm sm:text-base ${
                    answers.confidence === level
                      ? 'bg-accent text-white border-accent'
                      : 'bg-card border-white/10 text-gray-200 hover:border-accent/60'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-display text-white mb-4">
              Hours per week?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['1-5', '5-10', '10-20', '20+'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => handleChoice('hours', range)}
                  className={`rounded-2xl px-4 py-3 border text-sm sm:text-base ${
                    answers.hours === range
                      ? 'bg-accent text-white border-accent'
                      : 'bg-card border-white/10 text-gray-200 hover:border-accent/60'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-display text-white mb-4">
              Tools you already have?
            </h2>
            <input
              type="text"
              className="w-full mt-2 rounded-2xl bg-card border border-white/10 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g. Laptop, phone, oven, camera"
              value={answers.tools}
              onChange={handleTextChange('tools')}
            />
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-2xl font-display text-white mb-4">
              Starting budget?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {['Under ₹1k', '₹1-5k', '₹5-20k', '₹20k+'].map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => handleChoice('budget', budget)}
                  className={`rounded-2xl px-4 py-3 border text-sm sm:text-base ${
                    answers.budget === budget
                      ? 'bg-accent text-white border-accent'
                      : 'bg-card border-white/10 text-gray-200 hover:border-accent/60'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="text-2xl font-display text-white mb-4">
              Online or local customers?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Online', 'Local', 'Both'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChoice('customerType', type)}
                  className={`rounded-2xl px-4 py-3 border text-sm sm:text-base ${
                    answers.customerType === type
                      ? 'bg-accent text-white border-accent'
                      : 'bg-card border-white/10 text-gray-200 hover:border-accent/60'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const canNext = (() => {
    switch (step) {
      case 1:
        return Boolean(answers.skill.trim());
      case 2:
        return Boolean(answers.confidence);
      case 3:
        return Boolean(answers.hours);
      case 4:
        return Boolean(answers.tools.trim());
      case 5:
        return Boolean(answers.budget);
      case 6:
        return Boolean(answers.customerType);
      default:
        return true;
    }
  })();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl card p-8">
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm text-gray-400">
            <span>Step {step} of {TOTAL_QUESTIONS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {renderQuestion()}

        <div className="mt-8 flex justify-between gap-4">
          <button
            type="button"
            className="rounded-2xl px-4 py-2 border border-white/20 text-gray-200 hover:border-accent/60 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={goBack}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            type="button"
            className="btn-primary px-6 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={goNext}
            disabled={!canNext}
          >
            {step === TOTAL_QUESTIONS ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Onboarding;

