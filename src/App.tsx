import React, { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const SUMARIZE_URL = "http://localhost:5173/summarize";


function App() {
  // Zustand zum Speichern des Textes
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [summary, setSummary] = useState(""); // TypeScript wird den Typ für summary automatisch ableiten
  const [isLoading, setIsLoading] = useState(false); 
  
  // Funktion, die aufgerufen wird, wenn der Button geklickt wird
  const handleClick = () => {
    // Hier wird der im Input-Feld eingegebene Text in den outputText-Zustand gesetzt
    setOutputText(inputText);
    summarizeText(inputText);
  };

  // Funktion zum Aktualisieren des eingegebenen Textzustands
  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(e.target.value);
  };

  const summarizeText = (text: any) => {
    fetch(SUMARIZE_URL, {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setSummary(data.message.content);
      });
  };

  return (
    <>
      <h1>AI Tool</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Text ..."
          value={inputText}
          onChange={handleInputChange}
        />
        <Button onClick={handleClick}>Summarize</Button>

      </div>

      {outputText && (
        <div className="bg-[#fafafa] text-[#333] p-4 mt-4">
          <p>{summary}</p>
        </div>
        
      )}
    </>
  );
}

export default App;
