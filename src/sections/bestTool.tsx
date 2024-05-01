import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import settings from "@/assets/settings.png";
import Confetti from "react-confetti";
import Footer from "./footer";

export function BestTool() {
  const [isVisible, setIsVisible] = useState(false);
  const [checkedState, setCheckedState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const containerRef = useRef(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      timerRef.current = setTimeout(() => {
        const nextIndex = checkedState.findIndex((checked) => !checked);
        if (nextIndex !== -1) {
          const newCheckedState = [...checkedState];
          newCheckedState[nextIndex] = true;
          setCheckedState(newCheckedState);
        }
      }, 1000);

      return () => {
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isVisible, checkedState]);

  useEffect(() => {
    const allChecked = checkedState.every((checked) => checked);
    if (allChecked) {
      setTimeout(() => {
        setCheckedState([false, false, false, false, false]); // Reset Checkbox states
      }, 5000); // Reset Checkbox states after 5 seconds
    }
  }, [checkedState]);

  return (
    <>

    {/* MOBILE */}
      <div className="md:hidden">
        <div ref={containerRef}>
          <h1 className="ml-[10px] font-medium text-indigo-600 text-2xl mb-[10px]">
            What are the factors,<br></br> that make our summarizer <br></br> the best?
          </h1>
          {isVisible && checkedState.every((checked) => checked) && (
            <div
              style={{
                position: "relative",
                marginLeft: "110px",
                marginTop: "-10px",
                width: 1000, // Breite des Konfetti-Effekts in Pixel
                height: 1, // Höhe des Konfetti-Effekts in Pixel
              }}
            >
              <Confetti width={400} height={400} />
            </div>
          )}
          <p className="text-gray-400 ml-[10px] ">
            Look at these factors that make our summarizer <br></br> the best
          </p>

          <div className="flex items-center space-x-2 mt-[200px] ml-[80px]">
            <Checkbox id="terms1" checked={checkedState[0]} />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              100 % Free and no ads
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[160px]">
            <Checkbox id="terms2" checked={checkedState[1]} />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              AI Techniques
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[80px]">
            <Checkbox id="terms3" checked={checkedState[2]} />
            <label
              htmlFor="terms3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              No sign up or registration.
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[160px]">
            <Checkbox id="terms4" checked={checkedState[3]} />
            <label
              htmlFor="terms4"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              One-time response
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[80px]">
            <Checkbox id="terms5" checked={checkedState[4]} />
            <label
              htmlFor="terms5"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              No security or data leakage risk
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-[50px] ml-[160px]">
            <Checkbox id="terms5" checked={checkedState[4]} />
            <label
              htmlFor="terms6"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Generate various summaries
            </label>
          </div>

          <img
            className="w-[200px] h-[] object-cover rounded-xl ml-[100px] mt-[-560px]"
            src={settings}
            alt="Image Description"
          />
        </div>
        <div className="mt-[400px]">
         <Footer/>

        </div>
       
      </div>







        {/* DESKTOP */}
      <div className="hidden md:block">
        <div ref={containerRef}>
          <h1 className="ml-[110px] font-medium text-indigo-600 text-3xl mb-[10px]">
            What are the factors,<br></br> that make our summarizer the best?
          </h1>
          {isVisible && checkedState.every((checked) => checked) && (
            <div
              style={{
                position: "relative",
                marginLeft: "110px",
                marginTop: "-10px",
                width: 1000, // Breite des Konfetti-Effekts in Pixel
                height: 1, // Höhe des Konfetti-Effekts in Pixel
              }}
            >
              <Confetti width={400} height={400} />
            </div>
          )}
          <p className="text-gray-400 ml-[110px] ">
            Look at these factors that make our summarizer the best
          </p>

          <div className="flex items-center space-x-2 mt-[50px] ml-[200px]">
            <Checkbox id="terms1" checked={checkedState[0]} />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              100 % Free and no ads
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[300px]">
            <Checkbox id="terms2" checked={checkedState[1]} />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              AI Techniques
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[200px]">
            <Checkbox id="terms3" checked={checkedState[2]} />
            <label
              htmlFor="terms3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              No sign up or registration.
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[300px]">
            <Checkbox id="terms4" checked={checkedState[3]} />
            <label
              htmlFor="terms4"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              One-time response
            </label>
          </div>

          <div className="flex items-center space-x-2 mt-[50px] ml-[200px]">
            <Checkbox id="terms5" checked={checkedState[4]} />
            <label
              htmlFor="terms5"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              No security or data leakage risk
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-[50px] ml-[300px]">
            <Checkbox id="terms5" checked={checkedState[4]} />
            <label
              htmlFor="terms6"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Generate various summaries
            </label>
          </div>

          <img
            className="w-[] h-[] object-cover rounded-xl ml-[660px] mt-[-400px]"
            src={settings}
            alt="Image Description"
          />
        </div>

        <div className="mt-[100px]">
         <Footer/>

        </div>
      </div>
    </>
  );
}

export default BestTool;
