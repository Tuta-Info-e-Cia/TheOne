import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { mockUsers } from "../data/mockData";
import { 
  Users, 
  Search, 
  UserPlus, 
  Mail,
  MessageSquare,
  Phone,
  MessageCircle,
  Share2,
  Send,
  Smartphone
} from "lucide-react";

const FriendsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteMethod, setInviteMethod] = useState("email");
  const [inviteData, setInviteData] = useState({
    email: "",
    phone: "",
    message: "Hey! I'm using The One - Your Best Social platform. Join me and let's reconnect like the good old Orkut days! 🎉",
  });

  // Mock data - in real app this would come from API
  const friends = mockUsers.slice(0, 3);
  const suggestions = mockUsers.slice(0, 2);
  const pendingRequests = [];

  const handleSendInvite = () => {
    const recipient = inviteMethod === "email" ? inviteData.email : inviteData.phone;
    
    if (!recipient.trim()) {
      toast({
        title: "Missing Information",
        description: `Please enter ${inviteMethod === "email" ? "an email address" : "a phone number"}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation Sent!",
      description: `Your invitation has been sent via ${inviteMethod === "email" ? "email" : inviteMethod === "phone" ? "SMS" : "WhatsApp"}`,
    });

    setInviteDialogOpen(false);
    setInviteData({
      email: "",
      phone: "",
      message: "Hey! I'm using The One - Your Best Social platform. Join me and let's reconnect like the good old Orkut days! 🎉",
    });
  };

  const handleAddFriend = (userId) => {
    toast({
      title: "Friend Request Sent",
      description: "Your friend request has been sent!",
    });
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const InviteDialog = () => (
    <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Friends to The One</DialogTitle>
          <DialogDescription>
            Share The One Your Best Social! with your friends
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Invite Method Selection */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                inviteMethod === "email" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setInviteMethod("email")}
            >
              <Mail className="h-4 w-4 inline mr-1" />
              Email
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                inviteMethod === "whatsapp" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setInviteMethod("whatsapp")}
            >
              <MessageCircle className="h-4 w-4 inline mr-1" />
              WhatsApp
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                inviteMethod === "sms" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setInviteMethod("sms")}
            >
              <Smartphone className="h-4 w-4 inline mr-1" />
              SMS
            </button>
          </div>

          {/* Input Field */}
          <div className="space-y-2">
            <Label htmlFor="contact">
              {inviteMethod === "email" ? "Email Address" : "Phone Number"}
            </Label>
            <Input
              id="contact"
              type={inviteMethod === "email" ? "email" : "tel"}
              placeholder={
                inviteMethod === "email" 
                  ? "friend@example.com" 
                  : "+1234567890"
              }
              value={inviteMethod === "email" ? inviteData.email : inviteData.phone}
              onChange={(e) => setInviteData(prev => ({
                ...prev,
                [inviteMethod === "email" ? "email" : "phone"]: e.target.value
              }))}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message..."
              value={inviteData.message}
              onChange={(e) => setInviteData(prev => ({
                ...prev,
                message: e.target.value
              }))}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleSendInvite}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Friends</h1>
            <p className="text-gray-600">The One Your Best Social! - Stay connected with your network</p>
          </div>
          <Button 
            onClick={() => setInviteDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search friends on The One..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
            <TabsTrigger value="requests">Requests ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="invites">My Invites</TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            {filteredFriends.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <Avatar className="h-20 w-20 mx-auto mb-3">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback className="text-lg">
                          {friend.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{friend.name}</CardTitle>
                      <CardDescription className="flex items-center justify-center space-x-4 text-sm">
                        <span>{friend.friends} friends</span>
                        <span>•</span>
                        <span>{friend.communities} communities</span>
                      </CardDescription>
                      {friend.verified && (
                        <Badge variant="secondary" className="text-green-600 w-fit mx-auto">
                          ✓ Verified
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center mb-4">{friend.bio}</p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {searchTerm ? "No friends found" : "No friends yet"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? "Try adjusting your search terms" 
                    : "Start by inviting your friends to join The One"
                  }
                </p>
                <Button 
                  onClick={() => setInviteDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Friends
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">People You May Know</h3>
              <p className="text-gray-600">Based on mutual connections and interests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((person) => (
                <Card key={person.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-3">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback className="text-lg">
                        {person.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{person.name}</CardTitle>
                    <CardDescription>
                      <div className="text-sm text-gray-500 mb-2">{person.location}</div>
                      <Badge variant="outline" className="text-xs">
                        {Math.floor(Math.random() * 15) + 1} mutual friends
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm text-center mb-4">{person.bio}</p>
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleAddFriend(person.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Friend
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No friend requests</h3>
              <p className="text-gray-500">When people send you friend requests, they'll appear here</p>
            </div>
          </TabsContent>

          {/* My Invites Tab */}
          <TabsContent value="invites" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Invitations</h3>
              <p className="text-gray-600">Track the invites you've sent to friends</p>
            </div>

            <div className="space-y-4">
              {/* Sample invitation history */}
              {[
                { email: "friend1@example.com", method: "email", status: "pending", date: "2 days ago" },
                { phone: "+1234567890", method: "whatsapp", status: "joined", date: "1 week ago" },
                { phone: "+0987654321", method: "sms", status: "sent", date: "3 days ago" },
              ].map((invite, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          {invite.method === "email" && <Mail className="h-4 w-4 text-blue-600" />}
                          {invite.method === "whatsapp" && <MessageCircle className="h-4 w-4 text-green-600" />}
                          {invite.method === "sms" && <Smartphone className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {invite.email || invite.phone}
                          </p>
                          <p className="text-sm text-gray-500 capitalize">
                            Sent via {invite.method} • {invite.date}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={invite.status === "joined" ? "default" : "outline"}
                        className={
                          invite.status === "joined" 
                            ? "bg-green-500 text-white" 
                            : invite.status === "pending" 
                            ? "text-orange-600" 
                            : "text-blue-600"
                        }
                      >
                        {invite.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button 
                onClick={() => setInviteDialogOpen(true)}
                variant="outline"
                className="px-8"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Send More Invites
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invite Dialog */}
      <InviteDialog />

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

export default FriendsPage;