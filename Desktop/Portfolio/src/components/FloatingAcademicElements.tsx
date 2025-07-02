
import { useState, useEffect } from 'react';
import { BookOpen, Award, GraduationCap, Cpu, Zap, Code, Calculator, Microscope } from 'lucide-react';

const academicIcons = [
  { icon: BookOpen, label: 'Study', color: 'text-blue-400' },
  { icon: Award, label: 'Achievement', color: 'text-yellow-400' },
  { icon: GraduationCap, label: 'Degree', color: 'text-green-400' },
  { icon: Cpu, label: 'Electronics', color: 'text-purple-400' },
  { icon: Zap, label: 'Power', color: 'text-orange-400' },
  { icon: Code, label: 'Programming', color: 'text-cyan-400' },
  { icon: Calculator, label: 'Mathematics', color: 'text-pink-400' },
  { icon: Microscope, label: 'Research', color: 'text-indigo-400' }
];

interface FloatingElement {
  id: number;
  icon: any;
  label: string;
  color: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
}

export const FloatingAcademicElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 15; i++) {
        const iconData = academicIcons[Math.floor(Math.random() * academicIcons.length)];
        newElements.push({
          id: i,
          icon: iconData.icon,
          label: iconData.label,
          color: iconData.color,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 20 + Math.random() * 20,
          speed: 0.5 + Math.random() * 1,
          direction: Math.random() * Math.PI * 2
        });
      }
      setElements(newElements);
    };

    createElements();
    window.addEventListener('resize', createElements);
    return () => window.removeEventListener('resize', createElements);
  }, []);

  useEffect(() => {
    const animateElements = () => {
      setElements(prev => prev.map(element => {
        let newX = element.x + Math.cos(element.direction) * element.speed;
        let newY = element.y + Math.sin(element.direction) * element.speed;
        
        // Bounce off edges
        if (newX < 0 || newX > window.innerWidth) {
          element.direction = Math.PI - element.direction;
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY < 0 || newY > window.innerHeight) {
          element.direction = -element.direction;
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }

        return {
          ...element,
          x: newX,
          y: newY
        };
      }));
    };

    const interval = setInterval(animateElements, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {elements.map((element) => {
        const IconComponent = element.icon;
        return (
          <div
            key={element.id}
            className="absolute transition-all duration-100 opacity-60 hover:opacity-100"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm rounded-full animate-pulse" 
                   style={{ 
                     width: `${element.size + 10}px`, 
                     height: `${element.size + 10}px` 
                   }} 
              />
              <IconComponent 
                size={element.size} 
                className={`${element.color} relative z-10 drop-shadow-lg`}
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {element.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
