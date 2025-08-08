import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  Users, 
  TrendingUp, 
  Mail,
  MessageSquare,
  UserPlus,
  Award
} from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postContent, setPostContent] = useState("");

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      author: {
        name: "Maria Silva",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b39d6eb1?w=100&h=100&fit=crop&crop=face",
      },
      content: "Just joined The One community! Loving the nostalgic Orkut vibes with modern features. 🎉",
      timestamp: "2 hours ago",
      likes: 23,
      comments: 5,
      community: "New Members",
    },
    {
      id: 2,
      author: {
        name: "Carlos Santos",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      content: "Remember the good old days of scraps and testimonials? The One brings back all those memories! Who else is excited about communities?",
      timestamp: "4 hours ago",
      likes: 45,
      comments: 12,
      community: "Nostalgia Corner",
    },
    {
      id: 3,
      author: {
        name: "Ana Costa",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      content: "Creating my first community on The One - 'Photography Enthusiasts Brazil'. Join us to share your best shots! 📸",
      timestamp: "6 hours ago",
      likes: 67,
      comments: 18,
      community: "Photography",
    },
  ];

  const handlePost = () => {
    if (!postContent.trim()) return;

    toast({
      title: "Post Shared",
      description: "Your post has been shared with your network!",
    });
    setPostContent("");
  };

  const handleLike = (postId) => {
    toast({
      title: "Liked!",
      description: "You liked this post.",
    });
  };

  const handleInviteFriends = () => {
    toast({
      title: "Invite Friends",
      description: "Invitation options: Email, WhatsApp, and SMS are available!",
    });
  };

  // Mock stats
  const stats = [
    { icon: Users, label: "Friends", value: "156", color: "bg-blue-500" },
    { icon: MessageSquare, label: "Communities", value: "23", color: "bg-green-500" },
    { icon: Award, label: "Testimonials", value: "45", color: "bg-purple-500" },
    { icon: TrendingUp, label: "Profile Views", value: "892", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - User Info & Stats */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Welcome back, {user?.name?.split(" ")[0]}!</CardTitle>
                <CardDescription>The One Your Best Social!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className={`w-8 h-8 ${stat.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleInviteFriends}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Friends
                </Button>
              </CardContent>
            </Card>

            {/* Trending Communities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Communities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Photography Brazil", members: "12.5k", growth: "+15%" },
                  { name: "Tech Startups", members: "8.2k", growth: "+23%" },
                  { name: "Travel Stories", members: "15.8k", growth: "+8%" },
                ].map((community, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">{community.name}</div>
                      <div className="text-xs text-gray-500">{community.members} members</div>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {community.growth}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Communities
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind? Share with The One community..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[80px] resize-none border-none shadow-none focus:ring-0"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Community
                    </Button>
                  </div>
                  <Button 
                    onClick={handlePost}
                    disabled={!postContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Share Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>
                            {post.author.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author.name}</div>
                          <div className="text-sm text-gray-500">{post.timestamp}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{post.community}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between border-t pt-3">
                      <div className="flex space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="px-8">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with branding */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>The One Your Best Social! © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;