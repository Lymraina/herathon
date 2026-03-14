import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: '',
    skill: '',
    city: '',
    bio: '',
    contact: ''
  });

  useEffect(() => {
    const profile = localStorage.getItem('skillaunch_profile');
    const answers = localStorage.getItem('skillaunch_answers');
    const defaults = { name: '', skill: '', city: '', bio: '', contact: '' };

    if (profile) {
      try {
        const parsed = JSON.parse(profile);
        setForm({ ...defaults, ...parsed });
        return;
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    }

    if (answers) {
      try {
        const parsed = JSON.parse(answers);
        setForm({
          name: parsed.skill ? parsed.skill.charAt(0).toUpperCase() + parsed.skill.slice(1) + ' Entrepreneur' : '',
          skill: parsed.skill || '',
          city: parsed.city || '',
          bio: '',
          contact: ''
        });
      } catch (e) {
        console.error('Error loading answers:', e);
      }
    }
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('skillaunch_profile', JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a14] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white/60 hover:text-white text-sm mb-6 flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-8">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase">
            Customise Profile
          </span>
          <h1
            className="text-2xl font-bold text-white mt-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Profile Settings
          </h1>
          <p className="text-white/50 text-sm mt-1 mb-6">
            Update your info to personalise your dashboard and forum experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/80 text-sm mb-2">Display Name</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="e.g. Priya Sharma"
                className="w-full rounded-xl bg-[#0f0f1f] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Your Skill</label>
              <input
                type="text"
                value={form.skill}
                onChange={handleChange('skill')}
                placeholder="e.g. Cooking, Graphic design, Tutoring"
                className="w-full rounded-xl bg-[#0f0f1f] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">City</label>
              <input
                type="text"
                value={form.city}
                onChange={handleChange('city')}
                placeholder="e.g. Mumbai, Delhi, Bangalore"
                className="w-full rounded-xl bg-[#0f0f1f] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Short Bio</label>
              <textarea
                value={form.bio}
                onChange={handleChange('bio')}
                placeholder="A brief intro about you and your business goals"
                rows={3}
                className="w-full rounded-xl bg-[#0f0f1f] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Contact (Email or WhatsApp)</label>
              <input
                type="text"
                value={form.contact}
                onChange={handleChange('contact')}
                placeholder="e.g. priya@email.com or +91 98765 43210"
                className="w-full rounded-xl bg-[#0f0f1f] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-white font-medium transition-colors disabled:opacity-70"
                disabled={saved}
              >
                {saved ? 'Saved!' : 'Save Profile'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl text-white/80 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Profile;
