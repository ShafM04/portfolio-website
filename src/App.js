import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import ReactMarkdown from 'react-markdown';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { Download, Mail, Linkedin, Github, X, Menu, ChevronsRight, Briefcase, BrainCircuit, Code, Cpu, Rocket, ChevronDown } from 'lucide-react';

// --- Project Data (Updated) ---
const projects = [
  {
    id: 1,
    title: "Validating the 3D Inverse Problem in Stress Analysis",
    category: "MEng Dissertation",
    // Using a reliable image host like Imgur is recommended to avoid cross-origin issues.
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
  },
  {
    id: 4,
    title: "Keras House Price Prediction",
    category: "Machine Learning",
    // FIXED: Replaced problematic GitHub URL with a placeholder.
    imageUrl: "https://placehold.co/1200x800/1a202c/ffffff?text=Keras+Project",
    summary: "Deep learning model to predict house prices using Keras and real-world datasets.",
    tools: ["Python", "Keras", "Pandas", "Matplotlib"],
    details: {
      headline: "Keras-Powered House Price Estimator",
      description: "A neural network model that predicts house prices by learning from tabular datasets.",
      challenges: [
        { title: "Overfitting on Small Dataset", text: "The model initially overfit the training data.", solution: "Introduced dropout layers and early stopping." },
        { title: "Feature Selection", text: "Handling irrelevant features was tricky.", solution: "Performed correlation analysis and manual curation." }
      ],
      visuals: [],
      outcome: "Achieved good generalization on test set and enabled insight into feature importances."
    }
  },
  {
    id: 5,
    title: "Robotic Arm Kinematics",
    category: "Mechanics",
    // FIXED: Replaced problematic GitHub URL with a placeholder.
    imageUrl: "https://placehold.co/1200x800/1a202c/ffffff?text=Robotics+Project",
    summary: "2D robotic arm forward and inverse kinematics solver with visualization.",
    tools: ["Python", "NumPy", "Matplotlib"],
    details: {
      headline: "Kinematics Simulator for Robotic Arm",
      description: "Built a Python-based tool to compute and visualize forward/inverse kinematics.",
      challenges: [
        { title: "Singularity Handling", text: "Singular configurations caused instability.", solution: "Added constraints and fallback inverse calculations." }
      ],
      visuals: [],
      outcome: "Enabled education and prototyping of kinematic control logic."
    }
  },
  {
    id: 6,
    title: "3D Robotic Arm Kinematics",
    category: "Mechanics",
    // FIXED: Replaced problematic GitHub URL with a placeholder.
    imageUrl: "https://placehold.co/1200x800/1a202c/ffffff?text=3D+Robotics",
    summary: "Interactive visualization of 3D kinematic chain for robotics.",
    tools: ["Python", "Matplotlib", "3D Geometry"],
    details: {
      headline: "3D Visualization of Kinematic Chains",
      description: "Extended 2D robotic arm solver to full 3D with custom rendering.",
      challenges: [
        { title: "3D Joint Alignment", text: "Complex joint vectors needed accurate orientation.", solution: "Used rotation matrices and cross product checks." }
      ],
      visuals: [],
      outcome: "Rendered 3D motion for educational and proof-of-concept use cases."
    }
  },
  {
    id: 7,
    title: "6-DOF Robotics Simulator",
    category: "Simulation",
    // FIXED: Replaced problematic GitHub URL with a placeholder.
    imageUrl: "https://placehold.co/1200x800/1a202c/ffffff?text=6-DOF+Simulator",
    summary: "Simulates a full 6-DOF robotic manipulator in a virtual space.",
    tools: ["Python", "PyOpenGL", "Forward Kinematics", "Matrix Transformations"],
    details: {
      headline: "Full DOF Robot Simulation Platform",
      description: "Simulates robotic arm movement and workspace coverage in 3D.",
      challenges: [
        { title: "Rendering & Performance", text: "Initial implementation was too slow.", solution: "Optimized rendering pipeline using PyOpenGL display lists." }
      ],
      visuals: [],
      outcome: "Successfully simulated realistic joint motion and workspace limits."
    }
  }
];

const skills = [
  { name: "FEA & Simulation", icon: BrainCircuit, description: "COMSOL, ANSYS, MATLAB" },
  { name: "CAD & Manufacturing", icon: Briefcase, description: "SolidWorks, AutoCAD, Prototyping" },
  { name: "Programming", icon: Code, description: "Python, Arduino (C++)" },
  { name: "Electronics", icon: Cpu, description: "Circuit Design, Sensor Integration" },
  { name: "Data Analysis", icon: ChevronsRight, description: "Numerical Modelling, Pandas" },
  { name: "Project Management", icon: Rocket, description: "Critical Path, Gantt Charts" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

// --- Video Intro Component ---
const VideoIntro = ({ onVideoEnd }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex justify-center items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
    >
      <video
        // IMPORTANT: Replace this with the path to your video in the `public` folder
        src="/intro-video.mp4" 
        autoPlay
        // The 'muted' attribute is necessary for autoplay to work in most modern browsers.
        muted 
        playsInline
        onEnded={onVideoEnd}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

// --- Background Animation Component (Updated) ---
const BackgroundAnimation = ({ scrollProgress }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const materialsRef = useRef({});
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current.position.z = 150;

        rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(rendererRef.current.domElement);
        
        const scene = sceneRef.current;
        const renderer = rendererRef.current;

        const circuitGroup = new THREE.Group();
        const signals = [];
        const GRID_SIZE = 30;
        const CELL_SIZE = 15;
        const HALF_GRID = (GRID_SIZE * CELL_SIZE) / 2;
        materialsRef.current.trace = new THREE.LineBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.2 });
        materialsRef.current.signal = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        materialsRef.current.node = new THREE.MeshBasicMaterial({ color: 0x00aaff });

        const nodeGeometry = new THREE.RingGeometry(0.4, 0.6, 16);
        const nodePositions = new Set();

        for (let i = 0; i < 50; i++) {
            const points = [];
            let x = Math.floor(Math.random() * GRID_SIZE) * CELL_SIZE - HALF_GRID;
            let y = Math.floor(Math.random() * GRID_SIZE) * CELL_SIZE - HALF_GRID;
            points.push(new THREE.Vector3(x, y, 0));
            nodePositions.add(`${x},${y}`);

            for (let j = 0; j < Math.floor(Math.random() * 5) + 3; j++) {
                const length = (Math.floor(Math.random() * 5) + 2) * CELL_SIZE;
                if (Math.random() > 0.5) x += Math.random() > 0.5 ? length : -length;
                else y += Math.random() > 0.5 ? length : -length;
                x = Math.max(-HALF_GRID, Math.min(HALF_GRID, x));
                y = Math.max(-HALF_GRID, Math.min(HALF_GRID, y));
                points.push(new THREE.Vector3(x, y, 0));
                nodePositions.add(`${x},${y}`);
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const trace = new THREE.Line(geometry, materialsRef.current.trace);
            circuitGroup.add(trace);
            if (Math.random() > 0.5 && points.length > 1) {
                const geometry = new THREE.SphereGeometry(1, 8, 8);
                const particle = new THREE.Mesh(geometry, materialsRef.current.signal);
                signals.push({ points, progress: Math.random(), speed: Math.random() * 0.004 + 0.002, particle });
                circuitGroup.add(particle);
            }
        }
        
        nodePositions.forEach(pos => {
            const [x, y] = pos.split(',').map(Number);
            const node = new THREE.Mesh(nodeGeometry, materialsRef.current.node);
            node.position.set(x, y, 0);
            circuitGroup.add(node);
        });
        scene.add(circuitGroup);

        const streaksGroup = new THREE.Group();
        materialsRef.current.streak = new THREE.SpriteMaterial({
            color: 0xE0FFFF,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0
        });
        const streaks = [];
        for (let i = 0; i < 250; i++) {
            const particle = new THREE.Sprite(materialsRef.current.streak);
            const x = Math.random() * 800 - 400;
            const y = Math.random() * 600 - 300;
            const z = Math.random() * -300;
            particle.position.set(x, y, z);
            particle.scale.set(0.3, Math.random() * 5 + 2, 1);
            streaks.push({ sprite: particle, speed: Math.random() * 0.5 + 0.2 });
            streaksGroup.add(particle);
        }
        scene.add(streaksGroup);

        const onWindowResize = () => {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);

        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
            
            signals.forEach(signal => {
                signal.progress = (signal.progress + signal.speed) % 1;
                let totalLength = 0;
                for (let i = 0; i < signal.points.length - 1; i++) totalLength += signal.points[i].distanceTo(signal.points[i + 1]);
                const currentDist = signal.progress * totalLength;
                let accumulatedLength = 0;
                for (let i = 0; i < signal.points.length - 1; i++) {
                    const segmentLength = signal.points[i].distanceTo(signal.points[i + 1]);
                    if (currentDist >= accumulatedLength && currentDist <= accumulatedLength + segmentLength) {
                        const segmentProgress = (currentDist - accumulatedLength) / segmentLength;
                        signal.particle.position.lerpVectors(signal.points[i], signal.points[i + 1], segmentProgress);
                        break;
                    }
                    accumulatedLength += segmentLength;
                }
            });

            streaks.forEach(p => {
                p.sprite.position.x += p.speed;
                if (p.sprite.position.x > 400) p.sprite.position.x = -400;
            });

            renderer.render(scene, cameraRef.current);
        };
        animate();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animationFrameIdRef.current);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        const { trace, signal, streak, node } = materialsRef.current;
        if (trace && signal && streak && node) {
            const circuitOpacity = Math.max(0, 1 - scrollProgress * 2);
            trace.opacity = circuitOpacity * 0.2;
            signal.opacity = circuitOpacity;
            node.opacity = circuitOpacity;
            
            const streakOpacity = Math.min(1, scrollProgress * 2);
            streak.opacity = streakOpacity * 0.7;

            const color1 = new THREE.Color("#0a0a1a");
            const color2 = new THREE.Color("#003366");
            const currentColor = new THREE.Color();

            const transitionProgress = Math.min(1, scrollProgress * 2);
            
            currentColor.lerpColors(color1, color2, transitionProgress);

            if (rendererRef.current) {
                rendererRef.current.setClearColor(currentColor, 1);
            }
        }
    }, [scrollProgress]);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};


// --- Reusable Components ---
const AnimatedSection = ({ children, id, className = "" }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

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
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 ${className}`}
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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-gray-700/50' : 'bg-transparent'}`}>
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
const MobileNav = ({ isOpen, onLinkClick, onMenuToggle }) => (
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

// --- Hero Section (Updated) ---
const HeroSection = ({ onLinkClick }) => (
    <AnimatedSection id="home" className="min-h-screen flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center z-20 relative p-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.7)' }}>
            Shafayat Mustafa
          </h1>
          <p className="text-md md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Final Year MEng Mechanical Engineering Student | Specialising in Computational Mechanics & Mechatronic Systems
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#projects" onClick={(e) => onLinkClick(e, '#projects')} className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-transform duration-300 hover:scale-105 shadow-lg w-full sm:w-auto">
              View My Projects
            </a>
            <a href="https://drive.google.com/file/d/1ibd-7ItlAfNufxtluoJcxAAlGTv34Oh7/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition-transform duration-300 hover:scale-105 shadow-lg flex items-center justify-center w-full sm:w-auto">
              <Download className="mr-2" size={20} /> My CV
            </a>
          </div>
        </motion.div>
    </AnimatedSection>
);

// --- Skills Details Component ---
const SkillsDetails = () => {
    const [markdown, setMarkdown] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/skills.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                setMarkdown(text);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching skills.md:', error);
                setMarkdown('Failed to load skill details. Please ensure `skills.md` is in the `public` folder.');
                setLoading(false);
            });
    }, []);

    const containerClasses = "prose prose-invert prose-lg max-w-none bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg shadow-xl p-8 md:p-12 mt-12";

    if (loading) {
        return <div className={containerClasses}><p>Loading...</p></div>;
    }

    return (
        <div className={containerClasses}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    );
};


// --- About Section ---
const AboutSection = () => {
  const [showDetails, setShowDetails] = useState(false);
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
            <img src="https://placehold.co/400x400/e2e8f0/111827?text=SM" alt="Shafayat Mustafa" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-white text-center mb-10">Technical Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {skills.map((skill) => (
            <motion.div key={skill.name} className="flex flex-col items-center p-4 bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg shadow-md hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300" whileHover={{ y: -5 }}>
              <skill.icon className="text-cyan-400 mb-3" size={40} />
              <h4 className="font-semibold text-white mb-1">{skill.name}</h4>
              <p className="text-xs text-gray-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
            <button 
              onClick={() => setShowDetails(!showDetails)} 
              className="inline-flex items-center bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-400/20 transition-all duration-300 hover:scale-105 shadow-lg"
            >
                {showDetails ? 'Hide Details' : 'Show More Details'} <ChevronDown className={`ml-2 transition-transform ${showDetails ? 'rotate-180' : ''}`} size={20} />
            </button>
        </div>
        <AnimatePresence>
            {showDetails && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <SkillsDetails />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

// --- Project Card Component ---
const ProjectCard = ({ project }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div layout className="rounded-lg overflow-hidden shadow-2xl bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 transition-all duration-300 hover:border-cyan-400/50">
            <motion.div layout="position" className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="h-64 bg-black/20 flex items-center justify-center p-4">
                    <img src={project.imageUrl} alt={project.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="p-6">
                    <span className="text-sm text-cyan-400 font-semibold">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
                    <p className="text-gray-300 mt-2 text-sm max-w-md">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tools.map(tool => (
                            <span key={tool} className="bg-cyan-400/20 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full">{tool}</span>
                        ))}
                    </div>
                     <div className="mt-4 flex items-center text-cyan-400 font-semibold">
                        <span>{isOpen ? 'Hide' : 'View'} Details</span>
                        <ChevronDown className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 border-t border-cyan-400/20">
                            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{project.details.headline}</h2>
                            <p className="text-gray-300 mb-8 leading-relaxed">{project.details.description}</p>
                            
                            <h3 className="text-xl font-bold text-white mb-4">Challenges & Solutions</h3>
                            {project.details.challenges.map((challenge, index) => (
                                <div key={index} className="mb-6 bg-slate-800/50 p-4 rounded-lg border border-cyan-400/10">
                                <h4 className="font-semibold text-cyan-400 text-lg mb-2">{challenge.title}</h4>
                                <p className="text-gray-300 text-sm mb-2"><strong className="text-gray-100">The Challenge:</strong> {challenge.text}</p>
                                <p className="text-gray-300 text-sm"><strong className="text-gray-100">My Solution:</strong> {challenge.solution}</p>
                                </div>
                            ))}

                            {project.details.visuals && project.details.visuals.length > 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-white mt-8 mb-4">Key Visuals</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                        {project.details.visuals.map((src, index) => (
                                            <img key={index} src={src} alt={`Project visual ${index + 1}`} className="w-full h-auto rounded-md shadow-lg object-cover" />
                                        ))}
                                    </div>
                                </>
                            )}
                            
                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Outcome</h3>
                            <p className="text-gray-300 leading-relaxed">{project.details.outcome}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Projects Section ---
const ProjectsSection = () => {
  return (
    <AnimatedSection id="projects">
      <h2 className="text-4xl font-bold text-white text-center mb-12">Projects</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
};

// --- Resume Section (with LaTeX) ---
const ResumeSection = () => (
    <AnimatedSection id="resume">
      <h2 className="text-4xl font-bold text-white text-center mb-12">Resume / CV</h2>
      <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg shadow-xl p-8 md:p-12">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 border-b-2 md:border-b-0 md:border-r-2 border-cyan-400/20 pb-6 md:pb-0 md:pr-8">
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
        <div className="mt-12 border-t border-cyan-400/20 pt-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Academic Presentation Example</h3>
            <p className="text-gray-300 text-center mb-4">An example of my ability to present complex engineering principles, such as the Navier-Stokes equations for fluid dynamics:</p>
            <div className="text-white bg-slate-800/50 p-4 rounded-lg text-center">
                <Latex>{`$\\frac{\\partial \\mathbf{u}}{\\partial t} + (\\mathbf{u} \\cdot \\nabla) \\mathbf{u} = -\\frac{1}{\\rho} \\nabla p + \\nu \\nabla^2 \\mathbf{u}$`}</Latex>
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

// --- Contact Section ---
const ContactSection = () => (
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

// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    const handleScroll = () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(window.scrollY / totalScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = Object.values(navLinks).map(link => document.querySelector(link.href)).filter(Boolean);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => el && observer.unobserve(el));
    };
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleMenuToggle = () => {
      setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-transparent text-white font-sans">
        <AnimatePresence>
            {showIntro && <VideoIntro onVideoEnd={handleVideoEnd} />}
        </AnimatePresence>
        
        <motion.div
            initial={false}
            animate={{ opacity: showIntro ? 0 : 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            style={{ visibility: showIntro ? 'hidden' : 'visible' }}
        >
            <BackgroundAnimation scrollProgress={scrollProgress} />
            <Header activeSection={activeSection} onLinkClick={handleLinkClick} onMenuToggle={handleMenuToggle} />
            <MobileNav isOpen={menuOpen} onLinkClick={handleLinkClick} onMenuToggle={handleMenuToggle} />
            <main>
                <HeroSection onLinkClick={handleLinkClick} />
                <AboutSection />
                <ProjectsSection />
                <ResumeSection />
                <ContactSection />
            </main>
            <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-cyan-400/20 py-6 relative z-10">
                <div className="container mx-auto text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Shafayat Mustafa. All Rights Reserved.</p>
                </div>
            </footer>
        </motion.div>
    </div>
  );
}
