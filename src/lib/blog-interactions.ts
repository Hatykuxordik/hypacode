// Blog interactions library for likes and comments
// Uses localStorage for persistence without requiring user registration

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  postId: string;
}

export interface BlogInteractions {
  likes: number;
  comments: Comment[];
  userHasLiked: boolean;
}

// Generate a unique user ID for anonymous users
function getUserId(): string {
  let userId = localStorage.getItem('blog_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('blog_user_id', userId);
  }
  return userId;
}

// Get user's display name (can be changed by user)
export function getUserDisplayName(): string {
  return localStorage.getItem('blog_user_name') || 'Anonymous User';
}

// Set user's display name
export function setUserDisplayName(name: string): void {
  localStorage.setItem('blog_user_name', name);
}

// Get likes for a post
export function getLikes(postId: string): number {
  const likes = localStorage.getItem(`blog_likes_${postId}`);
  return likes ? parseInt(likes, 10) : 0;
}

// Check if current user has liked a post
export function hasUserLiked(postId: string): boolean {
  const userId = getUserId();
  const likedPosts = localStorage.getItem(`blog_user_likes_${userId}`);
  if (!likedPosts) return false;
  
  try {
    const likedPostsArray = JSON.parse(likedPosts);
    return likedPostsArray.includes(postId);
  } catch {
    return false;
  }
}

// Toggle like for a post
export function toggleLike(postId: string): { likes: number; userHasLiked: boolean } {
  const userId = getUserId();
  const currentLikes = getLikes(postId);
  const userHasLiked = hasUserLiked(postId);
  
  // Get user's liked posts
  let likedPosts: string[] = [];
  try {
    const stored = localStorage.getItem(`blog_user_likes_${userId}`);
    likedPosts = stored ? JSON.parse(stored) : [];
  } catch {
    likedPosts = [];
  }
  
  if (userHasLiked) {
    // Remove like
    const newLikes = Math.max(0, currentLikes - 1);
    localStorage.setItem(`blog_likes_${postId}`, newLikes.toString());
    
    // Remove from user's liked posts
    likedPosts = likedPosts.filter(id => id !== postId);
    localStorage.setItem(`blog_user_likes_${userId}`, JSON.stringify(likedPosts));
    
    return { likes: newLikes, userHasLiked: false };
  } else {
    // Add like
    const newLikes = currentLikes + 1;
    localStorage.setItem(`blog_likes_${postId}`, newLikes.toString());
    
    // Add to user's liked posts
    likedPosts.push(postId);
    localStorage.setItem(`blog_user_likes_${userId}`, JSON.stringify(likedPosts));
    
    return { likes: newLikes, userHasLiked: true };
  }
}

// Get comments for a post
export function getComments(postId: string): Comment[] {
  const comments = localStorage.getItem(`blog_comments_${postId}`);
  if (!comments) return [];
  
  try {
    const parsedComments = JSON.parse(comments);
    return parsedComments.map((comment: any) => ({
      ...comment,
      timestamp: new Date(comment.timestamp)
    }));
  } catch {
    return [];
  }
}

// Add a comment to a post
export function addComment(postId: string, content: string, author?: string): Comment {
  const comment: Comment = {
    id: 'comment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    author: author || getUserDisplayName(),
    content: content.trim(),
    timestamp: new Date(),
    postId
  };
  
  const existingComments = getComments(postId);
  const updatedComments = [...existingComments, comment];
  
  localStorage.setItem(`blog_comments_${postId}`, JSON.stringify(updatedComments));
  
  return comment;
}

// Get all interactions for a post
export function getBlogInteractions(postId: string): BlogInteractions {
  return {
    likes: getLikes(postId),
    comments: getComments(postId),
    userHasLiked: hasUserLiked(postId)
  };
}

// Delete a comment (only if user is the author)
export function deleteComment(postId: string, commentId: string): boolean {
  const comments = getComments(postId);
  const comment = comments.find(c => c.id === commentId);
  
  if (!comment) return false;
  
  // Check if current user is the author
  const userId = getUserId();
  const userDisplayName = getUserDisplayName();
  
  if (comment.author !== userDisplayName) return false;
  
  const updatedComments = comments.filter(c => c.id !== commentId);
  localStorage.setItem(`blog_comments_${postId}`, JSON.stringify(updatedComments));
  
  return true;
}

// Get total engagement stats across all posts
export function getTotalEngagementStats(): { totalLikes: number; totalComments: number } {
  let totalLikes = 0;
  let totalComments = 0;
  
  // Iterate through localStorage to count all likes and comments
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    
    if (key.startsWith('blog_likes_')) {
      const likes = localStorage.getItem(key);
      if (likes) {
        totalLikes += parseInt(likes, 10) || 0;
      }
    } else if (key.startsWith('blog_comments_')) {
      const comments = localStorage.getItem(key);
      if (comments) {
        try {
          const parsedComments = JSON.parse(comments);
          totalComments += parsedComments.length || 0;
        } catch {
          // Ignore invalid JSON
        }
      }
    }
  }
  
  return { totalLikes, totalComments };
}

