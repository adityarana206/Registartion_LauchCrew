import { useState, type ChangeEvent, type FormEvent } from 'react';
import { User, Mail, Phone, Link2, GraduationCap, Shirt } from 'lucide-react';
// Note: Linkedin icon is removed from import since it is not provided by lucide-react in the way we imported it.

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  linkedinUrl: string;
  productHuntUrl: string;
  university: string;
  otherUniversity: string;
  tshirtSize: string;
}

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    linkedinUrl: '',
    productHuntUrl: '',
    university: '',
    otherUniversity: '',
    tshirtSize: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Map formData to the expected payload for the Express API
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        mobile_number: formData.mobile,
        linkedin_url: formData.linkedinUrl,
        producthunt_url: formData.productHuntUrl,
        university_name: formData.university === 'Other' ? formData.otherUniversity : formData.university,
        tshirt_size: formData.tshirtSize
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register');
      }

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong during registration.';
      alert(errorMessage);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50/50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] rounded-full bg-[#7c5cff]/40 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] rounded-full bg-[#19e6ff]/40 blur-3xl" />
        
        <div className="mx-auto w-full max-w-md relative z-10 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-[#7c5cff]/10 border border-neutral-100 text-center">
          <div className="mx-auto bg-white p-3 rounded-2xl shadow-xl shadow-[#7c5cff]/20 border border-neutral-100 flex items-center justify-center w-max mb-6">
            <img src="/logo.png" alt="LaunchCrew Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#7c5cff] to-[#19e6ff] bg-clip-text text-transparent mb-2">Registration Successful!</h2>
          <p className="text-neutral-500">Welcome to LaunchCrew, {formData.fullName.split(' ')[0]}. We'll be in touch soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] rounded-full bg-[#7c5cff]/40 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] rounded-full bg-[#19e6ff]/40 blur-3xl" />
      
      <div className="mx-auto w-full max-w-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-2xl shadow-xl shadow-[#7c5cff]/20 border border-neutral-100 flex items-center justify-center">
            <img src="/logo.png" alt="LaunchCrew Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold bg-gradient-to-r from-[#7c5cff] to-[#19e6ff] bg-clip-text text-transparent tracking-tight">
          Join LaunchCrew
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500 font-medium px-4 mb-8">
          Fill out the details below to register for the upcoming launch event.
        </p>

        <div className="bg-white/80 backdrop-blur-xl py-6 px-4 shadow-xl shadow-[#7c5cff]/10 rounded-2xl border border-neutral-100 sm:py-8 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 sm:gap-x-6 sm:grid-cols-2">
              
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email Address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-neutral-700">Mobile Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* University */}
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-neutral-700">University Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-neutral-400" />
                  </div>
                  <select
                    id="university"
                    name="university"
                    required
                    value={formData.university}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select a university</option>
                    <option value="Lovely Professional University">Lovely Professional University</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Other University */}
              {formData.university === 'Other' && (
                <div className="sm:col-span-2">
                  <label htmlFor="otherUniversity" className="block text-sm font-medium text-neutral-700">Specify University</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      id="otherUniversity"
                      name="otherUniversity"
                      required
                      value={formData.otherUniversity}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors"
                      placeholder="Enter your university"
                    />
                  </div>
                </div>
              )}

              {/* LinkedIn URL */}
              <div className="sm:col-span-2">
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-neutral-700">LinkedIn Profile Link</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link2 className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    required
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              {/* Product Hunt URL */}
              <div className="sm:col-span-2">
                <label htmlFor="productHuntUrl" className="block text-sm font-medium text-neutral-700">Product Hunt Profile Link</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link2 className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="url"
                    id="productHuntUrl"
                    name="productHuntUrl"
                    required
                    value={formData.productHuntUrl}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors"
                    placeholder="https://www.producthunt.com/@username"
                  />
                </div>
              </div>



              {/* T-Shirt Size */}
              <div className="sm:col-span-2">
                <label htmlFor="tshirtSize" className="block text-sm font-medium text-neutral-700">T-Shirt Size</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shirt className="h-5 w-5 text-neutral-400" />
                  </div>
                  <select
                    id="tshirtSize"
                    name="tshirtSize"
                    required
                    value={formData.tshirtSize}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-xl focus:ring-[#7c5cff] focus:border-[#7c5cff] sm:text-sm bg-white/50 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select a size</option>
                    <option value="XS">Extra Small (XS)</option>
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                    <option value="XXL">Double Extra Large (XXL)</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-[#7c5cff]/30 text-sm font-semibold text-white bg-gradient-to-r from-[#7c5cff] to-[#19e6ff] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c5cff] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
