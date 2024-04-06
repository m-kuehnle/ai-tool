import React, { useState } from "react";
import "./App.css";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./components/ui/button";
import icon from "./assets/favicon.ico";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchOctoAI, countWords } from "./api";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "next-themes";
import { ModeToggle } from "./components/ui/ModeToggle";
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = async () => {
    try {
      setIsFetching(true);

      if (countWords(inputText) < 15) {
        setShowAlert(true);
        return;
      }

      const response = await fetchOctoAI(
        inputText,
        setProgress,
        VITE_OCTOAI_TOKEN
      );
      setOutputText(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutputText("Error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputText(e.target.value);
    setShowAlert(false);
  };

  return (
    <>
      <ThemeProvider attribute="class">
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
        <div className="flex justify-center items-center m-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-indigo-600">
            Get Summary
          </h1>
        </div>
        <div className="flex justify-center items-center m-4">
          <TypewriterEffectSmooth
            words={[
              { text: "Insert Text.", className: "text-gray-600" },
              { text: "Insert File.", className: "text-gray-600" },
            ]}
          />
        </div>

        <div className="m-4">
          <Tabs defaultValue="text-input">
            <TabsList>
              <TabsTrigger value="text-input">Input Text</TabsTrigger>
              <TabsTrigger value="file-input">Upload File</TabsTrigger>
            </TabsList>
            <TabsContent value="text-input">
              <div className="flex flex-col gap-2 items-center my-4 z-10 relative">
                <Textarea
                  placeholder="Insert your text here..."
                  value={inputText}
                  onChange={handleInputChange}
                />
                <Button className="max-w-fit " onClick={handleClick}>
                  Summarize Text
                </Button>

                {showAlert && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Please enter at least 15 words to summarize.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {isFetching && (
                <div className="max-w-60 mx-auto my-4 flex justify-center z-10 relative">
                  <Progress value={progress} />
                </div>
              )}

              {outputText && (
                <div className="bg-gray-100 rounded-md p-4 mx-4 mb-10 z-10 relative">
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Summary:
                  </h2>
                  <div className="border border-gray-600 p-4">
                    <p className="text-gray-800">{outputText}</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent
              className="text-lg font-bold mb-2 text-indigo-600 relative"
              value="file-input"
            >
              <div className="relative md:hidden">
                <Input id="picture" type="file" className="left-0 z-10" />
              </div>
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Input id="picture" type="file" />
              </div>
              <div className="absolute inset-0 bg-gray-300 opacity-50 cursor-not-allowed rounded-md z-0"></div>
            </TabsContent>
          </Tabs>
        </div>

        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dar:opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
