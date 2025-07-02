
import { useState, useEffect, useRef } from 'react';
import { Award, Trophy, Star, Medal } from 'lucide-react';

const achievementsData = [
  {
    id: 1,
    title: "Japnese Proficiency",
    description: "Excelled in Japnese Language",
    year: "2024",
    category: "Academic Excellence",
    icon: Trophy,
    color: "from-yellow-500 to-yellow-600"
  },
  {
    id: 2,
    title: "Member of IGTS",
    description: "Active Member of IGTS, NSUT",
    year: "2024-current",
    category: "Membership",
    icon: Award,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 3,
    title: "Hackathon Winner",
    description: "2st Place in AI4HUMANITY Hackathon",
    year: "2025",
    category: "Hackathon",
    icon: Star,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Top 10 in Avinay Hackathon",
    description: "Avinay Hackathon-IGDTUW out of 250+ teams across India",
    year: "2025",
    category: "Hackathon",
    icon: Medal,
    color: "from-green-500 to-green-600"
  },
  {
    id: 5,
    title: "JEE Ranker",
    description: "98.76%tile",
    year: "2024",
    category: "Academic Excellence", 
    icon: Award,
    color: "from-cyan-500 to-cyan-600"
  },
  {
    id: 6,
    title: "HackethiX.NSUT",
    description: "Grey Hat Hacker",
    year: "2024-current",
    category: "Membership",
    icon: Trophy,
    color: "from-orange-500 to-orange-600"
  }
];

export const Achievements = () => {
  const [inView, setInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', ...new Set(achievementsData.map(achievement => achievement.category))];

  const filteredAchievements = selectedCategory === 'All' 
    ? achievementsData 
    : achievementsData.filter(achievement => achievement.category === selectedCategory);

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
    <section id="achievements" ref={sectionRef} className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Achievements
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Recognition and milestones in my engineering journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 ${
                  inView ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="mb-2">
                  <span className="text-sm text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
                    {achievement.year}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-slate-300 mb-3">
                  {achievement.description}
                </p>
                <div className="text-sm text-slate-400">
                  {achievement.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
