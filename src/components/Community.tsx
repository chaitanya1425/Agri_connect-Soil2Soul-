import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Send, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Community: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Dr. Anil Deshmukh',
      role: 'Agriculture College',
      content: 'New research shows that using organic mulch can increase soil moisture retention by up to 30%. Highly recommended for the upcoming dry season.',
      likes: 124,
      comments: 18,
      time: '2h ago',
      type: 'research',
      isLiked: false
    },
    {
      id: '2',
      author: 'Farmer Suresh',
      role: 'Farmer',
      content: 'Has anyone tried the new hybrid tomato seeds from SeedCo? Looking for feedback before buying.',
      likes: 45,
      comments: 32,
      time: '5h ago',
      type: 'forum',
      isLiked: false
    },
    {
      id: '3',
      author: 'AgriDept MH',
      role: 'Scheme Provider',
      content: 'Reminder: The application deadline for the Solar Pump Subsidy is March 31st. Apply through the portal today!',
      likes: 210,
      comments: 5,
      time: '1d ago',
      type: 'announcement',
      isLiked: false
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost = {
      id: Date.now().toString(),
      author: 'You',
      role: 'User',
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: 'Just now',
      type: 'forum',
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsPosting(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Farmer Community</h1>
            <p className="text-gray-500 mt-2">Share knowledge, ask questions, and stay updated.</p>
          </div>
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
          >
            {isPosting ? <Plus size={24} className="rotate-45" /> : <Plus size={24} />}
          </button>
        </header>

        {isPosting && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl mb-10"
          >
            <textarea 
              placeholder="What's on your mind? Share research, ask a question..."
              className="w-full h-32 p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none mb-4"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button 
                onClick={handlePost}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
              >
                <Send size={18} />
                Post to Community
              </button>
            </div>
          </motion.div>
        )}

        {/* Search & Filters */}
        <div className="flex gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <select className="px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm font-medium outline-none">
            <option>All Posts</option>
            <option>Research</option>
            <option>Questions</option>
            <option>Announcements</option>
          </select>
        </div>

        {/* Post Feed */}
        <div className="space-y-8">
          {posts.map((post) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={post.id}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{post.author}</h4>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{post.role}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400 font-medium">{post.time}</span>
              </div>

              <div className="mb-8">
                {post.type === 'research' && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full mb-3 inline-block">Research Paper</span>
                )}
                <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors font-medium ${post.isLiked ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`}
                  >
                    <ThumbsUp size={20} fill={post.isLiked ? "currentColor" : "none"} />
                    {post.likes}
                  </button>
                  <button 
                    onClick={() => alert("Comments feature coming soon!")}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors font-medium"
                  >
                    <MessageSquare size={20} />
                    {post.comments}
                  </button>
                </div>
                <button 
                  onClick={() => alert("Sharing post...")}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
