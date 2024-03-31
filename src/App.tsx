import React, { useState } from "react";
import "./App.css";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./components/ui/button";
import icon from "./assets/favicon.ico";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

function App() {
  // Zustände initialisieren
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [fileSummarizerClicked] = useState(false);

  // Funktion zum Verarbeiten des Klicks auf die Schaltfläche
  const handleClick = async () => {
    try {
      setIsFetching(true);

      // Überprüfen, ob die Eingabe mehr als 15 Wörter enthält
      if (countWords(inputText) < 15) {
        setShowAlert(true);
        return;
      }
      // Anfrage an die API senden und Antwort verarbeiten
      const response = await fetchOctoAI(inputText);
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

  // Funktion zum Abrufen der Daten von der API
  const fetchOctoAI = async (text: string) => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 90) {
        clearInterval(progressInterval);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 500);

    // Anfrage an die API senden
    const requestData = {
      messages: [
        {
          role: "system",
          content: `summarize the text as briefly as possible and that all important things are in the text in german language ${text}`,
        },
      ],
      model: "mixtral-8x7b-instruct-fp16",
      presence_penalty: 0,
      temperature: 0.1,
      top_p: 0.9,
    };

    const response = await fetch(
      "https://text.octoai.run/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_OCTOAI_TOKEN}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    clearInterval(progressInterval);
    setProgress(100);

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  };

  // Funktion zum Zählen der Wörter in einem Text
  const countWords = (text: string) => {
    return text.split(/\s+/).filter((word) => word !== "").length;
  };

  // HTML UND TAILWINDCSS CODE
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center my-10 mx-4">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
          AI Text Summarizer.
        </h1>
        <div className="flex items-center justify-center">
          <img src={icon} alt="icon" className="w-12 h-12" />
        </div>
      </div>

      <h1 className="md:text-6xl mb-10 text-4xl font-bold text-gray-900 leading-tight text-center">
        <span className="text-indigo-600">Insert Text.</span>
        <br />
        <span className="text-gray-600">Get Summary.</span>
      </h1>

      {/* Texteingabe und Schaltfläche */}
      <div className="flex flex-col gap-2 items-center m-4">
        <Textarea
          placeholder="Insert your text here..."
          value={inputText}
          onChange={handleInputChange}
        />
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

        {/* Schaltfläche zum Zusammenfassen des Textes */}
        <Button className="max-w-fit" onClick={handleClick}>
          Summarize text
        </Button>
      </div>
      {/* Ladeanimation anzeigen, falls Daten abgerufen werden */}
      {isFetching && (
        <div className="max-w-60 mx-auto my-4 flex justify-center">
          <Progress value={progress} />
        </div>
      )}

      {/* Zusammenfassungstext anzeigen, falls vorhanden und Datei-Zusammenfasser nicht geklickt wurde */}
      {outputText && !fileSummarizerClicked && (
        <div className="bg-gray-100 rounded-md p-4 mx-4 mb-10">
          <p className="text-gray-800">{outputText}</p>
        </div>
      )}

      {/* Hintergrund für Datei-Zusammenfasser anzeigen, falls geklickt */}
      {fileSummarizerClicked && (
        <div className="absolute inset-0 bg-white"></div>
      )}

      {/* Grafische Hintergrundanimation */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </>
  );
}

export default App;
