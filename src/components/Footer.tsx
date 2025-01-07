import { Link } from "react-router-dom"
import { FaInstagram, FaLinkedin } from 'react-icons/fa';


interface SocialIconProps {
  href: string;
  icon: any;
}

const SocialIcon = ({ href, icon: Icon } : SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-gray-800 transition-colors"
  >
    <Icon className="w-6 h-6" />
  </a>
);

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-[#A2A3BB] py-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-white text-2xl font-serif">
            SEARCHOWL
          </Link>
          <div className="flex gap-4">
          <SocialIcon href="https://www.instagram.com/shopsorcea/" icon={FaInstagram} />
          <SocialIcon href="https://www.linkedin.com/company/searchowl-us/" icon={FaLinkedin} />
        </div>
      </div>
        <div className="flex justify-between text-sm text-navy/70">
          <div className="flex gap-4">
            <Link to="/disclaimer" className="text-white hover:text-black">DISCLAIMER</Link>
            <Link to="/terms" className="text-white hover:text-black">TERMS AND CONDITIONS</Link>
            <Link to="/privacy" className="text-white hover:text-black">PRIVACY POLICY</Link>
            <Link to="/contact" className="text-white hover:text-black">CONTACT</Link>
            <Link to="https://sorcea.com" className="text-white hover:text-black">SORCEA</Link>
          </div>
          <p className="text-white">SearchOwl © 2025</p>
        </div>
      </div>
    </footer>
  )
}