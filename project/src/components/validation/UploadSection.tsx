
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, FileText, FormInput, Loader } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface UploadSectionProps {
  onSubmitSuccess: (scores: {
    validationScore: number;
    uniquenessScore: number;
    marketTrendScore: number;
    userEngagementScore: number;
  }) => void;
}

export function UploadSection({ onSubmitSuccess }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFormMode, setIsFormMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_description: '',
    domain_name: '',
    target_audience: '',
    financial_viability: '',
    profitability: ''
  });

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      onSubmitSuccess({
        validationScore: data.validation_score,
        uniquenessScore: data.uniqueness_score,
        marketTrendScore: data.market_trend_score,
        userEngagementScore: data.user_engagement_score
      });
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      onSubmitSuccess({
        validationScore: data.validation_score,
        uniquenessScore: data.uniqueness_score,
        marketTrendScore: data.market_trend_score,
        userEngagementScore: data.user_engagement_score
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {isFormMode ? <FormInput className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
          <h3 className="font-medium">Project Details</h3>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="input-mode" className="text-sm">
            {isFormMode ? 'Switch to File Upload' : 'Switch to Form Mode'}
          </Label>
          <Switch id="input-mode" checked={isFormMode} onCheckedChange={setIsFormMode} />
        </div>
      </div>

      {isFormMode ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project_description">Project Description</Label>
            <Textarea
              id="project_description"
              placeholder="Describe your project in detail..."
              value={formData.project_description}
              onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain_name">Domain Name</Label>
            <Input
              id="domain_name"
              placeholder="e.g., technology, healthcare, education"
              value={formData.domain_name}
              onChange={(e) => setFormData({ ...formData, domain_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_audience">Target Audience</Label>
            <Input
              id="target_audience"
              placeholder="Who is your target audience?"
              value={formData.target_audience}
              onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="financial_viability">Financial Viability</Label>
            <Input
              id="financial_viability"
              placeholder="Describe the financial aspects..."
              value={formData.financial_viability}
              onChange={(e) => setFormData({ ...formData, financial_viability: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profitability">Profitability</Label>
            <Input
              id="profitability"
              placeholder="Expected profitability and revenue model..."
              value={formData.profitability}
              onChange={(e) => setFormData({ ...formData, profitability: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              "Analyze Project"
            )}
          </Button>
        </form>
      ) : (
        <div
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all duration-300 ${
            isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-muted-foreground/25'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
          }}
        >
          <FileUp className="mb-4 h-12 w-12 text-muted-foreground transition-transform group-hover:scale-110" />
          <h3 className="mb-2 text-lg font-medium">Upload PDF Document</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Drop your PDF file here or click to browse
          </p>
          <label htmlFor="file-upload">
            <Button className="group cursor-pointer" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <span>Choose File</span>
              )}
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
            className="hidden"
          />
        </div>
      )}
    </Card>
  );
}