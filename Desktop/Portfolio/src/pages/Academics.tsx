
import { Navigation } from "@/components/Navigation";
import { Academics as AcademicsComponent } from "@/components/Academics";

const Academics = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      <AcademicsComponent />
    </div>
  );
};

export default Academics;
