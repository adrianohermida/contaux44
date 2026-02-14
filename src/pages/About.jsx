import React, { useState } from 'react';
import { CheckCircle2, Play, Users, BarChart3 } from 'lucide-react';

const teamMembers = [
  { name: 'Dahlia Moore', role: 'Senior Manager' },
  { name: 'Jhone digo', role: 'Marketing' },
  { name: 'Zara tingo', role: 'Web Developer' },
  { name: 'David Zone', role: 'SEO Expert' },
];

const services = [
  { icon: '🔬', title: 'Discover, Explore the Product', desc: 'Discover, Explore & Understanding The Product' },
  { icon: '📋', title: 'Art Direction & Brand Strategy', desc: 'Art Direction & Brand Communication' },
  { icon: '💻', title: 'Product UX, Design & Development', desc: 'Digital Product UX, Design & Development' },
  { icon: '📊', title: 'Marketing Strategy & SEO Campaigns', desc: 'Marketing Strategy & SEO Campaigns' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-blue-100 mb-6">Business plan draws on a wide range of knowledge from different business disciplines.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-8">
                <span className="text-blue-600 font-semibold">What we do</span>
                <h2 className="text-4xl font-bold mt-2 mb-4">Websites that tell your brand's story</h2>
                <p className="text-gray-600">We're a digital product and UX agency Strategy, design and development across all platforms.</p>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                  {['content', 'strategy', 'development'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 font-semibold capitalize ${
                        activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === 'content' && (
                  <>
                    <p className="text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla. Nemo en ipsam voluptatem quia voluptas sit asper.</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Commitment to excellence</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Clients are our partners</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Fun is an absolute must</span>
                      </li>
                    </ul>
                  </>
                )}
                {activeTab === 'strategy' && (
                  <>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor incididunt ut labore et dolore. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <p className="text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla. Nemo en ipsam voluptatem quia voluptas sit asper.</p>
                  </>
                )}
                {activeTab === 'development' && (
                  <>
                    <p className="text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla. Nemo en ipsam voluptatem quia voluptas sit asper.</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Commitment to excellence</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Clients are our partners</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Fun is an absolute must</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/fc3eb6844_pf-single1.jpg"
                alt="Team working"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold">Care Features</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Provide Awesome Service With Our Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold">Meet our Creative Team</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Our Awesome Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => {
              const teamImages = [
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/8da421752_t1.jpg',
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/5e76acbb9_t2.jpg',
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/d9a30fbe5_t3.jpg',
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/77f17b817_t4.jpg'
              ];
              return (
                <div key={idx} className="text-center">
                  <img 
                    src={teamImages[idx]}
                    alt={member.name}
                    className="w-full rounded-lg mb-4"
                  />
                  <h4 className="font-bold text-lg">{member.name}</h4>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-blue-100 font-semibold">Create your own experience</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Ready to grow faster?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          
          <a 
            href="https://www.youtube.com/watch?v=r44RKWyfcFw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full hover:bg-blue-100 transition-colors"
          >
            <Play className="w-6 h-6 text-blue-600 ml-1" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h3>
              <p className="text-gray-600 mb-6">Registre-se e receba conteúdo exclusivo sobre contabilidade de empresas</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu endereço de e-mail"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Registre-se
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h4 className="text-2xl font-bold mb-3">Quer abrir sua empresa grátis?</h4>
              <p className="text-gray-600 mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Fale com um especialista
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}