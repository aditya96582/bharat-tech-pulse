import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Leaf } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Bharat Tech Pulse
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link 
            to="/crop-health" 
            className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
          >
            <div className="flex items-center gap-4">
              <Camera className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">
                  Crop Health Scanner
                </h2>
                <p className="text-muted-foreground">
                  Take a photo to analyze crop diseases
                </p>
              </div>
            </div>
          </Link>
          
          <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
            <div className="flex items-center gap-4">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">
                  More Features
                </h2>
                <p className="text-muted-foreground">
                  Coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;