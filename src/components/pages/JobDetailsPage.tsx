import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CandidateSidebar from '@/components/CandidateSidebar';
import { BaseCrudService } from '@/integrations';
import { JobListings, Applications } from '@/entities';
import { MapPin, Briefcase, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    if (!id) return;
    setIsLoading(true);
    const data = await BaseCrudService.getById<JobListings>('jobs', id);
    setJob(data);
    setIsLoading(false);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !resumeUrl) return;

    setIsApplying(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create application with mock AI analysis
    const matchScore = Math.floor(Math.random() * 30) + 70; // 70-100
    await BaseCrudService.create<Applications>('applications', {
      _id: crypto.randomUUID(),
      candidateName: 'John Doe',
      resume: resumeUrl,
      jobReference: job.jobTitle,
      applicationStatus: 'Pending',
      matchScore: matchScore,
      strengths: 'Strong technical background, excellent communication skills, relevant experience in similar roles',
      missingSkills: 'Could benefit from additional cloud computing certifications'
    });

    setIsApplying(false);
    navigate('/candidate/applications');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <CandidateSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-[100rem] mx-auto min-h-[600px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen bg-background">
        <CandidateSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-[100rem] mx-auto">
            <div className="bg-card-background rounded-2xl p-12 text-center shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
              <p className="text-foreground/70 font-paragraph mb-4">Job not found</p>
              <button
                onClick={() => navigate('/candidate/browse-jobs')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CandidateSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/candidate/browse-jobs')}
            className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300 font-paragraph mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </button>

          {/* Job Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card-background rounded-2xl p-8 mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-heading font-bold text-foreground mb-4">{job.jobTitle}</h1>
                <div className="flex flex-wrap items-center gap-4 text-foreground/70 font-paragraph mb-4">
                  {job.companyName && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      {job.companyName}
                    </div>
                  )}
                  {job.jobLocation && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {job.jobLocation}
                    </div>
                  )}
                </div>
              </div>
              {job.experienceLevel && (
                <span className="px-4 py-2 bg-primary/20 text-primary rounded-xl font-paragraph font-medium">
                  {job.experienceLevel}
                </span>
              )}
            </div>

            {/* Description */}
            {job.jobDescription && (
              <div className="mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Job Description</h2>
                <p className="text-foreground/70 font-paragraph leading-relaxed">{job.jobDescription}</p>
              </div>
            )}

            {/* Required Skills */}
            {job.requiredSkills && (
              <div className="mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.split(',').map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-secondary/20 text-secondary rounded-xl font-paragraph"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Button */}
            {!showApplicationForm && (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Apply Now
              </button>
            )}
          </motion.div>

          {/* Application Form */}
          {showApplicationForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card-background rounded-2xl p-8 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
            >
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Submit Application</h2>
              
              <form onSubmit={handleApply} className="space-y-6">
                <div>
                  <label htmlFor="resume" className="block text-sm font-paragraph font-medium text-foreground mb-2">
                    Resume URL
                  </label>
                  <input
                    id="resume"
                    type="url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    required
                    placeholder="https://example.com/your-resume.pdf"
                    className="w-full px-4 py-3 bg-background text-foreground rounded-xl border border-card-background focus:border-input-glow focus:outline-none focus:ring-2 focus:ring-input-glow/50 transition-all duration-300 font-paragraph"
                  />
                </div>

                {isApplying && (
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-primary font-paragraph">AI is analyzing your resume...</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isApplying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    disabled={isApplying}
                    className="px-8 py-3 bg-transparent text-primary border-2 border-primary rounded-xl font-paragraph font-semibold hover:scale-105 transition-all duration-300 hover:bg-card-background disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
