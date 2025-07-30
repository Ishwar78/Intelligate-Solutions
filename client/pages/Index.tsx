import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Users,
  Target,
  Briefcase,
  GraduationCap,
  Users2,
  Search,
  Building,
  Car,
  Cpu,
  Zap,
  Pill,
  Home,
  Truck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceDropdown from "@/components/ServiceDropdown";

interface Job {
  _id: string;
  title: string;
  location: string;
  experience: string;
  industry: string;
  salary: string;
  type: string;
  description: string;
  skills: string[];
  postedDate: Date;
  status: string;
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [latestJobs, setLatestJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const location = useLocation();

  // Fetch latest jobs
  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        setLoadingJobs(true);
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const jobs = await response.json();
          setLatestJobs(jobs.slice(0, 3)); // Get only first 3 jobs
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchLatestJobs();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-blue-900 to-red-600 rounded-lg sm:rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2Fffd6997b070949e7808ca68d4da19889?format=webp&width=800"
                    alt="Intelligate Solutions Logo"
                    className="h-6 w-6 sm:h-8 sm:w-8 filter brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-blue-900 leading-tight">Intelligate Solutions</span>
                  <span className="text-xs text-red-600 font-medium tracking-wider hidden sm:block">A GATEWAY OF INTELLIGENCE</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link to="/" className="text-gray-900 hover:text-blue-900 font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">About Us</Link>
       <ServiceDropdown currentPath={location.pathname} />
              <Link to="/industries" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Industries</Link>
              <Link to="/openings" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Current Openings</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Contact</Link>
              <Link to="/get-quote" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">Get Quote</Link>
            </nav>

            <div className="flex items-center gap-2">
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919971019767"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">WA</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/"
                className="text-gray-900 hover:bg-gray-50 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
           <div className="px-3 py-2">
            <ServiceDropdown currentPath={location.pathname}  />
          </div>
          
              <Link
                to="/industries"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link
                to="/openings"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Current Openings
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/get-quote"
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background Slider */}
        <div className="absolute inset-0">
          <div className="hero-slider">
            <div className="slide active" style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F4c544a153f3d4f8ab328d65415496f5b?format=webp&width=800')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="slide" style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F0e6778a20c8e4b48b262fa9e73efbb9f?format=webp&width=800')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="slide" style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F372fb98f4f87457bbfd8ce4b3897fdc5?format=webp&width=800')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="slide" style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F11d318c7b167432fbdae06924a6b4c36?format=webp&width=800')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}></div>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="particles">
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="hero-content">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-white">
              A Gateway of <span className="font-black tracking-wider">INTELLIGENCE</span>
            </h1>
            <div className="animate-fade-in-up animation-delay-600 opacity-0">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xl px-16 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Explore Opportunities
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 animate-on-scroll">Who We Are</h2>
            <div className="max-w-6xl mx-auto">
              <div className="text-left space-y-6 mb-8">
                <p className="text-lg text-gray-700">
                  Intelligate Solutions is established for imparting Manpower Recruitment to Automotive, Engineering & IT sector on Pan India basis. We are emerging as the leading recruitment brand nationally for our clients.
                </p>
                <p className="text-lg text-gray-700">
                  We are in the business of effectively understanding manpower requirements, procuring the candidate with the desired profile and building trusting relationships. With our industry expertise, we understand that company's today require more than a skilled candidate; they reach for employees who are productive, exhibit a positive attitude and have the ability to become a member of their team.
                </p>
                <p className="text-lg text-gray-700">
                  Apart from traditional practices to source candidates, we also incorporate innovative means to procure right professionals. Our experts leverage the power of technology-based recruitment and focus on online media to make sure that our clients receive the most suitable candidates for their organization.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">About Intelligate Solutions</h3>
                <div className="text-left space-y-4">
                  <p className="text-lg text-gray-700">
                    Intelligate Solution is a Leading HR consulting company with persistent zeal to provide best effective recruitment solutions. Intelligate Solutions was founded in 2015. Over the years, we have established ourselves as a recognized recruitment brand. We are the preferred recruitment partners for clients and a trusted consultant for professionals at Pan India Basis.
                  </p>
                  <p className="text-lg text-gray-700">
                    Intelligate Solutions's roots in consultancy enable us to bring a unique approach to recruitment. Our focus has been on Middle and Senior Management talent needs. We recruit across various industry segments for multinational corporations as well as leading business houses.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-8 flex-wrap">
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  60+ man-years of industry experience
                </Badge>
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  PAN India Presence
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Companies Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h2>
            <p className="text-gray-600">We've partnered with industry leaders across various sectors</p>
          </div>

          <div className="relative">
            <div className="company-logos-scroll">
              <div className="logos-track">
                {/* First set of logos */}
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F3147192c09b1498fb93a5289f7331cd1?format=webp&width=800"
                      alt="Microsoft"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2Fc4138b6ff6ad4611a9475d2f9ecdbbd2?format=webp&width=800"
                      alt="Amazon"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F2c1c179adb234c59816708fb2511a28a?format=webp&width=800"
                      alt="Wipro"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F3d0834c19c214e4d83f4f07e764a4d50?format=webp&width=800"
                      alt="Infosys"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F9224fe37852c4b76bc0445734abb8e29?format=webp&width=800"
                      alt="Flipkart"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F9e98d473820645ddba3bb0f9224632bc?format=webp&width=800"
                      alt="Intel"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F3883c53df66044c4b0b334540010fa14?format=webp&width=800"
                      alt="Maruti Suzuki"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F3147192c09b1498fb93a5289f7331cd1?format=webp&width=800"
                      alt="Microsoft"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2Fc4138b6ff6ad4611a9475d2f9ecdbbd2?format=webp&width=800"
                      alt="Amazon"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F2c1c179adb234c59816708fb2511a28a?format=webp&width=800"
                      alt="Wipro"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F3d0834c19c214e4d83f4f07e764a4d50?format=webp&width=800"
                      alt="Infosys"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F9224fe37852c4b76bc0445734abb8e29?format=webp&width=800"
                      alt="Flipkart"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F9e98d473820645ddba3bb0f9224632bc?format=webp&width=800"
                      alt="Intel"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
                <div className="logo-item">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F006b1d80f49744f8a88951a12aeaff7a%2F3883c53df66044c4b0b334540010fa14?format=webp&width=800"
                      alt="Maruti Suzuki"
                      className="h-12 w-auto mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Goal</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                "Our Goal is to create a perfect match between our clients and the candidates by understanding and pairing their needs and strengths…."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Strength Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Strength</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                Excellent networking, in depth knowledge of the Automobile industry and expertise in understanding the various requirements of the different verticals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Core Services</h2>

            <div className="max-w-5xl mx-auto mb-12">
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "Hide not your talents. They for use were made. What's a sundial in the shade?"
                <footer className="text-lg font-medium text-gray-900 mt-2">— Benjamin Franklin</footer>
              </blockquote>

              <div className="bg-white p-8 rounded-lg shadow-sm text-left">
                <p className="text-lg text-gray-700 mb-4">
                  Every single person who walks into the doors of Intelli-gate is a possible recruit. What requires is careful counselling and identification of area of interest. At Intelli-gate, we offer our services to help organizations and job seekers to find each other.
                </p>
                <p className="text-lg text-gray-700">
                  We believe in continuous learning with great sense of responsibility and team bonding. So if you are interested to take up new challenges with continuous growth, we are here to help you!
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Service Descriptions */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg animate-on-scroll card-hover">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  A deserving candidate can only be identified when recruiter has got in depth knowledge of the industry as well as the domain. A careful study of JD along with respective stake holder is the key for successful identification of the resource. We have got more than 25 man-years of experience in the field of Automobile industry which gives us edge over all the others.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg animate-on-scroll card-hover">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We have tied up with several professional and non-professional colleges in Dehra Dun, Lucknow, Rohtak and Kanpur region which can cater the demand of most competent staffing. Training sessions are executed in such a manner that students identify their interests and skills and strive for a carrier of their choice.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg animate-on-scroll">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Placement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Every candidate at Intelli-gate is carefully filtered by our executives by assessment of their talent and skills. We being in the industry for 25 years have comprehensive knowledge of its pain areas. Therefore every talent is judged in all spreads and after full satisfaction only a suitable candidate is brought into the notice of Employer.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Strategic Leadership Hiring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Executive Search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Diversity Sourcing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Lateral Hiring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Bulk Hiring</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="professional-card animate-on-scroll">
              <CardHeader>
                <Search className="h-12 w-12 text-blue-900 mb-4 float-animation" />
                <CardTitle>Executive Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Premium talent acquisition for senior leadership positions</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Strategic Leadership Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>C-suite and director-level recruitment solutions</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Lateral & Bulk Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Volume recruitment for operational excellence</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Campus Placements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Fresh talent sourcing from premier institutions</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Industry Training Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Skill development and capability enhancement</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users2 className="h-12 w-12 text-blue-900 mb-4" />
                <CardTitle>Diversity Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Building inclusive and diverse teams</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Industries We Specialize In</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Cpu className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">ITES & BPO</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Car className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Automotive</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Building className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Engineering & Manufacturing</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Electrical & Electronics</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Energy</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Pill className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Pharmaceuticals</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Home className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Real Estate</h3>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Truck className="h-16 w-16 text-blue-900 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">Tyre Industry</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Intelligate?</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">More than 60 man years of experience in the field of Automobile, Pharmaceuticals, FMCG, ITES and BPO industry.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">Completely aware of the pain areas of the industry (bottle neck, hiring quality etc.)</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">Excellent in Mapping, Headhunting and Referencing Skills.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">Rich experience to find passive job seeker.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">We believe in working towards reducing clutter and streamlining the manpower requirements of Companies.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">We try to find out the right people, at the right time, well before the commencement of training batches and at the right price because we understand that today companies require not only skilled candidate but at the same time productive, exhibit a positive attitude and a team player.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <blockquote className="text-xl italic text-red-600 font-medium">
                "Whoever wants to reach a distant goal must take small steps."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Process Parameter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process Parameters</h2>
            <p className="text-lg text-gray-600">Ensuring efficiency, quality, and performance at every step of hiring.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Funnel Visualization */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Funnel Structure */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Top - Qualified */}
                  <div className="bg-green-100 text-green-800 px-8 py-3 rounded-full font-semibold text-lg">
                    QUALIFIED
                  </div>

                  {/* Funnel Shape */}
                  <div className="relative">
                    <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
                      <path
                        d="M 20 0 L 180 0 L 120 80 L 80 80 Z"
                        fill="#f3f4f6"
                        stroke="#d1d5db"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Process Parameter Box */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-center shadow-lg">
                        PROCESS<br />PARAMETER
                      </div>
                    </div>
                  </div>

                  {/* Bottom - Professional */}
                  <div className="bg-red-100 text-red-800 px-8 py-3 rounded-full font-semibold text-lg">
                    PROFESSIONAL
                  </div>
                </div>
              </div>
            </div>

            {/* Parameter Boxes */}
            <div className="flex flex-col space-y-4 w-full max-w-xs">
              <div className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-center font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                Quality
              </div>
              <div className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-center font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                Cost
              </div>
              <div className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-center font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                Quantity
              </div>
              <div className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-center font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                Cycle Time
              </div>
              <div className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-center font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                Continual Process
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <p className="text-lg text-gray-700 mb-6">
                We have a team of multifaceted consultants who are highly experienced and specialize in industry sector that they serve. Our experienced professionals strictly follow the tradition of keeping track of the changing needs of the clients so as to ensure maximum satisfaction, in this area of ever changing scenario.
              </p>

              <p className="text-lg text-gray-700 mb-6">
                Our team do all the preliminary screening. We contact and interview candidates regarding their interest and suitability. Only after we are satisfied we send them to you for an interview.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Team Qualifications</h3>
                  <p className="text-gray-700">
                    Our entire faculty is either MBA or B-tech in their respective field.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Professional Approach</h3>
                  <p className="text-gray-700">
                    Experienced and highly qualified team of consultants with professional approach make up the ever competitive team of Intelli-gate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Vision</h2>
            <div className="max-w-5xl mx-auto">
              <p className="text-xl mb-8 leading-relaxed">
                Intelligate Solutions vision is multifaceted, generally aiming to be the preferred partner for both employers and job seekers, facilitating successful career paths and talent acquisition. We are committed to serve the society by adding value to the customers, team members and the community at large in terms of:
              </p>

              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4">Customer Excellence</h3>
                  <p className="text-blue-100">
                    Providing customer delight, offering reliable services.
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4">Employee Growth</h3>
                  <p className="text-blue-100">
                    Providing an environment, conducive to the development, growth and satisfaction of employees while fulfilling their aspirations.
                  </p>
                </div>

                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4">Social Responsibility</h3>
                  <p className="text-blue-100">
                    Contributing to the well being of the society and conducting ourselves as a responsible corporate citizen, known for integrity and ethics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Explore Current Openings</h2>
            <p className="text-lg text-gray-600">
              {loadingJobs ? 'Loading latest opportunities...' : `${latestJobs.length} positions available across leading companies`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {loadingJobs ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))
            ) : latestJobs.length > 0 ? (
              // Real job data
              latestJobs.map((job) => (
                <Card key={job._id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.industry} • {job.location} • {job.experience}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="secondary" className="text-xs">₹{job.salary}</Badge>
                      <Badge variant="outline" className="text-xs">{job.type}</Badge>
                    </div>
                    <Link to="/openings">
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              // No jobs available
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No current openings available. Please check back later.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/openings">
              <Button variant="outline" size="lg">View All Openings</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Connect With Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Rohtak (Regd. Office)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">155/29 Ram Gopal Colony, Delhi Road</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Noida (Corporate Office)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">D-80, Sector 2</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:akhil.kaushik@intelligatesolution.com" className="flex items-center gap-2 text-blue-900 hover:text-blue-700">
                <Mail className="h-5 w-5" />
                akhil.kaushik@intelligatesolution.com
              </a>
              <a href="mailto:admin@intelligatesolution.com" className="flex items-center gap-2 text-blue-900 hover:text-blue-700">
                <Mail className="h-5 w-5" />
                admin@intelligatesolution.com
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="tel:9650923366" className="flex items-center gap-2 text-blue-900 hover:text-blue-700">
                <Phone className="h-5 w-5" />
                9650923366
              </a>
              <a href="tel:9971019767" className="flex items-center gap-2 text-blue-900 hover:text-blue-700">
                <Phone className="h-5 w-5" />
                9971019767
              </a>
            </div>
            
            <div className="pt-4">
              <a 
                href="https://wa.me/919971019767" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp: 9971019767
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">

            {/* Quick Links */}
            <div className="animate-on-scroll">
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <nav className="space-y-3">
                <Link to="/" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">Home</Link>
                <Link to="/about" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">Company Profile</Link>
                <Link to="/about" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">Life @ Intelligate</Link>
                <Link to="/" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">Disclaimer</Link>
                {/* <Link to="#" className="block text-gray-300 hover:text-orange-400 transition-colors text-sm">Site Map</Link> */}
              </nav>
            </div>

            {/* Enquiry Details */}
            <div className="animate-on-scroll">
              <h4 className="text-xl font-bold mb-6 text-white">Enquiry details</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-orange-400 font-semibold">Corporate enquiry:</span>
                  <a href="mailto:admin@intelligatesolution.com" className="block text-gray-300 hover:text-white transition-colors">
                   admin@intelligatesolution.com
                  </a>
                </div>
                <div>
                  <span className="text-orange-400 font-semibold">Corporate communication:</span>
                  <a href="mailto:akhil.kaushik@intelligatesolution.com" className="block text-gray-300 hover:text-white transition-colors">
                    akhil.kaushik@intelligatesolution.com
                  </a>
                </div>
                <div>
                  <span className="text-orange-400 font-semibold">Join Us:</span>
                  <a href="mailto:admin@intelligatesolution.com" className="block text-gray-300 hover:text-white transition-colors">
                    admin@intelligatesolution.com
                  </a>
                </div>
                <div>
                  <span className="text-orange-400 font-semibold">Opportunity with premium clients:</span>
                  <a href="mailto:akhil.kaushik@intelligatesolution.com" className="block text-gray-300 hover:text-white transition-colors">
                    akhil.kaushik@intelligatesolution.com
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="animate-on-scroll">
              <h4 className="text-xl font-bold mb-6 text-white">Contact us</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-orange-400 font-semibold block mb-1">Contact no:</span>
                  <a href="tel:+917042923666" className="text-gray-300 hover:text-white transition-colors">+91 9650923366/
+91 9971019767</a>
                </div>
                <div>
                  <span className="text-orange-400 font-semibold block mb-1">Address:</span>
                   <div>
                    <p className="font-medium">Noida Office :</p>
                    <p className="text-sm">   D-80, Sector 2</p>
                  </div>
                  <div>
                    <p className="font-medium">Rohtak Office :</p>
                    <p className="text-sm">155/29 Ram Gopal Colony, Delhi Road</p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <a
                    href="https://www.facebook.com/Intelligate.Solution/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  {/* <a
                    href="https://twitter.com/intelligatesolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a> */}
                  <a
                    href="https://www.linkedin.com/in/akhil-kaushik-7928471b?originalSubdomain=in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/919971019767"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </a>
                  {/* <a
                    href="https://instagram.com/intelligatesolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400">© Intelligate HR 2024 | All Rights Reserved</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919971019767" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
