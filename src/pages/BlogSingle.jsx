import React, { useState } from 'react';
import { Calendar, MessageCircle, Eye, Twitter, Facebook, Instagram } from 'lucide-react';

export default function BlogSingle() {
  const [comments, setComments] = useState([
    { id: 1, author: 'Rosalina Kelian', date: '19th May 2023', text: 'Donec aliquam ex ut odio dictum, ut consequat leo interdum. Aenean nunc ipsum, blandit eu enim sed.' },
    { id: 2, author: 'Arista Williamson', date: '15th May 2023', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.', isReply: true },
    { id: 3, author: 'Arista Williamson', date: '12th May 2023', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Image */}
      <section 
        className="bg-cover bg-center text-white py-24 relative"
        style={{backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/533400192_blog-1.jpg)'}}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">A importância das certidões negativas para sua regularidade jurídica.</h1>
          <p className="text-blue-100 mb-6">Conheça a importância das certidões negativas e como elas afetam sua regularidade.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <a href="/Blog" className="hover:underline">Blog</a>
            <span>/</span>
            <span>Blog Single</span>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Post Header */}
          <div className="mb-12">
            <img src="https://via.placeholder.com/1000x600" alt="Post" className="w-full rounded-lg mb-6" />
            <div className="flex items-center gap-3 mb-6">
              <img src="https://i.pravatar.cc/50?img=1" alt="Author" className="w-10 h-10 rounded-full" />
              <span className="text-gray-600">BY TIM NORTON</span>
            </div>
          </div>

          {/* Post Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">Start & Run a Successful Web Design Business in 2020</h2>
              <div className="flex gap-6 text-sm text-gray-600 mb-6">
                <a href="#" className="flex items-center gap-2 hover:text-blue-600"><Calendar className="w-4 h-4" /> 20th March 2023</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600"><MessageCircle className="w-4 h-4" /> 35 Comments</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600"><Eye className="w-4 h-4" /> 55 Views</a>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <img src="https://via.placeholder.com/600x800" alt="Post image" className="rounded-lg" />
              <div className="space-y-4">
                <img src="https://via.placeholder.com/600x400" alt="Post image" className="rounded-lg" />
                <img src="https://via.placeholder.com/600x400" alt="Post image" className="rounded-lg" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">A cleansing hot shower or bath</h3>
              <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </div>

            <blockquote className="border-l-4 border-blue-600 pl-6 py-4 bg-gray-50 rounded">
              <p className="text-xl text-gray-700 italic mb-2">"Don't demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well."</p>
              <p className="text-gray-600">Epictetus, The Enchiridion</p>
            </blockquote>

            <div>
              <h3 className="text-2xl font-bold mb-4">Setting the mood with incense</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Remove aversion, then, from all things that are not in our control, and transfer it to things contrary to the nature of what is in our control.</p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> The happiness of your life depends upon the quality of your thoughts</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> You have power over your mind, not outside events</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">✓</span> The things you think about determine the quality of your mind</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            {/* Tags & Share */}
            <div className="grid md:grid-cols-2 gap-8 py-8 border-t border-b border-gray-200">
              <div>
                <h5 className="font-bold mb-3">Related Tags</h5>
                <div className="flex flex-wrap gap-2">
                  {['Popular', 'Design', 'UX'].map((tag, idx) => (
                    <a key={idx} href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-blue-600 hover:text-white transition-colors">{tag}</a>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold mb-3">Social Share</h5>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"><Twitter className="w-5 h-5" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"><Facebook className="w-5 h-5" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"><Instagram className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Post comments ({comments.length})</h3>
              <div className="space-y-6 mb-8">
                {comments.map(comment => (
                  <div key={comment.id} className={`${comment.isReply ? 'ml-8' : ''}`}>
                    <div className="flex gap-4">
                      <img src={`https://i.pravatar.cc/50?img=${comment.id}`} alt={comment.author} className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h6 className="font-bold">{comment.author}</h6>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{comment.text}</p>
                        <a href="#" className="text-xs text-blue-600 hover:underline mt-2 inline-block">Reply</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Leave a comment</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input type="email" placeholder="Your Email" className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <input type="text" placeholder="Your Subject" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <textarea rows="6" placeholder="Your Comments" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Post Comment</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h3>
              <p className="text-gray-600 mb-6">Registre-se e receba conteúdo exclusivo</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Seu endereço de e-mail" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Registre-se</button>
              </form>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h4 className="text-2xl font-bold mb-3">Quer abrir sua empresa grátis?</h4>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Fale com um especialista</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}