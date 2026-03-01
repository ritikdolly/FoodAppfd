import { Code, Mail, Linkedin, Github, Globe } from "lucide-react";
import { WEBSITE_NAME } from "../../constants";
import { RevealSection } from "./RevealSection";

export const DeveloperSection = () => {
  return (
    <RevealSection
      className="max-w-4xl mx-auto px-4 py-20"
      direction="scale"
      delay={100}
    >
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-slate-100 to-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-widest">
          <Code className="w-3.5 h-3.5" />
          👨‍💻 Developed By
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Dev Photo */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 shadow-lg hover:scale-105 transition-transform duration-300">
            <img
              src="/developer.jpg"
              alt="Ritik Kumar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add(
                  "bg-gradient-to-br",
                  "from-slate-800",
                  "to-slate-900",
                  "flex",
                  "items-center",
                  "justify-center",
                );
                const icon = document.createElement("div");
                icon.innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
                e.target.parentElement.appendChild(icon);
              }}
            />
          </div>

          {/* Dev Info */}
          <div className="flex-1 text-center md:text-left stagger-children">
            <h3 className="text-2xl font-bold text-gray-900">Ritik Kumar</h3>
            <p className="text-[#FF4B2B] font-semibold text-sm mt-1">
              Full Stack Developer
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mt-4 max-w-lg">
              This application was designed and developed with a focus on
              security, scalability, and performance. Built with React, Spring
              Boot, and modern cloud-native practices to deliver a seamless
              dining experience.
            </p>

            {/* Contact & Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
              <a
                href="mailto:devwithritik200@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:scale-105 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/ritik-kumar-0a2728192/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 hover:bg-blue-100 hover:border-blue-300 hover:scale-105 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/ritikdolly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-sm text-white hover:bg-gray-800 hover:scale-105 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 hover:scale-105 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center md:justify-between gap-4 text-xs text-gray-400">
          <span>Version 1.0.0</span>
          <span>
            © {new Date().getFullYear()} {WEBSITE_NAME}
          </span>
          <span>Built with React + Spring Boot</span>
        </div>
      </div>
    </RevealSection>
  );
};
