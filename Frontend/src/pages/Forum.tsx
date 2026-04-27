import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  Plus, 
  Send, 
  ShieldCheck, 
  Image as ImageIcon,
  Loader2,
  ChevronRight,
  X,
  Upload,
  Trash2,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_id: number;
  author: {
    full_name: string;
    is_expert: boolean;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  user_id: number;
  author: {
    full_name: string;
    is_expert: boolean;
  };
  comments: Comment[];
}

const ForumPage: React.FC = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [commentingPost, setCommentingPost] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/forum/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      toast.error('Could not load forum posts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to post.');
      return;
    }
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    setIsPosting(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newPost,
          image_url: uploadedImage || undefined
        })
      });

      if (response.ok) {
        toast.success('Post shared with the community!');
        setNewPost({ title: '', content: '' });
        setUploadedImage(null);
        setShowCreateModal(false);
        fetchPosts();
      } else {
        const err = await response.json();
        toast.error(err.detail || 'Failed to create post.');
      }
    } catch (error) {
      toast.error('Failed to create post.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleAddComment = async (postId: number) => {
    if (!token) {
      toast.error('Please login to comment.');
      return;
    }
    const text = commentTexts[postId]?.trim();
    if (!text) return;

    setCommentingPost(postId);
    try {
      const response = await fetch('http://127.0.0.1:8000/forum/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: text, post_id: postId })
      });

      if (response.ok) {
        setCommentTexts(prev => ({ ...prev, [postId]: '' }));
        fetchPosts();
        toast.success('Comment posted!');
      } else {
        toast.error('Failed to post comment.');
      }
    } catch (error) {
      toast.error('Failed to post comment.');
    } finally {
      setCommentingPost(null);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="pt-32 flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing with Community</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FDFDFD]">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20">
              <MessageSquare className="w-3 h-3" /> Collective Wisdom
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-none mb-3">
              Farmer <span className="text-primary">Community</span>
            </h1>
            <p className="text-slate-500 font-medium italic">
              Knowledge sharing platform for modern sustainable agriculture.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 shadow-sm"
              />
            </div>
            <button
              onClick={() => token ? setShowCreateModal(true) : toast.error('Please login to start a discussion')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 hover:shadow-xl transition-all group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              New Topic
            </button>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Posts List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <motion.div 
                    key={post.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:border-primary/20 transition-all group"
                  >
                    <div className="p-8 md:p-10">
                      {/* Post Meta */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${post.author.is_expert ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                            {post.author.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 uppercase tracking-tight">{post.author.full_name}</span>
                              {post.author.is_expert && (
                                <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-wider border border-blue-100">
                                  <ShieldCheck className="w-3 h-3" /> Expert
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                              <Clock className="w-3 h-3" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                          Field Intelligence
                        </div>
                      </div>

                      {/* Content */}
                      <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                      <p className="text-slate-500 leading-relaxed mb-8 font-medium line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                        {post.content}
                      </p>

                      {post.image_url && (
                        <div className="rounded-[2rem] overflow-hidden border border-slate-100 mb-8 aspect-video relative group/img">
                          <img 
                            src={post.image_url} 
                            alt="Field photo" 
                            className="w-full h-full object-cover grayscale-[20%] group-hover/img:grayscale-0 transition-all duration-700 scale-105 group-hover/img:scale-100"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                        <button 
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                          className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-primary transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          {post.comments.length} Discussion{post.comments.length !== 1 ? 's' : ''}
                        </button>
                        <button 
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                          className="bg-slate-50 hover:bg-primary/10 text-slate-900 hover:text-primary p-2.5 rounded-xl transition-all"
                        >
                          <ChevronRight className={`w-5 h-5 transition-transform ${expandedPost === post.id ? 'rotate-90' : ''}`} />
                        </button>
                      </div>

                      {/* Expanded Comments */}
                      <AnimatePresence>
                        {expandedPost === post.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-8 pt-8 space-y-6">
                              <div className="space-y-6">
                                {post.comments.length === 0 && (
                                  <div className="py-10 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">No insights shared yet</p>
                                  </div>
                                )}
                                {post.comments.map((comment) => (
                                  <div key={comment.id} className="flex gap-4">
                                    <div className={`w-1 rounded-full ${comment.author.is_expert ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'bg-slate-100'}`} />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${comment.author.is_expert ? 'text-blue-600' : 'text-slate-900'}`}>
                                          {comment.author.full_name}
                                        </span>
                                        {comment.author.is_expert && (
                                          <ShieldCheck className="w-3 h-3 text-blue-500" />
                                        )}
                                        <span className="text-[10px] text-slate-300 font-bold ml-auto">
                                          {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-sm text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Add Comment Input */}
                              <div className="relative mt-8 group/input">
                                <input 
                                  type="text" 
                                  value={commentTexts[post.id] || ''}
                                  onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                  placeholder={user ? "Contribute to the discussion..." : "Login to join the community..."}
                                  disabled={!user}
                                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all disabled:opacity-50 font-medium shadow-sm"
                                />
                                <button 
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!user || commentingPost === post.id}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-slate-900 text-white rounded-xl hover:bg-primary transition-colors disabled:opacity-50"
                                >
                                  {commentingPost === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-100">
                  <div className="bg-slate-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-2">The field is quiet</p>
                  <p className="text-slate-300 text-sm font-medium">Be the first to spark a professional discussion!</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Expert Verification</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  Agronomists with verified credentials receive a special badge. Apply today to help the community grow.
                </p>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2 group">
                  Become a Verified Expert <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-8">
                <Filter className="w-5 h-5 text-slate-900" />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Clusters</h3>
              </div>
              <div className="space-y-4">
                {['Pest Management', 'Soil Health', 'Irrigation Tech', 'Organic Protocols', 'Yield Optimization'].map((tag, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-50 hover:bg-white hover:border-primary/20 transition-all group">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary">{tag}</span>
                    <span className="bg-white text-slate-400 text-[10px] font-black px-2 py-1 rounded-lg border border-slate-100 group-hover:border-primary/20 group-hover:text-primary">{Math.floor(Math.random() * 20)}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal - Already quite good, but ensured smooth entry */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              onClick={() => setShowCreateModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 sticky top-0 z-10">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Start a Professional Discussion</h3>
                <button onClick={() => { setShowCreateModal(false); setUploadedImage(null); }} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleCreatePost} className="p-10 space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Subject Matter</label>
                  <input 
                    type="text" 
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="e.g. Unusual fungal pattern on Punjab Wheat crops"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Context / Details</label>
                  <textarea 
                    rows={4}
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Provide specific field observations, climate conditions, and crop variety..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none font-medium"
                    required
                  />
                </div>

                {/* Simplified Image Upload Section */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Evidence / Photos (Optional)</label>
                  {uploadedImage ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-100 group">
                      <img src={uploadedImage} alt="Preview" className="w-full max-h-48 object-cover" />
                      <button
                        type="button"
                        onClick={() => { setUploadedImage(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`bg-slate-50 rounded-3xl p-8 border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-400 hover:bg-white'}`}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className={`p-4 rounded-2xl ${isDragging ? 'bg-primary/20 text-primary' : 'bg-white text-slate-300 border border-slate-100 shadow-sm'}`}>
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Transmit field data</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-bold">Drag and drop or click to select photo</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isPosting}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-800 hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      Share with Community
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForumPage;
