import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Mail, Linkedin, Github, X, Menu, ChevronsRight, Briefcase, BrainCircuit, Code, Cpu, Rocket } from 'lucide-react';

// --- Project Data ---
const projects = [
  {
    id: 1,
    title: "Validating the 3D Inverse Problem in Stress Analysis",
    category: "MEng Dissertation",
    imageUrl: "https://i.imgur.com/ys8pNGN.jpg",
    summary: "A novel 'inverse problem' methodology to determine a material's internal stress field from measured strain data, a critical challenge where material properties are unknown.",
    tools: ["Python", "COMSOL Multiphysics", "MATLAB", "PDE Formulation"],
    details: {
      headline: "Solving the Unsolvable: Validating the 3D Inverse Problem in Stress Analysis",
      description: "As the sole researcher for my final year dissertation, I was responsible for the entire project lifecycle, from theoretical development and algorithm creation to simulation and final analysis. The goal was to overcome a fundamental limitation in traditional Finite Element Analysis (FEA).",
      challenges: [
        {
          title: "3D Computational Complexity",
          text: "The primary challenge was extending the existing 2D inverse problem methodology to a 3D space. This introduced significant computational complexity and a high risk of eigenvector misalignment, which would invalidate the results.",
          solution: "I developed a sophisticated data processing algorithm in Python using a Breadth-First Search (BFS) traversal method. This systematically ensured eigenvector directional consistency across the entire 3D grid, a crucial step for accurate stress calculation."
        },
        {
          title: "Mathematical & PDE Formulation",
          text: "A key hurdle was formulating the governing equations and boundary conditions to solve for the unknown stress field based on known strain directions.",
          solution: "I successfully formulated and implemented a system of Partial Differential Equations (PDEs) within the COMSOL Multiphysics 'Wave Form PDE' interface. This involved defining custom flux terms that linked the unknown stress variable to the known eigenvector field derived from the processed strain data."
        }
      ],
      visuals: [
        "https://i.imgur.com/ys8pNGN.jpg",
        "https://i.imgur.com/1zW9ZaZ.jpg",
        "https://i.imgur.com/DTYyowV.jpg"
      ],
      outcome: "The inverse problem was successfully validated for a 3D structure under biaxial loading, demonstrating exceptional accuracy (<0.5% uncertainty for most stress components). The project also identified a key limitation regarding unconstrained axes, showcasing a deep understanding of the model's practical constraints. I concluded by proposing future work involving machine learning integration to further optimise the process."
    }
  },
  {
    id: 2,
    title: "Interactive Humidity-Sensing Mechatronic System",
    category: "Group Design Project",
    imageUrl: "https://i.imgur.com/KcVxmim.jpg",
    summary: "A responsive system to inform passers-by of local humidity. My role focused on all electronics, Arduino programming, and the CAD design of the humidity dial.",
    tools: ["Arduino (C++)", "SolidWorks", "Circuit Design", "Servo Motors", "Sensors"],
    details: {
      headline: "Mechatronic Marvel: An Interactive Humidity-Sensing Installation",
      description: "This group project involved the complete design, manufacture, and testing of a responsive system. My core responsibility was the mechatronic system: I designed, wired, and programmed all electronic subsystems, including the sensors, Arduino microcontrollers, and servo motors.",
      challenges: [
        {
          title: "Unreliable Motor Control",
          text: "The initial design used a single ultrasonic sensor to control two spinning poles. However, testing revealed that one Arduino could not reliably provide input signals to two separate servo circuits simultaneously.",
          solution: "I re-engineered the electronics into three modular subsystems: one for the humidity dial and two for the spinning poles, each with a dedicated Arduino and sensor. This decoupling created a robust and reliable system, solving the synchronization and signal integrity issues."
        },
        {
          title: "Insufficient Power Supply",
          text: "During prototyping, the servo motors performed inconsistently. I diagnosed that the 9V batteries could not consistently supply enough current to the Arduino boards and motors.",
          solution: "Through systematic testing of various power configurations, I confirmed the power deficit as a primary constraint. This analysis was vital for the project's reflection, highlighting the need for a more stable, independent power solution in future developments and demonstrating my ability to diagnose issues at the hardware level."
        }
      ],
      visuals: [
        "https://i.imgur.com/LP6rsf5.jpg",
        "https://i.imgur.com/jG7AG6a.jpg",
        "https://i.imgur.com/KcVxmim.jpg"
      ],
      outcome: "I successfully delivered the complete mechatronic system, enabling our final product to function as intended. The project was a valuable hands-on experience in system integration, the practicalities of power management in embedded systems, and the importance of iterative design based on physical testing results."
    }
  },
  {
    id: 3,
    title: "Predictive Maintenance for Industrial Machinery",
    category: "Machine Learning Project",
    imageUrl: "https://placehold.co/1200x800/0f172a/94a3b8?text=Predictive+Maintenance",
    summary: "A machine learning model developed to predict industrial machine failure based on real-time sensor data, enabling proactive maintenance scheduling.",
    tools: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    details: {
      headline: "Proactive Failure Detection: A Predictive Maintenance Model",
      description: "This project aimed to reduce operational downtime and maintenance costs by building a machine learning model capable of predicting equipment failure before it occurs. Using a dataset of industrial sensor readings, I developed a classifier to identify potential tool failures.",
      challenges: [
        {
          title: "Data Interpretation & Feature Engineering",
          text: "The primary challenge was interpreting the raw sensor data and identifying which metrics were most indicative of an impending failure. Raw data alone was not sufficient for a highly accurate model.",
          solution: "I performed extensive Exploratory Data Analysis (EDA) using Pandas, Matplotlib, and Seaborn to visualize correlations between sensor readings and failure events. This led to the selection of key features like tool wear, torque, and temperature variations as strong predictors."
        },
        {
          title: "Model Selection & Evaluation",
          text: "Choosing the right classification algorithm was critical for achieving high predictive accuracy and avoiding false alarms, which can be costly in an industrial setting.",
          solution: "I trained and evaluated several classification models, including Logistic Regression, Random Forest, and Gradient Boosting. By comparing metrics such as accuracy, precision, and recall, I determined that the Random Forest classifier offered the best balance of performance for this specific problem."
        }
      ],
      visuals: [
        "https://placehold.co/800x600/0f172a/94a3b8?text=Confusion+Matrix",
        "https://placehold.co/800x600/0f172a/94a3b8?text=Feature+Importance",
        "https://placehold.co/800x600/0f172a/94a3b8?text=Data+Visualization"
      ],
      outcome: "The final model successfully predicts various types of machine failure with high accuracy. This provides a valuable tool for industrial maintenance planning, allowing for a shift from reactive repairs to a proactive, data-driven maintenance strategy."
    }
  }
];

const skills = [
  { name: "FEA & Simulation", icon: BrainCircuit, description: "COMSOL, ANSYS" },
  { name: "CAD & Manufacturing", icon: Briefcase, description: "SolidWorks, AutoCAD, Prototyping" },
  { name: "Programming", icon: Code, description: "Python (NumPy), Arduino (C++)" },
  { name: "Electronics", icon: Cpu, description: "Circuit Design, Sensor Integration" },
  { name: "Data Analysis", icon: ChevronsRight, description: "Numerical Modelling, MATLAB" },
  { name: "Project Management", icon: Rocket, description: "Critical Path, Gantt Charts" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

// --- Reusable Components ---
const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
      initial="hidden"
      animate={controls}
      className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col justify-center"
    >
      {children}
    </motion.section>
  );
};

// --- Header Component ---
const Header = ({ activeSection, onLinkClick, onMenuToggle }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#111827]/80 backdrop-blur-sm shadow-lg border-b border-gray-700/50' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <a href="#home" onClick={(e) => onLinkClick(e, '#home')} className="text-xl font-bold text-white tracking-wider">
              Shafayat Mustafa
            </a>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => onLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-300 ${activeSection === link.href.substring(1) ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={onMenuToggle} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Mobile Navigation ---
const MobileNav = ({ isOpen, onLinkClick, onMenuToggle }) => {
  return (
     <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm z-50 md:hidden border-l border-gray-700/50"
            >
                <div className="flex justify-end p-5">
                    <button onClick={onMenuToggle} className="text-white">
                        <X size={28} />
                    </button>
                </div>
                <nav className="flex flex-col items-center space-y-8 mt-10">
                    {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => { onLinkClick(e, link.href); onMenuToggle(); }}
                        className="text-lg text-gray-200 hover:text-cyan-400"
                    >
                        {link.name}
                    </a>
                    ))}
                </nav>
            </motion.div>
        )}
    </AnimatePresence>
  );
}

// --- Animated Title Component ---
const AnimatedTitle = ({ text }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.h1
      className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={item} style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};


// --- Hero Section ---
const HeroSection = ({ onLinkClick }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/graphy.png)'}}></div>
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{backgroundImage: `url(https://i.imgur.com/DTzLRi9.gif)`}}></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900 via-transparent to-gray-900"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-20 relative"
      >
        <AnimatedTitle text="Shafayat Mustafa" />
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Final Year MEng Mechanical Engineering Student | Specialising in Computational Mechanics & Mechatronic Systems
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#projects" onClick={(e) => onLinkClick(e, '#projects')} className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-transform duration-300 hover:scale-105 shadow-lg">
            View My Projects
          </a>
          <a href="https://drive.google.com/file/d/1ibd-7ItlAfNufxtluoJcxAAlGTv34Oh7/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition-transform duration-300 hover:scale-105 shadow-lg flex items-center">
            <Download className="mr-2" size={20} /> My CV
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// --- About Section ---
const AboutSection = () => {
  return (
    <AnimatedSection id="about">
      <h2 className="text-4xl font-bold text-white text-center mb-12">About Me</h2>
      <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
        <div className="md:col-span-3">
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Hello! I'm Shafayat Mustafa.</h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            A passionate and detail-oriented engineer in my final year at the University of Southampton, pursuing a Master of Engineering in Mechanical Engineering. My academic journey has been driven by a fascination with how physical principles can be modelled, predicted, and controlled using modern computational and electronic tools.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I am seeking a graduate role in a forward-thinking engineering firm where I can contribute to challenging projects and continue to develop my technical abilities.
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-cyan-500/50">
             {/* <-- REPLACE THIS URL with your own hosted image link */}
            <img src="https://placehold.co/400x400/e2e8f0/111827?text=SM" alt="Shafayat Mustafa" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-white text-center mb-10">Technical Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {skills.map((skill) => (
            <motion.div key={skill.name} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300 border border-gray-700/50" whileHover={{ y: -5 }}>
              <skill.icon className="text-cyan-400 mb-3" size={40} />
              <h4 className="font-semibold text-white mb-1">{skill.name}</h4>
              <p className="text-xs text-gray-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// --- Projects Section ---
const ProjectsSection = ({ onProjectClick }) => {
  return (
    <AnimatedSection id="projects">
      <h2 className="text-4xl font-bold text-white text-center mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="group relative rounded-lg overflow-hidden shadow-2xl cursor-pointer border border-gray-700/50 hover:border-cyan-500/50 transition-colors duration-300"
            onClick={() => onProjectClick(project)}
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={project.imageUrl} alt={project.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" style={{ imageRendering: 'crisp-edges' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-sm text-cyan-400 font-semibold">{project.category}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
              <p className="text-gray-300 mt-2 text-sm max-w-md">{project.summary}</p>
               <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold inline-block">View Details &rarr;</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

// --- Resume Section ---
const ResumeSection = () => {
  return (
    <AnimatedSection id="resume">
      <h2 className="text-4xl font-bold text-white text-center mb-12">Resume / CV</h2>
      <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-lg shadow-xl p-8 md:p-12 border border-gray-700/50">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-gray-700/50 pb-6 md:pb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Education</h3>
                <p className="text-white font-semibold text-lg">MEng Mechanical Engineering</p>
                <p className="text-gray-400">University of Southampton (2022 - 2026)</p>
            </div>
            <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Key Experience & Skills</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                    <strong>Dissertation:</strong> Implemented and validated a novel 3D inverse problem methodology for stress analysis using Python and COMSOL. Achieved &lt;0.5% uncertainty for key stress components, demonstrating strong analytical and computational capabilities.
                </p>
                 <p className="text-gray-300 leading-relaxed">
                    <strong>Mechatronics Project:</strong> Led the electronics and programming for a group project to build a humidity-sensing installation. Designed and implemented all Arduino-based control systems, sensor integration, and servo-driven mechanisms.
                </p>
            </div>
        </div>
         <div className="text-center mt-12">
            <a href="https://drive.google.com/file/d/1ibd-7ItlAfNufxtluoJcxAAlGTv34Oh7/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-transform duration-300 hover:scale-105 shadow-lg">
                <Download className="mr-2" size={20} /> Download Full CV
            </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

// --- Contact Section ---
const ContactSection = () => {
    return (
        <AnimatedSection id="contact">
            <h2 className="text-4xl font-bold text-white text-center mb-4">Get In Touch</h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
                I am always open to discussing new opportunities or interesting engineering challenges. Please feel free to reach out.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <a href="mailto:shafayat.mustafa.portfolio@email.com" className="flex items-center text-lg text-gray-200 hover:text-cyan-400 transition-colors duration-300">
                    <Mail className="mr-3 text-cyan-400" size={24} />
                    shafayat.mustafa.portfolio@email.com
                </a>
                <a href="https://www.linkedin.com/in/shafayat-mustafa/" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-gray-200 hover:text-cyan-400 transition-colors duration-300">
                    <Linkedin className="mr-3 text-cyan-400" size={24} />
                    LinkedIn Profile
                </a>
                 <a href="https://github.com/ShafM04" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-gray-200 hover:text-cyan-400 transition-colors duration-300">
                    <Github className="mr-3 text-cyan-400" size={24} />
                    GitHub Profile
                </a>
            </div>
        </AnimatedSection>
    );
};

// --- Project Modal ---
const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900 text-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="sticky top-4 right-4 float-right text-gray-400 hover:text-white z-10 bg-gray-900 rounded-full p-1">
                        <X size={28} />
                    </button>
                    <div className="h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
                    <div className="p-6 md:p-10">
                        <span className="text-sm font-semibold text-cyan-400">{project.category}</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{project.details.headline}</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">{project.details.description}</p>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">Challenges & Solutions</h3>
                        {project.details.challenges.map((challenge, index) => (
                            <div key={index} className="mb-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                            <h4 className="font-semibold text-cyan-400 text-lg mb-2">{challenge.title}</h4>
                            <p className="text-gray-300 text-sm mb-2"><strong className="text-gray-100">The Challenge:</strong> {challenge.text}</p>
                            <p className="text-gray-300 text-sm"><strong className="text-gray-100">My Solution:</strong> {challenge.solution}</p>
                            </div>
                        ))}

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Visuals</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {project.details.visuals.map((src, index) => (
                                <img key={index} src={src} alt={`Project visual ${index + 1}`} className="w-full h-auto rounded-md shadow-lg object-cover" style={{ imageRendering: 'crisp-edges' }} />
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tools Used</h3>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {project.tools.map(tool => (
                                <span key={tool} className="bg-cyan-400/20 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full">{tool}</span>
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Outcome</h3>
                        <p className="text-gray-300 leading-relaxed">{project.details.outcome}</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    resume: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const refs = Object.values(sectionRefs);
    const elements = refs.map(ref => document.getElementById(ref.current)).filter(Boolean);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  useEffect(() => {
    if (modalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
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
  
  const handleMenuToggle = () => {
      setMenuOpen(!menuOpen);
  };

  // Assign refs
  useEffect(() => {
    sectionRefs.home.current = "home";
    sectionRefs.about.current = "about";
    sectionRefs.projects.current = "projects";
    sectionRefs.resume.current = "resume";
    sectionRefs.contact.current = "contact";
  }, []);


  return (
    <div className="bg-gray-900 text-white font-sans">
      <Header activeSection={activeSection} onLinkClick={handleLinkClick} onMenuToggle={handleMenuToggle} />
      <MobileNav isOpen={menuOpen} onLinkClick={handleLinkClick} onMenuToggle={handleMenuToggle} />
      <main>
        <HeroSection onLinkClick={handleLinkClick} />
        <AboutSection />
        <ProjectsSection onProjectClick={handleProjectClick} />
        <ResumeSection />
        <ContactSection />
      </main>
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      <footer className="bg-gray-900 border-t border-gray-700/50 py-6">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Shafayat Mustafa. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
