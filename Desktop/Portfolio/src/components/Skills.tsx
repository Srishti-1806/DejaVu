
import { useState, useEffect, useRef } from 'react';

const skillsData = [
  { name: 'HTML', level: 90, color: 'from-blue-500 to-blue-600' },
  { name: 'CSS', level: 85, color: 'from-cyan-500 to-cyan-600' },
  { name: 'JavaScript', level: 80, color: 'from-purple-500 to-purple-600' },
  { name: 'React', level: 75, color: 'from-green-500 to-green-600' },
  { name: 'Agentic AI', level: 88, color: 'from-orange-500 to-orange-600' },
  { name: 'FastApis', level: 82, color: 'from-pink-500 to-pink-600' },
  { name: 'Generative AI', level: 78, color: 'from-indigo-500 to-indigo-600' },
  { name: 'Kotlin', level: 70, color: 'from-red-500 to-red-600' },
];

export const Skills = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Built many dynamic websites to solve real-world challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skillsData.map((skill, index) => (
            <div key={skill.name} className="bg-slate-900/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-sm text-slate-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: inView ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
              <div className="text-slate-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
              <div className="text-slate-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
              <div className="text-slate-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">3.8</div>
              <div className="text-slate-400">GPA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
