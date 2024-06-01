import project from "@/assets/project.svg";
import { Button } from "@/components/ui/button";

export function Steps() {
  const scrollToSummarizer = (e: { preventDefault: () => void }) => {
    // Prevent the default link behavior from occurring.
    e.preventDefault();

    // Get the Summarizer section element.
    const summarizerElement = document.getElementById("summarizer");

    // If the element exists, scroll it into view using the "smooth" animation.
    if (summarizerElement) {
      summarizerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="max-w-5xl px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20 mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-indigo-600 font-semibold text-2xl md:text-4xl md:leading-tight ">
            How to use the Summarizer?
          </h2>
          <p className="mt-1 text-neutral-400">
            Follow these simple steps to get your text, PDF, or image
            summarized.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <img
              className="w-full object-cover rounded-xl"
              src={project}
              alt="Image Description"
            />
          </div>

          <div>
            <div className="mb-4">
              <h3 className="text-indigo-600 text-xs font-medium uppercase">
                Steps
              </h3>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-indigo-600 font-semibold text-xs uppercase rounded-full">
                    1
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-indigo-600">Prepare</span>
                  <br></br>
                  Make sure your text contains at least 50 and at most 10,000
                  words.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-indigo-600 font-semibold text-xs uppercase rounded-full">
                    2
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-indigo-600">Insert</span>
                  <br></br>
                  Insert the text, PDF, or image in the provided field.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-indigo-600 font-semibold text-xs uppercase rounded-full">
                    3
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-indigo-600">Summarize</span>
                  <br></br>
                  Press the 'Summarize' button.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-indigo-600 font-semibold text-xs uppercase rounded-full">
                    4
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-indigo-600">Check</span>
                  <br></br>
                  Review your summarized text to ensure its coherence and
                  accuracy.
                </p>
              </div>
            </div>

            <a href="#summarizer" onClick={scrollToSummarizer}>
              <Button variant="outline">Use it now</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
