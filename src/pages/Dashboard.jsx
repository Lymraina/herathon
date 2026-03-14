import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ideas');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [userCity, setUserCity] = useState('');
  const [userSkill, setUserSkill] = useState('');
  const [userName, setUserName] = useState('User');
  const [resourceFilter, setResourceFilter] = useState('all'); // 'all', 'online', 'offline'
  const [forumCategory, setForumCategory] = useState('all'); // 'all', 'networking', 'marketplace', 'discussion', 'help'
  const [showForumForm, setShowForumForm] = useState(false);
  const [forumPosts, setForumPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    contact: ''
  });

  // Load job posts, forum posts, and saved ideas from localStorage
  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('skillaunch_jobs') || '[]');
    setJobPosts(jobs);

    let forum = JSON.parse(localStorage.getItem('skillaunch_forum') || '[]');
    
    // Initialize with mock data if forum is empty
    if (forum.length === 0) {
      const mockPosts = [
        {
          id: '1',
          title: 'Looking for a business partner in Mumbai',
          content: 'Hi everyone! I\'m starting a home-based catering business and looking for someone who can help with marketing and customer acquisition. I handle the cooking, need help with the business side. Open to partnership or collaboration!',
          category: 'networking',
          postedBy: 'Priya Sharma',
          postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 12,
          likedBy: [],
          contact: 'priya.sharma@email.com',
          tags: 'cooking, catering, partnership, mumbai',
          comments: [
            {
              id: 'c1',
              text: 'Sounds interesting! I have experience in digital marketing. Let\'s connect!',
              postedBy: 'Rajesh Kumar',
              postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c2',
              text: 'I\'m also in Mumbai and looking for similar opportunities. Can we discuss?',
              postedBy: 'Amit Patel',
              postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '2',
          title: 'Selling professional camera equipment - ₹25,000',
          content: 'Selling my Canon EOS 200D DSLR camera with kit lens. Used for 6 months, in excellent condition. Perfect for food photography or product shoots. Includes camera bag and memory card.',
          category: 'marketplace',
          postedBy: 'Sneha Reddy',
          postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 8,
          likedBy: [],
          price: '₹25,000',
          contact: '+91 98765 43210',
          tags: 'camera, photography, equipment',
          comments: [
            {
              id: 'c3',
              text: 'Is this still available? Can you share more photos?',
              postedBy: 'Vikram Singh',
              postedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '3',
          title: 'How do you handle customer complaints effectively?',
          content: 'Started my online tutoring business 3 months ago. Got my first negative review today and feeling discouraged. How do experienced business owners handle customer complaints and turn them into opportunities? Any tips?',
          category: 'help',
          postedBy: 'Anjali Mehta',
          postedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
          likes: 15,
          likedBy: [],
          tags: 'customer service, reviews, tutoring',
          comments: [
            {
              id: 'c4',
              text: 'Don\'t take it personally! Respond professionally, acknowledge the issue, and offer a solution. Many customers appreciate when you take responsibility.',
              postedBy: 'Rajesh Kumar',
              postedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c5',
              text: 'I always reach out privately first. Sometimes a simple conversation resolves everything. Keep your response public but professional.',
              postedBy: 'Priya Sharma',
              postedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c6',
              text: 'Use negative feedback to improve! Every complaint is free market research. Thank them for feedback and show how you\'ve improved.',
              postedBy: 'Amit Patel',
              postedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '4',
          title: 'Best practices for Instagram marketing?',
          content: 'Just launched my graphic design business. What are the best practices for Instagram marketing? Should I post daily? What type of content works best? Looking for advice from experienced designers!',
          category: 'discussion',
          postedBy: 'Kavita Desai',
          postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 20,
          likedBy: [],
          tags: 'instagram, marketing, social media, design',
          comments: [
            {
              id: 'c7',
              text: 'Consistency is key! Post 3-4 times a week with high-quality visuals. Use reels for reach and stories for engagement.',
              postedBy: 'Sneha Reddy',
              postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c8',
              text: 'Show your process! Behind-the-scenes content performs really well. People love seeing how you create.',
              postedBy: 'Anjali Mehta',
              postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '5',
          title: 'Looking to collaborate with food bloggers',
          content: 'I run a small home bakery and want to collaborate with food bloggers and influencers. Offering free samples in exchange for reviews and posts. Anyone interested? Based in Bangalore.',
          category: 'networking',
          postedBy: 'Ravi Verma',
          postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 9,
          likedBy: [],
          contact: 'ravi.verma@email.com',
          tags: 'collaboration, food, blogging, bangalore',
          comments: [
            {
              id: 'c9',
              text: 'I\'m a food blogger! Would love to collaborate. Let\'s connect!',
              postedBy: 'Priya Sharma',
              postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '6',
          title: 'Selling laptop - Dell Inspiron 15 (₹35,000)',
          content: 'Selling my Dell Inspiron 15 laptop. 8GB RAM, 256GB SSD, Intel i5 processor. Great for design work, video editing, or business use. Used for 1 year, excellent condition. Reason for selling: upgrading.',
          category: 'marketplace',
          postedBy: 'Mohit Agarwal',
          postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 5,
          likedBy: [],
          price: '₹35,000',
          contact: '+91 91234 56789',
          tags: 'laptop, computer, technology',
          comments: []
        },
        {
          id: '7',
          title: 'How to price my services?',
          content: 'I offer graphic design services but struggling with pricing. Some clients say I\'m too expensive, others say I\'m too cheap. How do you determine the right price? Should I charge hourly or per project?',
          category: 'help',
          postedBy: 'Kavita Desai',
          postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 18,
          likedBy: [],
          tags: 'pricing, freelance, design, business',
          comments: [
            {
              id: 'c10',
              text: 'Research competitors first! Check what others charge in your area. Then factor in your experience and time.',
              postedBy: 'Sneha Reddy',
              postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c11',
              text: 'I charge per project. It\'s easier for clients to understand value. Start with a base rate and adjust based on complexity.',
              postedBy: 'Anjali Mehta',
              postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c12',
              text: 'Don\'t undervalue yourself! If you\'re good, charge accordingly. Better to have fewer high-paying clients than many low-paying ones.',
              postedBy: 'Rajesh Kumar',
              postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        },
        {
          id: '8',
          title: 'Success story: Made ₹50K in first month!',
          content: 'Started my online tutoring business last month and just hit ₹50,000 in revenue! Started with 3 students, now have 12. Key was focusing on one subject (Math) and building reputation. Happy to share tips if anyone needs!',
          category: 'discussion',
          postedBy: 'Mohit Agarwal',
          postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 45,
          likedBy: [],
          tags: 'success, tutoring, motivation',
          comments: [
            {
              id: 'c13',
              text: 'Congratulations! That\'s amazing. How did you get your first students?',
              postedBy: 'Anjali Mehta',
              postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c14',
              text: 'Wow! This is so inspiring. Can you share your marketing strategy?',
              postedBy: 'Kavita Desai',
              postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'c15',
              text: 'Started with friends and family referrals, then posted on local Facebook groups. Word of mouth is powerful!',
              postedBy: 'Mohit Agarwal',
              postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }
          ]
        }
      ];
      
      forum = mockPosts;
      localStorage.setItem('skillaunch_forum', JSON.stringify(mockPosts));
    }
    
    setForumPosts(forum);

    // Load saved ideas and get user city
    const idea = localStorage.getItem('skillaunch_idea');
    if (idea) {
      try {
        const parsed = JSON.parse(idea);
        if (parsed.businessName) {
          setSavedIdeas([parsed]);
        }
      } catch (e) {
        console.error('Error loading saved idea:', e);
      }
    }

    // Load profile first, then fall back to answers
    const profile = localStorage.getItem('skillaunch_profile');
    const answers = localStorage.getItem('skillaunch_answers');

    if (profile) {
      try {
        const parsed = JSON.parse(profile);
        if (parsed.name) setUserName(parsed.name);
        if (parsed.city) setUserCity(parsed.city);
        if (parsed.skill) setUserSkill(parsed.skill.toLowerCase());
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    }

    if (!profile && answers) {
      try {
        const parsed = JSON.parse(answers);
        if (parsed.city) setUserCity(parsed.city);
        if (parsed.skill) setUserSkill(parsed.skill.toLowerCase());
        if (parsed.skill) {
          setUserName(parsed.skill.charAt(0).toUpperCase() + parsed.skill.slice(1) + ' Entrepreneur');
        }
      } catch (e) {
        console.error('Error loading answers:', e);
      }
    }
  }, []);

  const [forumForm, setForumForm] = useState({
    title: '',
    content: '',
    category: 'discussion',
    price: '',
    contact: '',
    tags: ''
  });

  // Helper function to match resources with user's skill
  const matchesSkill = (resourceSkills) => {
    if (!userSkill || !resourceSkills || resourceSkills.length === 0) return true;
    const skillLower = userSkill.toLowerCase();
    return resourceSkills.some(skill => 
      skillLower.includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(skillLower)
    );
  };

  // Helper function to check if resource is online/offline
  const isOnline = (type, availability) => {
    if (type) {
      const typeLower = type.toLowerCase();
      if (typeLower.includes('online') && !typeLower.includes('offline') && !typeLower.includes('in-person')) return true;
      if (typeLower.includes('offline') || typeLower.includes('in-person')) return false;
    }
    if (availability) {
      const availLower = availability.toLowerCase();
      if (availLower.includes('online') && !availLower.includes('offline')) return true;
      if (availLower.includes('offline') || availLower.includes('in-person')) return false;
    }
    return null; // Unknown
  };

  // Filter resources based on online/offline preference
  const filterResources = (resources) => {
    return resources.filter(resource => {
      // Skill matching
      if (!matchesSkill(resource.skills)) return false;
      
      // Online/Offline filtering
      if (resourceFilter === 'all') return true;
      const online = isOnline(resource.type, resource.availability);
      if (resourceFilter === 'online') return online === true;
      if (resourceFilter === 'offline') return online === false;
      return true;
    });
  };

  const handleStartNew = () => {
    localStorage.removeItem('skillaunch_answers');
    localStorage.removeItem('skillaunch_idea');
    navigate('/onboarding');
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now().toString(),
      ...jobForm,
      postedAt: new Date().toISOString(),
      postedBy: 'You' // In real app, this would be user name
    };

    const updatedJobs = [newJob, ...jobPosts];
    setJobPosts(updatedJobs);
    localStorage.setItem('skillaunch_jobs', JSON.stringify(updatedJobs));

    // Reset form
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      contact: ''
    });
    setShowJobForm(false);
  };

  const handleInputChange = (field) => (e) => {
    setJobForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const deleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      const updatedJobs = jobPosts.filter(job => job.id !== id);
      setJobPosts(updatedJobs);
      localStorage.setItem('skillaunch_jobs', JSON.stringify(updatedJobs));
    }
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      ...forumForm,
      postedBy: userName,
      postedAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      likedBy: []
    };

    const updatedPosts = [newPost, ...forumPosts];
    setForumPosts(updatedPosts);
    localStorage.setItem('skillaunch_forum', JSON.stringify(updatedPosts));

    // Reset form
    setForumForm({
      title: '',
      content: '',
      category: 'discussion',
      price: '',
      contact: '',
      tags: ''
    });
    setShowForumForm(false);
  };

  const handleForumInputChange = (field) => (e) => {
    setForumForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleLike = (postId) => {
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy?.includes(userName) || false;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? (post.likedBy || []).filter(u => u !== userName)
            : [...(post.likedBy || []), userName]
        };
      }
      return post;
    });
    setForumPosts(updatedPosts);
    localStorage.setItem('skillaunch_forum', JSON.stringify(updatedPosts));
  };

  const handleComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...(post.comments || []),
            {
              id: Date.now().toString(),
              text: commentText,
              postedBy: userName,
              postedAt: new Date().toISOString()
            }
          ]
        };
      }
      return post;
    });
    setForumPosts(updatedPosts);
    localStorage.setItem('skillaunch_forum', JSON.stringify(updatedPosts));
  };

  const deletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = forumPosts.filter(post => post.id !== id);
      setForumPosts(updatedPosts);
      localStorage.setItem('skillaunch_forum', JSON.stringify(updatedPosts));
    }
  };

  const filteredForumPosts = forumPosts.filter(post => {
    if (forumCategory === 'all') return true;
    return post.category === forumCategory;
  });

  return (
    <main className="min-h-screen bg-[#0a0a14] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Dashboard
            </h1>
            <p className="text-white/60">Manage your ideas and explore opportunities</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a2e] border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/20 transition-colors"
            title="Customise Profile"
            aria-label="Customise Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('ideas')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'ideas'
                ? 'bg-orange-500 text-white'
                : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
            }`}
          >
            My Ideas
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'community'
                ? 'bg-orange-500 text-white'
                : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
            }`}
          >
            Community Jobs
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-orange-500 text-white'
                : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'forum'
                ? 'bg-orange-500 text-white'
                : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
            }`}
          >
            Forum
          </button>
        </div>

        {/* My Ideas Tab */}
        {activeTab === 'ideas' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Your Business Ideas</h2>
              <button
                onClick={handleStartNew}
                className="btn-primary"
              >
                + New Idea
              </button>
            </div>

            {savedIdeas.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {savedIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-colors cursor-pointer"
                    onClick={() => navigate('/results')}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {idea.businessName}
                        </h3>
                        <p className="text-orange-400 text-sm italic">{idea.tagline}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2 mb-4">
                      {idea.idea}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                        {idea.startupCost}
                      </span>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                        {idea.weeklyTimeCommitment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-12 text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-white text-lg font-semibold mb-2">No ideas yet</h3>
                <p className="text-white/60 mb-6">Create your first business idea to get started</p>
                <button onClick={handleStartNew} className="btn-primary">
                  Create Your First Idea
                </button>
              </div>
            )}
          </div>
        )}

        {/* Community Jobs Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Job Openings</h2>
              <button
                onClick={() => setShowJobForm(!showJobForm)}
                className="btn-primary"
              >
                {showJobForm ? 'Cancel' : '+ Post a Job'}
              </button>
            </div>

            {/* Job Posting Form */}
            {showJobForm && (
              <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Post a Job Opening</h3>
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={handleInputChange('title')}
                        className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g. Graphic Designer"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.company}
                        onChange={handleInputChange('company')}
                        className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Location *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.location}
                        onChange={handleInputChange('location')}
                        className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Job Type *</label>
                      <select
                        required
                        value={jobForm.type}
                        onChange={handleInputChange('type')}
                        className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Salary</label>
                      <input
                        type="text"
                        value={jobForm.salary}
                        onChange={handleInputChange('salary')}
                        className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g. ₹30,000 - ₹50,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Job Description *</label>
                    <textarea
                      required
                      value={jobForm.description}
                      onChange={handleInputChange('description')}
                      rows="4"
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Describe the role, responsibilities, and what you're looking for..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Requirements</label>
                    <textarea
                      value={jobForm.requirements}
                      onChange={handleInputChange('requirements')}
                      rows="3"
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Skills, experience, qualifications needed..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Contact Information *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.contact}
                      onChange={handleInputChange('contact')}
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Email or WhatsApp number"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-white font-medium transition-colors"
                    >
                      Post Job
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="border border-white/20 hover:border-white/40 px-6 py-2 rounded-lg text-white/60 hover:text-white/80 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Job Listings */}
            <div className="space-y-4">
              {jobPosts.length > 0 ? (
                jobPosts.map((job) => (
                  <div
                    key={job.id}
                    className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{job.title}</h3>
                          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                            {job.type}
                          </span>
                        </div>
                        <p className="text-orange-400 font-medium mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-white/60 text-sm mb-3">
                          <span>📍 {job.location}</span>
                          {job.salary && <span>💰 {job.salary}</span>}
                          <span>📅 {new Date(job.postedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {job.postedBy === 'You' && (
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Description</h4>
                      <p className="text-white/70 text-sm whitespace-pre-line">{job.description}</p>
                    </div>

                    {job.requirements && (
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2">Requirements</h4>
                        <p className="text-white/70 text-sm whitespace-pre-line">{job.requirements}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-white/60 text-sm">Contact: </span>
                        <a
                          href={job.contact.includes('@') ? `mailto:${job.contact}` : `https://wa.me/${job.contact.replace(/\D/g, '')}`}
                          className="text-orange-400 hover:text-orange-300 text-sm"
                        >
                          {job.contact}
                        </a>
                      </div>
                      <span className="text-white/40 text-xs">Posted by {job.postedBy}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-12 text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-white text-lg font-semibold mb-2">No job postings yet</h3>
                  <p className="text-white/60 mb-6">Be the first to post a job opening in the community</p>
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="btn-primary"
                  >
                    Post a Job
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-white/80 text-sm">Filter by:</span>
              <button
                onClick={() => setResourceFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  resourceFilter === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
                }`}
              >
                All Resources
              </button>
              <button
                onClick={() => setResourceFilter('online')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  resourceFilter === 'online'
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
                }`}
              >
                🌐 Online Only
              </button>
              <button
                onClick={() => setResourceFilter('offline')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  resourceFilter === 'offline'
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
                }`}
              >
                📍 Offline Only
              </button>
              {userSkill && (
                <span className="ml-auto px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                  Showing resources for: {userSkill}
                </span>
              )}
            </div>

            {/* Mentors Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>👥</span> Mentors
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterResources([
                  {
                    name: 'Rajesh Kumar',
                    expertise: 'Business Strategy & Marketing',
                    experience: '15+ years',
                    rating: '4.9',
                    contact: 'rajesh.mentor@email.com',
                    availability: 'Available for 1-on-1 sessions (Online)',
                    type: 'Online',
                    skills: ['business', 'marketing', 'strategy', 'planning']
                  },
                  {
                    name: 'Priya Sharma',
                    expertise: 'Digital Marketing & Social Media',
                    experience: '10+ years',
                    rating: '4.8',
                    contact: 'priya.sharma@email.com',
                    availability: 'Free initial consultation (Online)',
                    type: 'Online',
                    skills: ['marketing', 'digital', 'social media', 'content']
                  },
                  {
                    name: 'Amit Patel',
                    expertise: 'E-commerce & Online Business',
                    experience: '12+ years',
                    rating: '4.9',
                    contact: '+91 98765 43210',
                    availability: 'WhatsApp consultations (Online)',
                    type: 'Online',
                    skills: ['e-commerce', 'online', 'business', 'sales']
                  },
                  {
                    name: 'Sneha Reddy',
                    expertise: 'Content Creation & Branding',
                    experience: '8+ years',
                    rating: '4.7',
                    contact: 'sneha.reddy@email.com',
                    availability: 'Weekend sessions (In-person)',
                    type: 'Offline',
                    skills: ['content', 'branding', 'design', 'creative']
                  },
                  {
                    name: 'Vikram Singh',
                    expertise: 'Finance & Business Planning',
                    experience: '20+ years',
                    rating: '5.0',
                    contact: 'vikram.singh@email.com',
                    availability: 'Expert in micro-businesses (Online & Offline)',
                    type: 'Hybrid',
                    skills: ['finance', 'business', 'planning', 'accounting']
                  },
                  {
                    name: 'Anjali Mehta',
                    expertise: 'Product Development & Innovation',
                    experience: '9+ years',
                    rating: '4.8',
                    contact: '+91 91234 56789',
                    availability: 'Online & offline sessions',
                    type: 'Hybrid',
                    skills: ['product', 'development', 'innovation', 'technology']
                  },
                  {
                    name: 'Ravi Verma',
                    expertise: 'Cooking & Food Business',
                    experience: '15+ years',
                    rating: '4.9',
                    contact: 'ravi.verma@email.com',
                    availability: 'In-person cooking workshops',
                    type: 'Offline',
                    skills: ['cooking', 'food', 'culinary', 'restaurant']
                  },
                  {
                    name: 'Kavita Desai',
                    expertise: 'Graphic Design & Visual Arts',
                    experience: '11+ years',
                    rating: '4.8',
                    contact: '+91 92345 67890',
                    availability: 'Online design consultations',
                    type: 'Online',
                    skills: ['design', 'graphic', 'visual', 'art', 'creative']
                  },
                  {
                    name: 'Mohit Agarwal',
                    expertise: 'Tutoring & Education Business',
                    experience: '13+ years',
                    rating: '4.9',
                    contact: 'mohit.agarwal@email.com',
                    availability: 'Online tutoring business setup',
                    type: 'Online',
                    skills: ['tutoring', 'education', 'teaching', 'learning']
                  }
                ]).map((mentor, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a2e] border border-white/10 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                        <p className="text-orange-400 text-sm font-medium mb-2">{mentor.expertise}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 text-sm">⭐ {mentor.rating}</div>
                        <div className="text-white/60 text-xs">{mentor.experience}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        mentor.type === 'Online' ? 'bg-green-500/20 text-green-400' :
                        mentor.type === 'Offline' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {mentor.type === 'Online' ? '🌐 Online' : mentor.type === 'Offline' ? '📍 Offline' : '🔄 Hybrid'}
                      </span>
                    </div>
                    <p className="text-white/70 text-xs mb-3">{mentor.availability}</p>
                    <a
                      href={mentor.contact.includes('@') ? `mailto:${mentor.contact}` : `https://wa.me/${mentor.contact.replace(/\D/g, '')}`}
                      className="text-orange-400 hover:text-orange-300 text-sm font-medium"
                    >
                      Contact →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Centers Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🏫</span> Training Centers {userCity && `near ${userCity}`}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {filterResources([
                  {
                    name: 'SkillUp Academy',
                    location: userCity || 'Multiple Locations',
                    courses: ['Digital Marketing', 'Business Development', 'E-commerce'],
                    duration: '3-6 months',
                    contact: 'info@skillupacademy.com',
                    website: 'www.skillupacademy.com',
                    type: 'Hybrid',
                    skills: ['marketing', 'business', 'e-commerce', 'digital']
                  },
                  {
                    name: 'Entrepreneur Hub',
                    location: userCity || 'Major Cities',
                    courses: ['Startup Basics', 'Financial Planning', 'Marketing Strategy'],
                    duration: '2-4 months',
                    contact: '+91 80000 00000',
                    website: 'www.entrepreneurhub.in',
                    type: 'Hybrid',
                    skills: ['business', 'startup', 'finance', 'marketing']
                  },
                  {
                    name: 'Micro Business Institute',
                    location: userCity || 'Pan India',
                    courses: ['Business Planning', 'Sales & Marketing', 'Operations Management'],
                    duration: '4-8 weeks',
                    contact: 'contact@mbinstitute.com',
                    website: 'www.mbinstitute.com',
                    type: 'Online',
                    skills: ['business', 'planning', 'sales', 'marketing']
                  },
                  {
                    name: 'Local Business School',
                    location: userCity || 'Your City',
                    courses: ['Accounting Basics', 'Customer Service', 'Inventory Management'],
                    duration: '6-12 weeks',
                    contact: '+91 90000 00000',
                    website: 'www.localbusinessschool.com',
                    type: 'Offline',
                    skills: ['business', 'accounting', 'management', 'operations']
                  },
                  {
                    name: 'Digital Skills Center',
                    location: userCity || 'Metro Cities',
                    courses: ['Social Media Marketing', 'Content Creation', 'SEO Basics'],
                    duration: '1-3 months',
                    contact: 'hello@digitalskills.com',
                    website: 'www.digitalskills.com',
                    type: 'Online',
                    skills: ['marketing', 'digital', 'content', 'social media', 'design']
                  },
                  {
                    name: 'Startup Foundation',
                    location: userCity || 'Nationwide',
                    courses: ['Business Model Canvas', 'Pitching Skills', 'Networking'],
                    duration: '2-6 weeks',
                    contact: 'info@startupfoundation.in',
                    website: 'www.startupfoundation.in',
                    type: 'Hybrid',
                    skills: ['business', 'startup', 'networking', 'pitching']
                  },
                  {
                    name: 'Culinary Arts Academy',
                    location: userCity || 'Major Cities',
                    courses: ['Professional Cooking', 'Food Business Management', 'Menu Planning'],
                    duration: '3-6 months',
                    contact: 'info@culinaryarts.com',
                    website: 'www.culinaryartsacademy.com',
                    type: 'Offline',
                    skills: ['cooking', 'food', 'culinary', 'restaurant']
                  },
                  {
                    name: 'Design Institute Online',
                    location: 'Online',
                    courses: ['Graphic Design', 'UI/UX Design', 'Brand Identity'],
                    duration: '2-4 months',
                    contact: 'hello@designinstitute.com',
                    website: 'www.designinstituteonline.com',
                    type: 'Online',
                    skills: ['design', 'graphic', 'visual', 'creative', 'branding']
                  },
                  {
                    name: 'Education & Tutoring Center',
                    location: userCity || 'Multiple Locations',
                    courses: ['Tutoring Business Setup', 'Curriculum Development', 'Student Management'],
                    duration: '4-8 weeks',
                    contact: 'info@edututorcenter.com',
                    website: 'www.edututorcenter.com',
                    type: 'Hybrid',
                    skills: ['tutoring', 'education', 'teaching', 'learning']
                  }
                ]).map((center, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a2e] border border-white/10 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{center.name}</h3>
                        <p className="text-white/60 text-sm">📍 {center.location}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        center.type === 'Online' ? 'bg-green-500/20 text-green-400' :
                        center.type === 'Offline' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {center.type === 'Online' ? '🌐 Online' : center.type === 'Offline' ? '📍 Offline' : '🔄 Hybrid'}
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-white/80 text-sm font-medium mb-2">Courses:</p>
                      <div className="flex flex-wrap gap-2">
                        {center.courses.map((course, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-orange-500/10 text-orange-300 text-xs rounded"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-white/60 text-xs mb-3">Duration: {center.duration}</div>
                    <div className="flex gap-3 pt-3 border-t border-white/10">
                      <a
                        href={center.contact.includes('@') ? `mailto:${center.contact}` : `https://wa.me/${center.contact.replace(/\D/g, '')}`}
                        className="text-orange-400 hover:text-orange-300 text-sm"
                      >
                        Contact
                      </a>
                      <a
                        href={`https://${center.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 text-sm"
                      >
                        Website →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Communities Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🌐</span> Online Communities
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterResources([
                  {
                    name: 'Indian Entrepreneurs Network',
                    platform: 'WhatsApp',
                    members: '5K+',
                    focus: 'General Business',
                    link: 'https://chat.whatsapp.com/example1',
                    description: 'Connect with fellow entrepreneurs, share ideas, and get support',
                    type: 'Online',
                    skills: ['business', 'entrepreneurship', 'startup']
                  },
                  {
                    name: 'Micro Business India',
                    platform: 'Telegram',
                    members: '3K+',
                    focus: 'Small Business',
                    link: 'https://t.me/microbusinessindia',
                    description: 'Dedicated to micro-business owners and startups',
                    type: 'Online',
                    skills: ['business', 'small business', 'micro business']
                  },
                  {
                    name: 'Startup Founders Circle',
                    platform: 'Discord',
                    members: '2K+',
                    focus: 'Startups',
                    link: 'https://discord.gg/startupfounders',
                    description: 'Active community for startup founders and co-founders',
                    type: 'Online',
                    skills: ['startup', 'business', 'founders']
                  },
                  {
                    name: 'Digital Marketing Hub',
                    platform: 'Facebook',
                    members: '10K+',
                    focus: 'Marketing',
                    link: 'https://facebook.com/groups/digitalmarketinghub',
                    description: 'Learn and share digital marketing strategies',
                    type: 'Online',
                    skills: ['marketing', 'digital', 'social media', 'content']
                  },
                  {
                    name: 'E-commerce Entrepreneurs',
                    platform: 'Telegram',
                    members: '4K+',
                    focus: 'E-commerce',
                    link: 'https://t.me/ecommerceentrepreneurs',
                    description: 'E-commerce sellers sharing tips and experiences',
                    type: 'Online',
                    skills: ['e-commerce', 'online', 'business', 'sales']
                  },
                  {
                    name: 'Local Business Owners',
                    platform: 'WhatsApp',
                    members: '8K+',
                    focus: 'Local Business',
                    link: 'https://chat.whatsapp.com/example2',
                    description: 'Network with local business owners in your area',
                    type: 'Online',
                    skills: ['business', 'local', 'networking']
                  },
                  {
                    name: 'Women Entrepreneurs India',
                    platform: 'Facebook',
                    members: '15K+',
                    focus: 'Women in Business',
                    link: 'https://facebook.com/groups/womenentrepreneursindia',
                    description: 'Supportive community for women entrepreneurs',
                    type: 'Online',
                    skills: ['business', 'entrepreneurship', 'women']
                  },
                  {
                    name: 'Freelancers & Consultants',
                    platform: 'Discord',
                    members: '6K+',
                    focus: 'Freelancing',
                    link: 'https://discord.gg/freelancersindia',
                    description: 'Connect with freelancers and independent consultants',
                    type: 'Online',
                    skills: ['freelancing', 'consulting', 'design', 'content', 'tutoring']
                  },
                  {
                    name: 'Business Growth Mastermind',
                    platform: 'Telegram',
                    members: '2.5K+',
                    focus: 'Growth',
                    link: 'https://t.me/businessgrowthmastermind',
                    description: 'Mastermind group for scaling businesses',
                    type: 'Online',
                    skills: ['business', 'growth', 'scaling', 'strategy']
                  },
                  {
                    name: 'Cooking & Food Business',
                    platform: 'WhatsApp',
                    members: '3K+',
                    focus: 'Food Business',
                    link: 'https://chat.whatsapp.com/cookingbusiness',
                    description: 'Share recipes, business tips, and connect with food entrepreneurs',
                    type: 'Online',
                    skills: ['cooking', 'food', 'culinary', 'restaurant']
                  },
                  {
                    name: 'Design & Creative Community',
                    platform: 'Discord',
                    members: '5K+',
                    focus: 'Design',
                    link: 'https://discord.gg/designcreative',
                    description: 'Graphic designers, artists, and creative professionals',
                    type: 'Online',
                    skills: ['design', 'graphic', 'creative', 'visual', 'art']
                  },
                  {
                    name: 'Tutoring & Education Network',
                    platform: 'Telegram',
                    members: '4K+',
                    focus: 'Education',
                    link: 'https://t.me/tutoringnetwork',
                    description: 'Tutors and educators sharing teaching strategies and business tips',
                    type: 'Online',
                    skills: ['tutoring', 'education', 'teaching', 'learning']
                  }
                ]).map((community, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a2e] border border-white/10 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{community.name}</h3>
                        <p className="text-white/60 text-xs">{community.platform}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                        {community.members}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{community.description}</p>
                    <div className="mb-3">
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded">
                        {community.focus}
                      </span>
                    </div>
                    <a
                      href={community.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 text-sm font-medium inline-flex items-center gap-1"
                    >
                      Join Community →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span>💡</span> Pro Tip
              </h3>
              <p className="text-white/80 text-sm">
                Connect with mentors and join communities relevant to your business idea. 
                Networking is key to success! Don't hesitate to reach out and ask questions.
              </p>
            </div>
          </div>
        )}

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="space-y-6">
            {/* Header and Post Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Community Forum</h2>
              <button
                onClick={() => setShowForumForm(!showForumForm)}
                className="btn-primary"
              >
                {showForumForm ? 'Cancel' : '+ Create Post'}
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'networking', 'marketplace', 'discussion', 'help'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForumCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    forumCategory === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-[#1a1a2e] text-white/60 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat === 'all' ? 'All Posts' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Post Creation Form */}
            {showForumForm && (
              <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Create a Post</h3>
                <form onSubmit={handleForumSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Category *</label>
                    <select
                      required
                      value={forumForm.category}
                      onChange={handleForumInputChange('category')}
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="discussion">💬 Discussion</option>
                      <option value="networking">🤝 Networking</option>
                      <option value="marketplace">🛒 Marketplace</option>
                      <option value="help">❓ Help & Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      value={forumForm.title}
                      onChange={handleForumInputChange('title')}
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="What's on your mind?"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Content *</label>
                    <textarea
                      required
                      value={forumForm.content}
                      onChange={handleForumInputChange('content')}
                      rows="5"
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Share your thoughts, ask questions, or list items for sale..."
                    />
                  </div>

                  {forumForm.category === 'marketplace' && (
                    <>
                      <div>
                        <label className="block text-white/80 text-sm mb-2">Price</label>
                        <input
                          type="text"
                          value={forumForm.price}
                          onChange={handleForumInputChange('price')}
                          className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="e.g. ₹500 or Negotiable"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm mb-2">Contact</label>
                        <input
                          type="text"
                          value={forumForm.contact}
                          onChange={handleForumInputChange('contact')}
                          className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Email or WhatsApp"
                        />
                      </div>
                    </>
                  )}

                  {forumForm.category === 'networking' && (
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Contact</label>
                      <input
                        type="text"
                        value={forumForm.contact}
                        onChange={handleForumInputChange('contact')}
                        className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Email or WhatsApp for networking"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Tags (optional)</label>
                    <input
                      type="text"
                      value={forumForm.tags}
                      onChange={handleForumInputChange('tags')}
                      className="w-full rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g. cooking, design, business"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-white font-medium transition-colors"
                    >
                      Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForumForm(false)}
                      className="border border-white/20 hover:border-white/40 px-6 py-2 rounded-lg text-white/60 hover:text-white/80 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Forum Posts Feed */}
            <div className="space-y-4">
              {filteredForumPosts.length > 0 ? (
                filteredForumPosts.map((post) => {
                  const isLiked = post.likedBy?.includes(userName) || false;
                  const isExpanded = expandedPost === post.id;

                  return (
                    <div
                      key={post.id}
                      className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              post.category === 'networking' ? 'bg-blue-500/20 text-blue-400' :
                              post.category === 'marketplace' ? 'bg-green-500/20 text-green-400' :
                              post.category === 'help' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {post.category === 'networking' ? '🤝 Networking' :
                               post.category === 'marketplace' ? '🛒 Marketplace' :
                               post.category === 'help' ? '❓ Help' :
                               '💬 Discussion'}
                            </span>
                            {post.price && (
                              <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded font-semibold">
                                {post.price}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                          <p className="text-white/70 text-sm whitespace-pre-line mb-3">{post.content}</p>
                          {post.tags && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.split(',').map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded">
                                  #{tag.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {post.postedBy === userName && (
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-white/60 text-sm mb-3">
                        <span>👤 {post.postedBy}</span>
                        <span>🕒 {new Date(post.postedAt).toLocaleDateString()}</span>
                        {post.contact && (
                          <a
                            href={post.contact.includes('@') ? `mailto:${post.contact}` : `https://wa.me/${post.contact.replace(/\D/g, '')}`}
                            className="text-orange-400 hover:text-orange-300"
                          >
                            Contact
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            isLiked ? 'text-red-400' : 'text-white/60 hover:text-red-400'
                          }`}
                        >
                          <span>{isLiked ? '❤️' : '🤍'}</span>
                          <span>{post.likes || 0}</span>
                        </button>
                        <button
                          onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          className="flex items-center gap-2 text-white/60 hover:text-white/80 text-sm"
                        >
                          💬 {post.comments?.length || 0} comments
                        </button>
                      </div>

                      {/* Comments Section */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="space-y-3 mb-4">
                            {post.comments?.map((comment) => (
                              <div key={comment.id} className="bg-[#0f0f1f] rounded-lg p-3">
                                <div className="flex items-start justify-between mb-1">
                                  <span className="text-white font-medium text-sm">{comment.postedBy}</span>
                                  <span className="text-white/40 text-xs">{new Date(comment.postedAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-white/70 text-sm">{comment.text}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentTexts[post.id] || ''}
                              onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyPress={(e) => {
                                const text = commentTexts[post.id] || '';
                                if (e.key === 'Enter' && text.trim()) {
                                  handleComment(post.id, text);
                                  setCommentTexts(prev => ({ ...prev, [post.id]: '' }));
                                }
                              }}
                              placeholder="Write a comment..."
                              className="flex-1 rounded-lg bg-[#0f0f1f] border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                              onClick={() => {
                                const text = commentTexts[post.id] || '';
                                if (text.trim()) {
                                  handleComment(post.id, text);
                                  setCommentTexts(prev => ({ ...prev, [post.id]: '' }));
                                }
                              }}
                              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-12 text-center">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-white text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-white/60 mb-6">Be the first to start a conversation in the community</p>
                  <button
                    onClick={() => setShowForumForm(true)}
                    className="btn-primary"
                  >
                    Create First Post
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/60 hover:text-white/80 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
