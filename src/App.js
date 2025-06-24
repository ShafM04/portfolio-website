import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Mail, Linkedin, Github, X, Menu, ChevronsRight, Briefcase, BrainCircuit, Code, Cpu, Rocket } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Validating the 3D Inverse Problem in Stress Analysis",
    category: "MEng Dissertation",
    imageUrl: "https://i.imgur.com/ys8pNGN.jpg",
    summary: "A novel 'inverse problem' methodology to determine a material's internal stress field from measured strain data.",
    tools: ["Python", "COMSOL Multiphysics", "MATLAB", "PDE Formulation"],
    details: {
      headline: "Solving the Unsolvable: Validating the 3D Inverse Problem in Stress Analysis",
      description: "As the sole researcher for my final year dissertation, I was responsible for the entire project lifecycle.",
      challenges: [...],
      visuals: [
        "https://i.imgur.com/ys8pNGN.jpg",
        "https://i.imgur.com/1zW9ZaZ.jpg",
        "https://i.imgur.com/DTYyowV.jpg"
      ],
      outcome: "The inverse problem was successfully validated for a 3D structure under biaxial loading."
    }
  },
  {
    id: 2,
    title: "Interactive Humidity-Sensing Mechatronic System",
    category: "Group Design Project",
    imageUrl: "https://i.imgur.com/KcVxmim.jpg",
    summary: "A responsive system to inform passers-by of local humidity.",
    tools: ["Arduino (C++)", "SolidWorks", "Circuit Design", "Servo Motors", "Sensors"],
    details: {
      headline: "Mechatronic Marvel: An Interactive Humidity-Sensing Installation",
      description: "This group project involved the complete design, manufacture, and testing of a responsive system.",
      challenges: [...],
      visuals: [
        "https://i.imgur.com/LP6rsf5.jpg",
        "https://i.imgur.com/jG7AG6a.jpg",
        "https://i.imgur.com/KcVxmim.jpg"
      ],
      outcome: "I successfully delivered the complete mechatronic system."
    }
  },
  {
    id: 3,
    title: "Predictive Maintenance for Industrial Machinery",
    category: "Machine Learning Project",
    imageUrl: "https://placehold.co/1200x800/0f172a/94a3b8?text=Predictive+Maintenance",
    summary: "A machine learning model developed to predict industrial machine failure.",
    tools: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    details: {
      headline: "Proactive Failure Detection: A Predictive Maintenance Model",
      description: "This project aimed to reduce operational downtime and maintenance costs.",
      challenges: [...],
      visuals: [],
      outcome: "The final model successfully predicts various types of machine failure with high accuracy."
    }
  },
  {
    id: 4,
    title: "Keras House Price Prediction",
    category: "Deep Learning Project",
    imageUrl: "",
    summary: "A neural network model built using Keras and TensorFlow to predict house prices.",
    tools: ["Python", "Keras", "TensorFlow", "Pandas"],
    details: {
      headline: "Predicting House Prices Using Neural Networks",
      description: "This project implements a deep learning model to predict house prices using real-world data.",
      challenges: [
        {
          title: "Handling Diverse Data Types",
          text: "The dataset contained both numerical and categorical data.",
          solution: "Applied feature scaling, one-hot encoding, and used dropout regularisation."
        },
        {
          title: "Avoiding Overfitting",
          text: "Deep models tend to overfit small datasets.",
          solution: "Implemented dropout layers, early stopping, and validation splits."
        }
      ],
      visuals: [],
      outcome: "Achieved a test RMSE lower than baseline models."
    }
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    resume: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    const elements = Object.values(sectionRefs).map(ref => document.getElementById(ref.current)).filter(Boolean);
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [modalOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    sectionRefs.home.current = "home";
    sectionRefs.about.current = "about";
    sectionRefs.projects.current = "projects";
    sectionRefs.resume.current = "resume";
    sectionRefs.contact.current = "contact";
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans dark:bg-gray-900">
      <Header
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
        onMenuToggle={handleMenuToggle}
      />
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="fixed top-4 right-4 z-50 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <MobileNav
        isOpen={menuOpen}
        onLinkClick={handleLinkClick}
        onMenuToggle={handleMenuToggle}
      />
      <main>
        <HeroSection onLinkClick={handleLinkClick} />
        <AboutSection />
        <ProjectsSection onProjectClick={handleProjectClick} />
        <ResumeSection />
        <ContactSection />
      </main>
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      <footer className="bg-indigo-950 border-t border-gray-700/50 py-6">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Shafayat Mustafa. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
