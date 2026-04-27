import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  User, 
  Clock, 
  Plus, 
  Send, 
  ShieldCheck, 
  Image as ImageIcon,
  Loader2,
  ChevronRight,
  X,
  Upload,
  Trash2
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
      // Upload image to server if present
      let imageUrl: string | undefined = undefined;
      if (uploadedImage && fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadResp = await fetch('http://127.0.0.1:8000/upload/forum-image', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        if (uploadResp.ok) {
          const uploadData = await uploadResp.json();
          imageUrl = uploadData.url;
        } else {
          // Fallback: store as base64
          imageUrl = uploadedImage;
        }
      }

      const response = await fetch('http://127.0.0.1:8000/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newPost,
          image_url: imageUrl || undefined
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

  if (isLoading) {
    return (
      <div className="pt-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Community <span className="text-primary">Forum</span>
            </h1>
            <p className="text-slate-500 font-medium italic">
              Share your field photos and get advice from verified agronomists.
            </p>
          </div>
          <button
            onClick={() => token ? setShowCreateModal(true) : toast.error('Please login to post')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Start Discussion
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="p-6 md:p-8">
                  {/* Post Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${post.author.is_expert ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      {post.author.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{post.author.full_name}</span>
                        {post.author.is_expert && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">
                            <ShieldCheck className="w-3 h-3" /> Verified Agronomist
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-black text-slate-900 mb-3">{post.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>

                  {post.image_url && (
                    <div className="rounded-2xl overflow-hidden border border-slate-100 mb-6 max-h-[400px]">
                      <img 
                        src={post.image_url} 
                        alt="Field photo" 
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <button 
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-primary transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {post.comments.length} Discussion{post.comments.length !== 1 ? 's' : ''}
                    </button>
                    <button 
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      className="text-primary font-bold text-sm flex items-center gap-1"
                    >
                      {expandedPost === post.id ? 'Close Discussion' : 'Join Discussion'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedPost === post.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {/* Expanded Comments */}
                  {expandedPost === post.id && (
                    <div className="mt-8 pt-8 border-t border-slate-50 space-y-6">
                      <div className="space-y-4">
                        {post.comments.length === 0 && (
                          <p className="text-slate-400 text-sm text-center py-4">No replies yet. Be the first to help!</p>
                        )}
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4">
                            <div className={`w-1 rounded-full ${comment.author.is_expert ? 'bg-blue-400' : 'bg-slate-200'}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-black ${comment.author.is_expert ? 'text-blue-600' : 'text-slate-900'}`}>
                                  {comment.author.full_name}
                                </span>
                                {comment.author.is_expert && (
                                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                                )}
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment */}
                      <div className="relative mt-6">
                        <input 
                          type="text" 
                          value={commentTexts[post.id] || ''}
                          onChange={(e) => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          placeholder={user ? "Provide advice or ask a question..." : "Login to comment..."}
                          disabled={!user}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                        />
                        <button 
                          onClick={() => handleAddComment(post.id)}
                          disabled={!user || commentingPost === post.id}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                          {commentingPost === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold">No discussions started yet.</p>
              <p className="text-slate-300 text-sm">Be the first one to share a crop photo!</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 sticky top-0">
              <h3 className="font-black text-slate-900 uppercase tracking-wider text-sm">New Discussion</h3>
              <button onClick={() => { setShowCreateModal(false); setUploadedImage(null); }} className="p-2 hover:bg-white rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Topic / Subject</label>
                <input 
                  type="text" 
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="e.g. Unusual spots on my tomato leaves"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Describe what you're seeing, when it started, and any other details..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Field Photo (Optional)</label>
                {uploadedImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-100">
                    <img src={uploadedImage} alt="Preview" className="w-full max-h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => { setUploadedImage(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`bg-slate-50 rounded-2xl p-6 border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className={`p-3 rounded-xl ${isDragging ? 'bg-primary/10' : 'bg-slate-100'}`}>
                      <Upload className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-slate-400'}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-600">Drop your field photo here</p>
                      <p className="text-xs text-slate-400 mt-1">or click to browse · PNG, JPG up to 5MB</p>
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
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Share with Community'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
