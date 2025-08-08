import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { Eye, EyeOff, Mail, Phone, Smartphone } from "lucide-react";

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock login - simulate API call
    setTimeout(() => {
      const mockUser = {
        id: "user123",
        name: "John Doe",
        email: email || "john.doe@example.com",
        phone: phone || "+1234567890",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: true,
      };
      
      login(mockUser);
      toast({
        title: "Login Successful",
        description: "Welcome back to The One!",
      });
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const mockUser = {
      id: "google123",
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      loginMethod: "google",
    };
    
    login(mockUser);
    toast({
      title: "Google Login Successful",
      description: "Welcome to The One!",
    });
    navigate("/dashboard");
  };

  const handleBiometricLogin = () => {
    // Mock biometric verification
    toast({
      title: "Biometric Verification",
      description: "Please position your face in the camera frame...",
    });
    
    setTimeout(() => {
      const mockUser = {
        id: "bio123",
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: true,
        loginMethod: "biometric",
      };
      
      login(mockUser);
      toast({
        title: "Biometric Login Successful",
        description: "Face verification completed!",
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <Logo size="lg" />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">The One</h1>
          <p className="text-blue-600 font-medium text-lg">The One Your Best Social!</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Login Method Tabs */}
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                  loginMethod === "email" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setLoginMethod("email")}
              >
                <Mail className="h-4 w-4 inline mr-1" />
                Email
              </button>
              <button
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                  loginMethod === "phone" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setLoginMethod("phone")}
              >
                <Phone className="h-4 w-4 inline mr-1" />
                Phone
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginMethod === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="space-y-3">
              <Separator className="my-4" />
              
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleBiometricLogin}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Face Recognition Login
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Footer Branding */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">The One Your Best Social!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;