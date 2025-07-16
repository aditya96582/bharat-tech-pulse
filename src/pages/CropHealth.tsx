import React, { useState, useRef } from 'react';
import { Camera, ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const CropHealth = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
      }
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = `
        🌱 Analysis Results:
        
        Crop: Wheat
        Health Status: Moderate Risk
        
        🔍 Detected Issues:
        • Leaf rust spots detected (42% affected area)
        • Nutrient deficiency signs
        
        💡 Recommendations:
        • Apply fungicide spray within 2 days
        • Increase nitrogen fertilizer
        • Monitor moisture levels
        
        🎯 Confidence: 87%
      `;
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setAnalysis(null);
    openCamera();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-primary hover:text-primary/80">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-primary">Crop Health Scanner</h1>
        </div>

        <div className="max-w-lg mx-auto">
          {!isCameraOpen && !capturedImage && (
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border text-center">
              <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-card-foreground mb-2">
                Take a Photo
              </h2>
              <p className="text-muted-foreground mb-6">
                Capture a clear image of your crop to analyze its health
              </p>
              <button
                onClick={openCamera}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
              >
                <Camera className="h-5 w-5" />
                Open Camera
              </button>
            </div>
          )}

          {isCameraOpen && (
            <div className="bg-card rounded-lg p-4 shadow-lg border border-border">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg mb-4"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Capture Photo
                </button>
                <button
                  onClick={() => {
                    const stream = videoRef.current?.srcObject as MediaStream;
                    if (stream) {
                      stream.getTracks().forEach(track => track.stop());
                    }
                    setIsCameraOpen(false);
                  }}
                  className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="bg-card rounded-lg p-4 shadow-lg border border-border">
              <img
                src={capturedImage}
                alt="Captured crop"
                className="w-full rounded-lg mb-4"
              />
              
              {!analysis && (
                <div className="flex gap-4">
                  <button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Analyze Crop
                      </>
                    )}
                  </button>
                  <button
                    onClick={retakePhoto}
                    className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Retake
                  </button>
                </div>
              )}

              {analysis && (
                <div className="mt-4">
                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                      {analysis}
                    </pre>
                  </div>
                  <button
                    onClick={retakePhoto}
                    className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  >
                    Scan Another Crop
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropHealth;