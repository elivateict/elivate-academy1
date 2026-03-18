

import { useState } from "react";
import { motion } from "framer-motion";

const programs = [
  {
    id: 1,
    name: "Full Stack Development",
    description:
      "Master modern web development with our comprehensive full stack program. Learn to build scalable applications from front to back.",
    duration: "16 Weeks",
    startDates: "Monthly Cohorts",
    level: "Beginner to Advanced",
    icon: "💻",
    modules: [
      {
        name: "Frontend Development",
        description:
          "Build modern, responsive user interfaces with React and Next.js",
        topics: [
          "UI/Ux Figma",
          "HTML5, CSS & Modern JavaScript",
          "React & Redux Architecture",
          "Next.js & Server Components",
          "TypeScript & Static Typing",
        ],
        tools: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
      },
      {
        name: "Backend Development",
        description: "Create robust and scalable server-side applications",
        topics: [
          "Node.js & Express",
          "RESTful API Design",
          "GraphQL & Apollo",
          "Database Design & ORM",
        ],
        tools: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
      },
      {
        name: "Git & Github",
        description:
          "Master Git & Github to manage your code and collaborate with others",
        topics: [
          "Git Basics",
          "GitHub Workflow",
          "Git Branching Strategies",
          "Collaboration & Conflict Resolution",
        ],
        tools: ["Git", "GitHub", "GitLab", "Bitbucket"],
      },
    ],
  },
  {
    id: 2,
    name: "Mobile Development (Flutter)",
    description:
      "Build beautiful, high-performance mobile applications using Flutter for Android, iOS, and beyond.",
    duration: "16 Weeks",
    startDates: "Monthly Cohorts",
    level: "Beginner to Advanced",
    icon: "📱",
    modules: [
      {
        name: "Flutter & Dart Fundamentals",
        description: "Master the basics of Flutter and Dart to start building mobile applications.",
        topics: [
          "Dart Programming Basics",
          "Flutter Architecture & Widgets",
          "Flutter Navigation",
          "State Management Fundamentals",
        ],
        tools: ["Flutter", "Dart", "Visual Studio Code", "Android Studio"],
      },
      {
        name: "Modern UI Layouts",
        description: "Learn to design visually appealing and responsive mobile interfaces.",
        topics: [
          "UI/UX Design Principles",
          "Responsive Design for Multiple Screens",
          "Animations & Transitions",
          "Material & Cupertino Design",
        ],
        tools: ["Figma", "Adobe XD", "Flutter Widgets"],
      },
      {
        name: "APIs & Data Integration",
        description: "Learn how to connect your apps to backend services and work with data.",
        topics: [
          "REST APIs & JSON",
          "HTTP Requests in Flutter",
          "State Management with Provider / Riverpod",
          "Local Storage & Shared Preferences",
        ],
        tools: ["Flutter", "Dart", "Postman"],
      },
      {
        name: "Publishing & Deployment",
        description: "Learn how to prepare and deploy apps to the App Store and Google Play.",
        topics: [
          "App Signing & Certificates",
          "Play Store & App Store Submission",
          "Debugging & Performance Optimization",
          "Continuous Deployment Basics",
        ],
        tools: ["Flutter", "Android Studio", "Xcode", "Git"],
      },
    ],
  },
 
 
  
  {
    id: 6,
    name: "IoT Development",
    description:
      "Learn to create smart, connected systems by integrating hardware devices with software and the internet. This course equips students to design, build, and deploy real-world IoT projects that solve practical problems.",
    duration: "16 Weeks",
    startDates: "Monthly Cohorts",
    level: "Beginner to Intermediate",
    icon: "🌐",
    modules: [
      {
        name: "Arduino & Microcontroller Fundamentals",
        description: "Master the essentials of microcontrollers and Arduino boards to control devices and sensors.",
        topics: [
          "Arduino Board Overview & Setup",
          "GPIO & Pin Configuration",
          "Serial Communication",
          "Basic Sketch Programming",
        ],
        tools: ["Arduino IDE", "Arduino Boards", "Breadboard", "Jumper Wires"],
      },
      {
        name: "Sensors & Actuators Integration",
        description: "Learn how to connect and program sensors and actuators for smart device functionality.",
        topics: [
          "Temperature & Humidity Sensors",
          "Motion & Proximity Sensors",
          "Relays & Motor Control",
          "LED & Display Integration",
        ],
        tools: ["DHT11/DHT22", "HC-SR04", "Relays", "Arduino"],
      },
      {
        name: "IoT Communication & Networking",
        description: "Understand how devices communicate using WiFi, Bluetooth, and MQTT protocols.",
        topics: [
          "WiFi Connectivity (ESP8266/ESP32)",
          "Bluetooth Low Energy (BLE)",
          "MQTT Protocol",
          "HTTP & REST for IoT",
        ],
        tools: ["ESP8266", "ESP32", "Node-RED", "MQTT Broker"],
      },
      {
        name: "Embedded Programming with C/C++",
        description: "Develop firmware for microcontrollers to control devices and handle sensor data.",
        topics: [
          "C/C++ Syntax for Embedded Systems",
          "Memory Management",
          "Interrupt Handling",
          "Data Structures & Algorithms",
        ],
        tools: ["Arduino IDE", "PlatformIO", "C/C++"],
      },
      {
        name: "Cloud & IoT Platforms",
        description: "Learn to integrate IoT devices with cloud services for remote monitoring and control.",
        topics: [
          "AWS IoT / Azure IoT Hub",
          "Device Management & Provisioning",
          "Data Visualization Dashboards",
          "Remote Configuration",
        ],
        tools: ["Arduino Cloud", "Blynk", "AWS IoT", "ThingsBoard"],
      },
      {
        name: "Smart Device Project Development",
        description: "Hands-on projects that combine hardware, software, and networking to build fully functional IoT systems.",
        topics: [
          "Smart Home Automation System – Control lights, fans, and appliances remotely",
          "Smart Temperature & Humidity Monitor – Track environmental data in real-time",
          "IoT-Based Security Alarm System – Detect intrusions and send alerts",
          "Smart Irrigation System – Automate watering for plants or farms",
          "Remote Device Control via Mobile/Web – Control devices from anywhere",
        ],
        tools: ["Arduino", "ESP32", "Sensors", "Mobile/Web Apps"],
      },
    ],
  },
  {
    id: 7,
    name: "Basic Computer Skills",
    description:
      "This course provides a solid foundation in computer usage, software, and hardware. Students will learn all the essential skills to confidently operate computers, perform office tasks, and understand core technology concepts.",
    duration: "16 Weeks",
    startDates: "Monthly Cohorts",
    level: "Beginner",
    icon: "🖥",
    modules: [
      {
        name: "Windows & Operating Systems",
        description: "Learn to navigate and manage modern operating systems efficiently.",
        topics: [
          "Windows Basics & File Management",
          "Desktop Customization & Shortcuts",
          "System Settings & Security",
          "Troubleshooting Common Issues",
        ],
        tools: ["Windows 10/11", "File Explorer", "Control Panel"],
      },
      {
        name: "Microsoft Office Essentials",
        description: "Master essential productivity tools for school, work, and daily tasks.",
        topics: [
          "Microsoft Word – Document creation & formatting",
          "Microsoft Excel – Spreadsheets, formulas & charts",
          "Microsoft PowerPoint – Presentations & multimedia",
          "Microsoft Outlook – Email & calendar management",
        ],
        tools: ["Microsoft Office Suite", "Office Online"],
      },
      {
        name: "Computer Hardware Fundamentals",
        description: "Understand the components inside your computer and how they work together.",
        topics: [
          "CPU, RAM, Storage, Motherboard, Peripherals",
          "Basic Assembly & Maintenance",
          "Input/Output Devices",
          "Troubleshooting Hardware Issues",
        ],
        tools: ["PC Components", "Peripheral Devices"],
      },
      {
        name: "Internet & Digital Literacy",
        description: "Learn to use the internet safely and effectively for work, study, and communication.",
        topics: [
          "Browsers & Search Engines",
          "Email & Online Communication",
          "Cloud Storage & File Sharing",
          "Cybersecurity Basics & Safe Practices",
        ],
        tools: ["Google Chrome", "Firefox", "Gmail", "OneDrive", "Google Drive"],
      },
      {
        name: "Projects Students Will Complete",
        description: "Hands-on projects to apply your new skills in real-world scenarios.",
        topics: [
          "Create a formatted Word document portfolio",
          "Design an Excel budget and chart dashboard",
          "Build a simple PowerPoint presentation for a business idea",
          "Set up a basic home network and secure devices",
          "Practice safe browsing and file sharing online",
        ],
        tools: ["Microsoft Office", "Windows", "Browser", "Network Tools"],
      },
    ],
  },
];

export default function Curriculum1() {
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white pt-24 pb-16 text-[#144a58]">
      {/* Header Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold text-[#144a58] md:text-5xl">
            Tech-Focused Curriculum
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-600 md:text-lg">
            Industry-aligned programs designed to transform you into a tech
            professional. Learn from experts and build real-world projects.
          </p>
        </motion.div>
      </div>

      {/* Programs Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Program List */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-[#d8edf1] bg-[#fcfeff]">
                <div className="p-4">
                  <h2 className="mb-4 text-lg font-semibold text-[#144a58]">
                    Programs
                  </h2>
                  <div className="space-y-2">
                    {programs.map((program) => (
                      <motion.button
                        key={program.id}
                        onClick={() => setSelectedProgram(program)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedProgram.id === program.id
                            ? "bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] text-white"
                            : "text-slate-500 hover:bg-[#f4fbfd] hover:text-[#144a58]"
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{program.icon}</span>
                          <span className="font-medium">{program.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedProgram.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl border border-[#d8edf1] bg-[#fcfeff]"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6 gap-4">
                  <span className="text-4xl">{selectedProgram.icon}</span>
                  <div>
                    <h2 className="mb-1 text-2xl font-bold text-[#144a58]">
                      {selectedProgram.name}
                    </h2>
                    <p className="text-slate-600">
                      {selectedProgram.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="rounded-lg bg-[#f4fbfd] p-4">
                    <p className="text-sm text-slate-500">Duration</p>
                    <p className="text-lg font-medium text-[#144a58]">
                      {selectedProgram.duration}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#f4fbfd] p-4">
                    <p className="text-sm text-slate-500">Start Dates</p>
                    <p className="text-lg font-medium text-[#144a58]">
                      {selectedProgram.startDates}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#f4fbfd] p-4">
                    <p className="text-sm text-slate-500">Level</p>
                    <p className="text-lg font-medium text-[#144a58]">
                      {selectedProgram.level}
                    </p>
                  </div>
                </div>

                <h3 className="mb-6 text-xl font-bold text-[#144a58]">
                  Course Modules
                </h3>
                <div className="space-y-8">
                  {selectedProgram.modules.map((module, index) => (
                    <motion.div
                      key={module.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-b border-[#d8edf1] pb-8 last:border-0"
                    >
                      <h4 className="mb-3 text-lg font-semibold text-[#144a58]">
                        {module.name}
                      </h4>
                      <p className="mb-4 text-slate-600">
                        {module.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="mb-2 text-sm font-semibold text-[#1d6273]">
                            Topics Covered
                          </h5>
                          <ul className="space-y-2">
                            {module.topics.map((topic) => (
                              <li
                                key={topic}
                                className="flex items-center text-slate-700"
                              >
                                <span className="mr-2 text-[#1d6273]">
                                  →
                                </span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-2 text-sm font-semibold text-[#1d6273]">
                            Tools & Technologies
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {module.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded bg-[#eff9fb] px-2 py-1 text-xs text-[#1d6273]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full rounded-lg bg-gradient-to-r from-[#1d6273] to-[#7ed8e6] px-6 py-3 font-medium text-white transition-all duration-300 hover:brightness-110"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
