import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import Logo from "../components/Logo";
import { Users, MessageCircle, Shield, Globe, Heart, Star } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Communities",
      description: "Join thousands of communities based on your interests and hobbies",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      title: "Social Connection",
      description: "Share scraps, testimonials, and connect with friends worldwide",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Secure Authentication",
      description: "Multiple login options with biometric verification for enhanced security",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Cross-Platform",
      description: "Access from any device - web browsers, mobile apps on iOS and Android",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Logo size="md" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">The One</h1>
                <p className="text-sm text-blue-600 font-medium">The One Your Best Social!</p>
              </div>
            </div>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Logo size="xl" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to The One
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Your ultimate social networking platform. Connect with friends, join communities, 
            share moments, and build meaningful relationships.
          </p>
          <p className="text-2xl font-semibold text-blue-600 mb-8">
            The One Your Best Social!
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose The One?
            </h2>
            <p className="text-xl text-gray-600">
              Experience social networking like never before
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Communities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10M+</div>
              <div className="text-gray-600">Connections Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Logo size="sm" />
              <div>
                <h3 className="text-lg font-semibold">The One</h3>
                <p className="text-sm text-blue-400">The One Your Best Social!</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 The One. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;