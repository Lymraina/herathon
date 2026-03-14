import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleStartNew = () => {
    localStorage.removeItem('skillaunch_answers');
    localStorage.removeItem('skillaunch_idea');
    navigate('/onboarding');
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="card max-w-md w-full p-8 text-center space-y-4">
        <h1 className="text-2xl font-display text-white mb-2">
          Dashboard coming soon
        </h1>
        <p className="text-gray-300">
          Firebase is temporarily disabled, so saved ideas are not available.
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <button
            type="button"
            className="btn-primary inline-flex justify-center"
            onClick={handleStartNew}
          >
            Start New Idea
          </button>
          <Link
            to="/"
            className="rounded-2xl border border-white/20 px-6 py-3 text-sm md:text-base text-gray-100 hover:border-accent/60"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

