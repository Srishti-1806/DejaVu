
import { useState } from 'react';
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const semesterData = [
  {
    semester: "Semester 8",
    year: "2024",
    gpa: "9.2",
    subjects: [
      { name: "VLSI Design", grade: "A+", credits: 4 },
      { name: "Digital Signal Processing", grade: "A", credits: 4 },
      { name: "Wireless Communication", grade: "A+", credits: 3 },
      { name: "Project Work", grade: "A+", credits: 6 },
    ]
  },
  {
    semester: "Semester 7", 
    year: "2023",
    gpa: "8.9",
    subjects: [
      { name: "Embedded Systems", grade: "A+", credits: 4 },
      { name: "Control Systems", grade: "A", credits: 4 },
      { name: "Power Electronics", grade: "A", credits: 3 },
      { name: "Communication Networks", grade: "A+", credits: 3 },
    ]
  },
  {
    semester: "Semester 6",
    year: "2023", 
    gpa: "8.7",
    subjects: [
      { name: "Microprocessors", grade: "A+", credits: 4 },
      { name: "Analog Electronics", grade: "A", credits: 4 },
      { name: "Digital Electronics", grade: "A", credits: 4 },
      { name: "Electromagnetics", grade: "B+", credits: 3 },
    ]
  }
];

const courseworkData = [
  {
    category: "Core ECE Subjects",
    courses: [
      "Circuit Analysis & Design",
      "Electronic Devices & Circuits", 
      "Digital Logic Design",
      "Signals & Systems",
      "Communication Systems",
      "Control Systems Engineering"
    ]
  },
  {
    category: "Programming & Software",
    courses: [
      "C/C++ Programming",
      "Python for Engineers",
      "MATLAB/Simulink",
      "Verilog HDL",
      "LabVIEW",
      "Web Development (HTML/CSS/JS)"
    ]
  },
  {
    category: "Specialized Areas",
    courses: [
      "VLSI Design",
      "Embedded Systems",
      "IoT Applications",
      "Machine Learning Basics",
      "Digital Image Processing",
      "Renewable Energy Systems"
    ]
  }
];

const projectsData = [
  {
    title: "Smart Home Automation using IoT",
    description: "Complete home automation system with mobile app control",
    duration: "Jan 2024 - Apr 2024",
    technologies: ["Arduino", "ESP32", "React Native", "Firebase"],
    grade: "A+",
    type: "Major Project"
  },
  {
    title: "Digital Filter Design in MATLAB",
    description: "FIR and IIR filter implementation and analysis",
    duration: "Sep 2023 - Nov 2023", 
    technologies: ["MATLAB", "Signal Processing", "Filter Design"],
    grade: "A",
    type: "Course Project"
  },
  {
    title: "PCB Design for Audio Amplifier",
    description: "Complete PCB design and fabrication of audio amplifier circuit",
    duration: "Mar 2023 - May 2023",
    technologies: ["Altium Designer", "Circuit Design", "PCB Layout"],
    grade: "A+",
    type: "Lab Project"
  }
];

export const Academics = () => {
  const [selectedSemester, setSelectedSemester] = useState(semesterData[0]);

  const calculateOverallGPA = () => {
    const totalGPA = semesterData.reduce((sum, sem) => sum + parseFloat(sem.gpa), 0);
    return (totalGPA / semesterData.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Academic Journey
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Bachelor of Technology in Electronics & Communication Engineering
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">2021 - 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-300">CGPA: {calculateOverallGPA()}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="semesters" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 mb-8">
            <TabsTrigger value="semesters" className="data-[state=active]:bg-blue-600">
              Semester Wise
            </TabsTrigger>
            <TabsTrigger value="coursework" className="data-[state=active]:bg-blue-600">
              Coursework
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="semesters" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Semester List */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Semesters</h3>
                <div className="space-y-3">
                  {semesterData.map((semester) => (
                    <button
                      key={semester.semester}
                      onClick={() => setSelectedSemester(semester)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                        selectedSemester.semester === semester.semester
                          ? 'bg-blue-600 border-blue-400'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-600'
                      } border`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{semester.semester}</div>
                          <div className="text-sm text-slate-400">{semester.year}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">GPA</div>
                          <div className="text-cyan-400">{semester.gpa}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Details */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      {selectedSemester.semester} - {selectedSemester.year}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      GPA: {selectedSemester.gpa}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedSemester.subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="bg-slate-900 p-4 rounded-lg border border-slate-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-white">{subject.name}</h4>
                            <span className={`px-2 py-1 rounded text-sm font-semibold ${
                              subject.grade === 'A+' ? 'bg-green-600' :
                              subject.grade === 'A' ? 'bg-blue-600' : 'bg-yellow-600'
                            }`}>
                              {subject.grade}
                            </span>
                          </div>
                          <div className="text-sm text-slate-400">
                            Credits: {subject.credits}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="coursework" className="mt-6">
            <div className="grid md:grid-cols-3 gap-8">
              {courseworkData.map((category, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.courses.map((course, courseIndex) => (
                        <li
                          key={courseIndex}
                          className="text-slate-300 p-2 bg-slate-900 rounded border-l-2 border-cyan-400"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        project.type === 'Major Project' ? 'bg-purple-600' :
                        project.type === 'Course Project' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {project.type}
                      </span>
                    </div>
                    <CardDescription className="text-slate-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-slate-400">
                        <strong>Duration:</strong> {project.duration}
                      </div>
                      <div className="text-sm text-slate-400">
                        <strong>Grade:</strong> <span className="text-green-400">{project.grade}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-300 mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
