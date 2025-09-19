"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Send,
  User,
  Trash2,
  Edit3,
  Clock
} from "lucide-react";
import {
  getBlogInteractions,
  toggleLike,
  addComment,
  deleteComment,
  getUserDisplayName,
  setUserDisplayName,
  type Comment,
  type BlogInteractions as BlogInteractionsType
} from "@/lib/blog-interactions";

interface BlogInteractionsProps {
  postId: string;
  postTitle: string;
}

export function BlogInteractions({ postId, postTitle }: BlogInteractionsProps) {
  const [interactions, setInteractions] = useState<BlogInteractionsType>({
    likes: 0,
    comments: [],
    userHasLiked: false
  });
  const [newComment, setNewComment] = useState("");
  const [userDisplayName, setUserDisplayNameState] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load interactions on component mount
  useEffect(() => {
    const loadInteractions = () => {
      const data = getBlogInteractions(postId);
      setInteractions(data);
    };

    loadInteractions();
    setUserDisplayNameState(getUserDisplayName());

    // Listen for storage changes to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith(`blog_likes_${postId}`) || 
          e.key?.startsWith(`blog_comments_${postId}`)) {
        loadInteractions();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [postId]);

  const handleLike = () => {
    const result = toggleLike(postId);
    setInteractions(prev => ({
      ...prev,
      likes: result.likes,
      userHasLiked: result.userHasLiked
    }));
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      const comment = addComment(postId, newComment, userDisplayName);
      setInteractions(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      setNewComment("");
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    const success = deleteComment(postId, commentId);
    if (success) {
      setInteractions(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId)
      }));
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserDisplayName(tempName.trim());
      setUserDisplayNameState(tempName.trim());
      setIsEditingName(false);
      setTempName("");
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Engagement Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant={interactions.userHasLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="gap-2"
              >
                <Heart 
                  className={`h-4 w-4 ${interactions.userHasLiked ? 'fill-current' : ''}`} 
                />
                {interactions.likes} {interactions.likes === 1 ? 'Like' : 'Likes'}
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                {interactions.comments.length} {interactions.comments.length === 1 ? 'Comment' : 'Comments'}
              </div>
            </div>
            
            <Badge variant="outline" className="gap-1">
              <User className="h-3 w-3" />
              {userDisplayName}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* User Name Editor */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            Your Identity
            {!isEditingName && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditingName(true);
                  setTempName(userDisplayName);
                }}
                className="gap-2"
              >
                <Edit3 className="h-3 w-3" />
                Edit
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditingName ? (
            <div className="flex gap-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your display name"
                onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <Button onClick={handleSaveName} size="sm">
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsEditingName(false);
                  setTempName("");
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You're commenting as <strong>{userDisplayName}</strong>. 
              Your identity is stored locally and doesn't require registration.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Add Comment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add a Comment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Share your thoughts about "${postTitle}"...`}
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {newComment.length}/500 characters
            </p>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting || newComment.length > 500}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      {interactions.comments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Comments ({interactions.comments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interactions.comments
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((comment, index) => (
                <div key={comment.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="gap-1">
                          <User className="h-3 w-3" />
                          {comment.author}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(comment.timestamp)}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                    
                    {comment.author === userDisplayName && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  {index < interactions.comments.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {interactions.comments.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No comments yet</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to share your thoughts about this post!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

