import icon from "@/assets/favicon.ico";
import { ModeToggle } from "@/components/ui/ModeToggle";
import React, { useMemo } from "react";
const Typewriter = React.lazy(async () => import("typewriter-effect"));

const Header = () => {
  const typewriter = useMemo(() => {
    return (
      <div className="text-indigo-600">
        <React.Suspense fallback={<div>Text</div>}>
          <Typewriter
            options={{
              autoStart: true,
              delay: 100,
              loop: true,
              strings: ["Text", "PDF", "Image"],
            }}
          />
        </React.Suspense>
      </div>
    );
  }, []);
  return (
    <>
      <div className="flex justify-between items-center my-10 mx-4 z-10 relative">
        <div className="flex flex-row items-center">
          <img src={icon} alt="icon" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-600 tracking-wide dark:text-gray-50">
            Summarizer.
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mx-4 my-16">
        <h1 className="text-4xl text-center sm:text-6xl font-bold text-gray-600 dark:text-gray-50">
          Summarize your {typewriter} with ease.
        </h1>
      </div>
    </>
  );
};

export default Header;
