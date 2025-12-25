import React from 'react';
import { Search, MapPin, Calendar, Phone, Settings } from 'lucide-react';
import Link from 'next/link';

export default function TraceWorksLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="text-orange-500 text-2xl font-bold">T</div>
              <span className="ml-1 text-gray-800 font-semibold">TRACEWORKS</span>
              <span className="ml-2 text-xs text-gray-500">JOBS</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="#services" className="text-gray-600 hover:text-gray-900">Services</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/users/login">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Login
                </button>
              </Link>
              <Link href="/users/register">
                <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
                  Register as Professional
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FAD0B1] to-[#BDB6F8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect
                <br />
                <span className="text-yellow-300">Professional</span>
              </h1>
              <p className="text-gray-700 mb-8">
                Search from a wide range of professional services.
                <br />
                Effortlessly connect with the best experts and
                <br />
                easily book the services you need.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop" 
                  alt="Professional"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400&h=300&fit=crop" 
                  alt="Photographer"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg -mt-4 col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=200&fit=crop" 
                  alt="Professional at work"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <div className="flex-1 flex items-center border-r border-gray-300 pr-4">
              <Search className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Search for Service"
                className="w-full outline-none"
              />
            </div>
            <div className="flex-1 flex items-center pr-4">
              <MapPin className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Location"
                className="w-full outline-none"
              />
            </div>
            <button className="bg-gray-900 text-white px-8 py-2 rounded hover:bg-gray-800">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14">
            Find Professionals by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Photographer */}
            <Link href="/users/register?category=photographer">
              <div className="relative bg-orange-500 rounded-2xl p-6 text-white overflow-hidden aspect-[4/3]
                              cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <h3 className="text-xl font-bold mb-3">Photographer</h3>
                <p className="text-sm max-w-[70%] leading-relaxed">
                  Hire skilled photographers to capture special moments and create stunning visuals.
                </p>
                <img
                  src="/images/photographer.png"
                  alt="Photographer"
                  className="absolute bottom-0 right-0 w-28 md:w-32 object-contain"
                />
              </div>
            </Link>

            {/* Makeup Artist */}
            <Link href="/users/register?category=makeup">
              <div className="relative bg-gray-900 rounded-2xl p-6 text-white overflow-hidden aspect-[4/3]
                              cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <h3 className="text-xl font-bold mb-3">Makeup Artist</h3>
                <p className="text-sm max-w-[70%] leading-relaxed">
                  Discover talented makeup artists for weddings, events, and special occasions.
                </p>
                <img
                  src="/images/artist.png"
                  alt="Makeup Artist"
                  className="absolute bottom-0 right-0 w-28 md:w-32 object-contain"
                />
              </div>
            </Link>

            {/* Developer */}
            <Link href="/users/register?category=developer">
              <div className="relative bg-gray-900 rounded-2xl p-6 text-white overflow-hidden aspect-[4/3]
                              cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <h3 className="text-xl font-bold mb-3">Developer</h3>
                <p className="text-sm max-w-[70%] leading-relaxed">
                  Skilled developers who turn ideas into powerful web and mobile applications.
                </p>
                <img
                  src="/images/tutor.png"
                  alt="Developer"
                  className="absolute bottom-0 right-0 w-28 md:w-32 object-contain"
                />
              </div>
            </Link>

            {/* Tutor */}
            <Link href="/users/register?category=tutor">
              <div className="relative bg-yellow-400 rounded-2xl p-6 text-gray-900 overflow-hidden aspect-[4/3]
                              cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <h3 className="text-xl font-bold mb-3">Tutor</h3>
                <p className="text-sm max-w-[70%] leading-relaxed">
                  Learn from qualified tutors with personalized guidance and academic support.
                </p>
                <img
                  src="/images/study.png"
                  alt="Tutor"
                  className="absolute bottom-0 right-0 w-28 md:w-32 object-contain"
                />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="text-yellow-600" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Find Services</h3>
                <p className="text-gray-600 text-sm">
                  Discover a wide range of services offered by local professionals such as photographers, tutors, makeup artists, and developers.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="text-blue-600" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Contact</h3>
                <p className="text-gray-600 text-sm">
                  Our skilled professionals will reach out to you directly and provide personalized assistance.
                </p>
              </div>
            </div>

            {/* CENTER COLUMN */}
            <div className="bg-blue-200 rounded-2xl px-8 py-10 text-center shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                How it Works?
              </h3>
              <img
                src="/images/howITWorks.png"
                alt="How it works"
                className="mx-auto w-full max-w-xs object-cover"
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="text-pink-600" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Book Service</h3>
                <p className="text-gray-600 text-sm">
                  Easily book services through our platform by providing your requirements and schedule.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="text-purple-600" size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Service</h3>
                <p className="text-gray-600 text-sm">
                  Our experienced professionals deliver quality service with complete satisfaction.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-orange-500 text-2xl font-bold">T</div>
                <span className="ml-1 text-gray-800 font-semibold">TRACEWORKS</span>
              </div>
              <span className="text-xs text-gray-500">JOBS</span>
            </div>

            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">About Us</Link></li>
                <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Jobs</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Companies</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Report Issue</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Privacy Policy</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Fraud Alert</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}