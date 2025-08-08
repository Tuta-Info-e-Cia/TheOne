import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { mockCommunities } from "../data/mockData";
import { 
  Users, 
  MessageSquare, 
  Search, 
  Plus, 
  Star,
  TrendingUp,
  Hash,
  Calendar,
  Crown,
  UserPlus
} from "lucide-react";

const CommunitiesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleJoinCommunity = (communityId) => {
    toast({
      title: "Joined Community!",
      description: "You have successfully joined the community.",
    });
  };

  const handleCreateCommunity = () => {
    toast({
      title: "Create Community",
      description: "Community creation feature coming soon!",
    });
  };

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || community.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "photography", "technology", "travel", "food", "music"];
  const trendingCommunities = mockCommunities.filter(c => c.trending);
  const myCommunities = mockCommunities.filter(c => c.isJoined);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Communities</h1>
            <p className="text-gray-600">The One Your Best Social! - Connect through shared interests</p>
          </div>
          <Button onClick={handleCreateCommunity} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Community
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search communities on The One..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedCategory === category 
                        ? "bg-blue-600 text-white" 
                        : "hover:bg-slate-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-communities">My Communities ({myCommunities.length})</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <Card key={community.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={community.avatar} alt={community.name} />
                          <AvatarFallback>
                            <Hash className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{community.category}</Badge>
                            {community.trending && (
                              <Badge variant="outline" className="text-orange-600">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {community.description}
                    </CardDescription>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members.toLocaleString()} members
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {community.posts.toLocaleString()} posts
                      </div>
                    </div>

                    {community.isJoined ? (
                      <Button variant="outline" className="w-full" disabled>
                        <Users className="h-4 w-4 mr-2" />
                        Joined
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleJoinCommunity(community.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Community
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No communities found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {/* My Communities Tab */}
          <TabsContent value="my-communities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCommunities.map((community) => (
                <Card key={community.id} className="hover:shadow-lg transition-shadow border-blue-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={community.avatar} alt={community.name} />
                          <AvatarFallback>
                            <Hash className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {community.name}
                            {community.moderators.includes(user?.id) && (
                              <Crown className="h-4 w-4 ml-2 text-yellow-500" />
                            )}
                          </CardTitle>
                          <Badge variant="secondary">{community.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 mb-4">
                      {community.description}
                    </CardDescription>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members.toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {community.posts.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Discussions
                      </Button>
                      {community.moderators.includes(user?.id) && (
                        <Button variant="outline" className="w-full">
                          <Crown className="h-4 w-4 mr-2" />
                          Manage Community
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {myCommunities.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No communities joined yet</h3>
                <p className="text-gray-500 mb-4">Start by discovering and joining communities that match your interests</p>
                <Button onClick={() => setSelectedCategory("all")} className="bg-blue-600 hover:bg-blue-700">
                  Discover Communities
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🔥 Trending on The One</h3>
              <p className="text-gray-600">Communities gaining the most traction this week</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCommunities.map((community, index) => (
                <Card key={community.id} className="hover:shadow-lg transition-shadow border-orange-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={community.avatar} alt={community.name} />
                            <AvatarFallback>
                              <Hash className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {community.name}
                            <TrendingUp className="h-4 w-4 ml-2 text-orange-500" />
                          </CardTitle>
                          <Badge variant="secondary">{community.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 mb-4">
                      {community.description}
                    </CardDescription>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members.toLocaleString()}
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{Math.floor(Math.random() * 30 + 10)}% growth
                      </div>
                    </div>

                    {community.isJoined ? (
                      <Button variant="outline" className="w-full" disabled>
                        <Users className="h-4 w-4 mr-2" />
                        Joined
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleJoinCommunity(community.id)}
                        className="w-full bg-orange-500 hover:bg-orange-600"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Join Trending
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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

export default CommunitiesPage;