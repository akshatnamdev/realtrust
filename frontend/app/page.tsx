import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Clients />
      <Newsletter />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">RealTrust</h3>
              <p className="text-gray-400">
                Your trusted partner in consultation, design, and marketing excellence.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Portfolio</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@realtrust.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Business Ave, Suite 100</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RealTrust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}