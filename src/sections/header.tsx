import icon from "@/assets/logo.png";
import { ModeToggle } from "@/components/ui/ModeToggle";
import React, { useMemo } from "react";
const Typewriter = React.lazy(async () => import("typewriter-effect"));

const Header = () => {
  const typewriter = useMemo(() => {
    return (
      <a href="#" onClick={() => window.location.reload()}>
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
      </a>
    );
  }, []);

  return (
    <>
      <div className="flex justify-between items-center my-10 mx-4 z-10 relative">
        <div className="flex flex-row items-center fixed">
          <a href="#" onClick={() => window.location.reload()}>
            <img src={icon} alt="icon" className="w-12 h-12 mr-2" />
          </a>
          <a href="#" onClick={() => window.location.reload()}>
            <h1 className="text-2xl mt-[-15px]  fixed font-semibold text-gray-600 tracking-wide dark:text-gray-50">
              Summarizer.
            </h1>
          </a>
        </div>
        <div className="flex items-center justify-center fixed ml-[1210px]">
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
