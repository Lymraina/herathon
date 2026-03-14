import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center px-6">
      <div className="bg-[#1a1a2e] rounded-2xl p-10 text-center max-w-sm w-full">
        <div className="text-4xl mb-4">🚀</div>
        <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Sign in to continue
        </h1>
        <p className="text-white/50 text-sm mb-8">Save your business ideas and track progress</p>
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-2xl transition-all"
        >
          Continue with Google
        </button>
        <p className="text-white/30 text-xs mt-4">Firebase coming soon</p>
      </div>
    </div>
  )
}