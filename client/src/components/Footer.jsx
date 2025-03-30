import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Description */}
          <div>
            <h3 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">BudhiMax</h3>
            <p className="text-gray-400 mt-4">
              Learn smarter, not harder! We use cognitive science techniques to enhance your learning experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-blue-400 transition">Dashboard</Link></li>
              <li><Link to="/flashcards" className="text-gray-400 hover:text-blue-400 transition">Flashcards</Link></li>
              <li><Link to="/mind-map" className="text-gray-400 hover:text-blue-400 transition">Mind Mapping</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-400">
              Questions? Reach us at <a 
                href="mailto:support@BudhiMax.com" 
                className="text-blue-400 hover:text-white transition duration-300 hover:underline"
              >
                support@BudhiMax.com
              </a>
            </p>

            {/* Social Media Icons Below Contact */}
            <div className="flex justify-start mt-6 space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BudhiMax. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with ❤️ by <span className="text-blue-400 font-semibold">Rehan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
