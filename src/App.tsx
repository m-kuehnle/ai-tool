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

// @ts-ignore
import pdfToText from "react-pdftotext";
import Background from "./sections/background";
import FAQ from "./sections/FAQ";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [, setSelectedTab] = useState("text-input");

  const resetStateVariables = () => {
    setInputText("");
    setOutputText("");
    setIsFetching(false);
    setProgress(0);
    setShowAlert(false);
    setPdfText("");
  };

  const extractText = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }

    const file = files[0];
    pdfToText(file)
      .then((text: string) => setPdfText(text))
      .catch(() => console.error("Failed to extract text from pdf"));
  };

  const handleClick = async (text: string) => {
    try {
      setIsFetching(true);

      if (countWords(text) < 15) {
        setShowAlert(true);
        return;
      }

      const response = await fetchOctoAI(text, setProgress, VITE_OCTOAI_TOKEN);
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

  const handleTabChange = (tabValue: string) => {
    setSelectedTab(tabValue);
    resetStateVariables();
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
            ]}
          />
        </div>

        <div className="m-4">
          <Tabs defaultValue="text-input">
            <TabsList>
              <TabsTrigger value="text-input" onClick={() => handleTabChange("text-input")}>
                Input Text
              </TabsTrigger>
              <TabsTrigger value="file-input" onClick={() => handleTabChange("file-input")}>
                Upload PDF
              </TabsTrigger>
              <TabsTrigger value="image-input" onClick={() => handleTabChange("image-input")}>
                Upload Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text-input">
              <Textarea
                placeholder="Insert your text here..."
                value={inputText}
                onChange={handleInputChange}
                className="mt-4 text-gray-600 text-sm"
              />
              <Button
                className="max-w-fit mt-4"
                onClick={() => handleClick(inputText)}
              >
                Summarize Text
              </Button>

              {showAlert && (
                <Alert variant="destructive" className="mt-4 max-w-fit">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Please enter at least 15 words to summarize.
                  </AlertDescription>
                </Alert>
              )}

              {isFetching && (
                <div className="max-w-60 mx-auto mt-4 flex justify-center">
                  <Progress value={progress} />
                </div>
              )}

              {outputText && (
                <div className="bg-gray-100 rounded-md p-4 mt-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Summary:
                  </h2>
                  <p className="text-gray-600 text-sm">{outputText}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="file-input">
              <Input
                type="file"
                className="sm:max-w-fit mt-4"
                accept="application/pdf"
                onChange={extractText}
              />
              {pdfText && (
                <div className="bg-gray-100 rounded-md p-4 mt-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Extracted PDF Text:
                  </h2>
                  <p className="text-gray-600 text-sm">{pdfText}</p>
                </div>
              )}

              <Button
                className="max-w-fit mt-4"
                onClick={() => handleClick(pdfText)}
              >
                Summarize PDF
              </Button>

              {showAlert && (
                <Alert variant="destructive" className="mt-4 max-w-fit">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Please upload a PDF to summarize.
                    
                  </AlertDescription>
                </Alert>
              )}

              {isFetching && (
                <div className="max-w-60 mx-auto mt-4 flex justify-center">
                  <Progress value={progress} />
                </div>
              )}

              {outputText && (
                <div className="bg-gray-100 rounded-md p-4 mt-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Summary:
                  </h2>
                  <p className="text-gray-600 text-sm">{outputText}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="image-input">
              <div className="text-center mt-4 text-indigo-600 font-bold text-4xl">
                Coming Soon.
              </div>
              <div className="text-center mt-4" >
                We are working hard to bring you more Tools. 
              </div>
              
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ Section */}
        <div className="sm:m-40 m-8">
          <h2 className="mb-4 font-bold text-indigo-600 text-3xl mt-[260px] sm:mt-[200px] underline">
            FAQ
          </h2>
          <FAQ />
        </div>


        <Background />
      </ThemeProvider>
    </>
  );
}

export default App;
