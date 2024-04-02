// IMPORTS

import React, { useState } from "react";
import "./App.css";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./components/ui/button";
import icon from "./assets/favicon.ico";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchOctoAI, countWords } from "./api+countWords"; // Importiere die Funktionen aus der api.ts Datei

const { VITE_OCTOAI_TOKEN } = import.meta.env;

// FUNKTIONEN

function App() {
  // Zustände initialisieren
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  // Funktion zum Verarbeiten des Klicks auf die Schaltfläche
  const handleClick = async () => {
    try {
      setIsFetching(true);

      // Überprüfen, ob die Eingabe mehr als 15 Wörter enthält
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

  // Funktion zum Aktualisieren des Eingabefelds
  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputText(e.target.value);
    setShowAlert(false);
  };

  // HTML UND TAILWINDCSS CODE
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center my-10 mx-4 z-10 relative">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
          AI-Tool.
        </h1>
        <div className="flex items-center justify-center">
          <img src={icon} alt="icon" className="w-12 h-12" />
        </div>
      </div>

      {/* Titel */}
      <div className="md:text-6xl mb-10 text-4xl font-bold text-gray-900 leading-tight text-center z-10 relative">
        <span className="text-indigo-600">AI Summarizer.</span>
        <br />
        <span className="text-gray-600">Insert Text.</span>
        <br />
        <span className="text-gray-600">Insert File.</span>
        <br />
        <span className="text-indigo-600">Get Summary.</span>
      </div>

      {/* Tabs um den Text oder Files auszuwählen um zu summarizen */}
      <div className="mt-7">
        <Tabs defaultValue="text-input" className="">
          <TabsList>
            <TabsTrigger value="text-input">Input Text</TabsTrigger>
            <TabsTrigger value="file-input">Upload File</TabsTrigger>
          </TabsList>
          <TabsContent value="text-input">
            {/* Texteingabe und Schaltfläche */}
            <div className="flex flex-col gap-2 items-center m-4 z-10 relative">
              <Textarea
                placeholder="Insert your text here..."
                value={inputText}
                onChange={handleInputChange}
              />
              <Button className="max-w-fit " onClick={handleClick}>
                Summarize Text
              </Button>

              {/* Fehlermeldung anzeigen, falls erforderlich */}
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
            {/* Ladeanimation anzeigen, falls Daten abgerufen werden */}
            {isFetching && (
              <div className="max-w-60 mx-auto my-4 flex justify-center z-10 relative">
                <Progress value={progress} />
              </div>
            )}
            {/* Zusammenfassungstext anzeigen, falls vorhanden und Datei-Zusammenfasser nicht geklickt wurde */}
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
            className="text-lg font-bold mb-2 text-indigo-600 "
            value="file-input"
          >
            Coming Soon.
          </TabsContent>
        </Tabs>
      </div>

      {/* Grafische Hintergrundanimation  1 */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* Grafische Hintergrundanimation  2 */}
      <div
        className="absolute bottom-0 right-0 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        style={{ overflow: "visible" }}
      >
        <div
          className="relative w-[50rem] h-[50rem] rotate-[30deg] bg-gradient-to-tr from-indigo-600 to-indigo-700 opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            right: "20%", // Positionierung am rechten Rand
            bottom: "-60%", // Positionierung am unteren Rand
          }}
        />
      </div>
    </>
  );
}

export default App;
