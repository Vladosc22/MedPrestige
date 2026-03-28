import Link from "next/link";
import LogoIcon from "../../Icons/LogoIcon";
import LinkedInIcon from "../../Icons/LinkedInIcon";
import FacebookIcon from "../../Icons/FacebookIcon";
import TwitterXIcon from "../../Icons/TwitterXIcon";
import InstagramIcon from "../../Icons/InstagramIcon";
import "./Footer.css";

const socials = [
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter / X", href: "#", Icon: TwitterXIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <LogoIcon />
              MedPrestige
            </h3>
            <p className="footer-tagline">
              Advanced healthcare services made personal for every patient.
              Trusted by 16,800+ patients worldwide.
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} className="footer-social-link" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/doctors">Doctors</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Specialties</h4>
            <ul>
              <li><Link href="/services">Cardiology</Link></li>
              <li><Link href="/services">Radiology</Link></li>
              <li><Link href="/services">Gynecology</Link></li>
              <li><Link href="/services">Neurology</Link></li>
              <li><Link href="/services">Eye Care</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>info@medprestige.com</li>
              <li>+(690) 2560 0020</li>
              <li>4263 Wilkinson Street</li>
              <li>Tennessee, USA</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MedPrestige. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
