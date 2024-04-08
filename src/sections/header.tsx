import icon from "@/assets/favicon.ico";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center my-10 mx-4 z-10 relative">
        <div className="flex flex-row items-center">
          <img src={icon} alt="icon" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-600 tracking-wide dark:text-gray-50">
            AI-Summarizer.
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mx-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-indigo-600">
          Get Summary.
        </h1>
      </div>
      <div className="flex justify-center items-center mx-4">
        <TypewriterEffectSmooth
          words={[
            { text: "Insert Text.", className: "text-gray-600" },
            { text: "Insert File.", className: "text-gray-600" },
            { text: "Insert Image.", className: "text-gray-600" },
          ]}
        />
      </div>
    </>
  );
};

export default Header;
