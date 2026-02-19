import { useState } from 'react';
import { motion } from 'framer-motion';
import CandidateSidebar from '@/components/CandidateSidebar';
import { User, Mail, FileText, Save } from 'lucide-react';

export default function CandidateProfilePage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [resumeUrl, setResumeUrl] = useState('https://example.com/resume.pdf');
  const [bio, setBio] = useState('Experienced software developer with a passion for AI and machine learning.');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CandidateSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Profile</h1>
            <p className="text-foreground/70 font-paragraph">Manage your profile information</p>
          </div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card-background rounded-2xl p-8 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            <form onSubmit={handleSave} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-paragraph font-medium text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-background text-foreground rounded-xl border border-card-background focus:border-input-glow focus:outline-none focus:ring-2 focus:ring-input-glow/50 transition-all duration-300 font-paragraph"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-paragraph font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-background text-foreground rounded-xl border border-card-background focus:border-input-glow focus:outline-none focus:ring-2 focus:ring-input-glow/50 transition-all duration-300 font-paragraph"
                />
              </div>

              {/* Resume URL */}
              <div>
                <label htmlFor="resume" className="block text-sm font-paragraph font-medium text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Resume URL
                </label>
                <input
                  id="resume"
                  type="url"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://example.com/your-resume.pdf"
                  className="w-full px-4 py-3 bg-background text-foreground rounded-xl border border-card-background focus:border-input-glow focus:outline-none focus:ring-2 focus:ring-input-glow/50 transition-all duration-300 font-paragraph"
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-paragraph font-medium text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-background text-foreground rounded-xl border border-card-background focus:border-input-glow focus:outline-none focus:ring-2 focus:ring-input-glow/50 transition-all duration-300 font-paragraph resize-none"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-paragraph font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
