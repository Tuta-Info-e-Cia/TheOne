import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { mockTestimonials, mockScraps } from "../data/mockData";
import { 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Edit, 
  MessageSquare, 
  Award,
  Heart,
  Share2,
  Users,
  Camera
} from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [scrapContent, setScrapContent] = useState("");

  const handleSendScrap = () => {
    if (!scrapContent.trim()) return;

    toast({
      title: "Scrap Sent!",
      description: "Your message has been posted to your profile.",
    });
    setScrapContent("");
  };

  const handleWriteTestimonial = () => {
    toast({
      title: "Write Testimonial",
      description: "Testimonial feature will be available soon!",
    });
  };

  const profileStats = [
    { label: "Friends", value: "156", icon: Users, color: "text-blue-600" },
    { label: "Communities", value: "23", icon: MessageSquare, color: "text-green-600" },
    { label: "Testimonials", value: "45", icon: Award, color: "text-purple-600" },
    { label: "Photos", value: "89", icon: Camera, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="text-gray-600 mt-1">
                      Photography enthusiast | Travel lover | Community builder
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        São Paulo, Brazil
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined Jan 2025
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        ✓ Verified
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button>
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {profileStats.map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-lg border">
                      <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content Tabs */}
        <Tabs defaultValue="scraps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scraps">Scraps</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Scraps Tab */}
          <TabsContent value="scraps" className="space-y-4">
            {/* Write Scrap */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave a Scrap</CardTitle>
                <CardDescription>
                  Write a message on {user?.name?.split(" ")[0]}'s profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a scrap message..."
                      value={scrapContent}
                      onChange={(e) => setScrapContent(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleSendScrap} disabled={!scrapContent.trim()}>
                      Send Scrap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scraps List */}
            <div className="space-y-4">
              {mockScraps.map((scrap) => (
                <Card key={scrap.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={scrap.from.avatar} alt={scrap.from.name} />
                        <AvatarFallback>
                          {scrap.from.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{scrap.from.name}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(scrap.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800 mt-1">{scrap.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="text-center py-4">
              <Button onClick={handleWriteTestimonial} className="mb-6">
                <Award className="h-4 w-4 mr-2" />
                Write Testimonial
              </Button>
            </div>

            <div className="space-y-4">
              {mockTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.from.avatar} alt={testimonial.from.name} />
                        <AvatarFallback>
                          {testimonial.from.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-lg">{testimonial.from.name}</h4>
                          <Award className="h-4 w-4 text-gold-500" />
                        </div>
                        <p className="text-gray-800 italic">"{testimonial.content}"</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(testimonial.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop", 
                "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
              ].map((src, index) => (
                <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <img 
                    src={src} 
                    alt={`Photo ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Jan {25 - index}, 2025</span>
                      <div className="flex space-x-2">
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {12 + index * 3}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {user?.name?.split(" ")[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p className="text-gray-700">
                    Passionate photographer and community builder with a love for capturing life's beautiful moments. 
                    I enjoy traveling, meeting new people, and sharing experiences through visual storytelling. 
                    Always excited to connect with fellow creators and explore new perspectives!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{user?.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Photography", "Travel", "Technology", "Art", "Music", "Food", "Nature"].map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer with branding */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>The One Your Best Social! © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;