import { Github, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">IoT Health Monitor</h3>
            <p className="text-sm text-muted-foreground">
              Advanced patient monitoring system powered by ESP32, biomedical sensors, and cloud technologies.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Technologies</h3>
            <p className="text-sm text-muted-foreground mb-2">Built with:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• ESP32 Microcontrollers</li>
              <li>• MQTT & Node-RED</li>
              <li>• MySQL Database</li>
              <li>• React & TypeScript</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 IoT Health Monitoring System. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="mailto:contact@healthmonitor.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
