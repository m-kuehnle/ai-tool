import React, { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  // Zustand zum Speichern des Textes
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Funktion, die aufgerufen wird, wenn der Button geklickt wird
  const handleClick = () => {
    // Hier wird der im Input-Feld eingegebene Text in den outputText-Zustand gesetzt
    setOutputText(inputText);
  };

  // Funktion zum Aktualisieren des eingegebenen Textzustands
  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputText(e.target.value);
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
          <p>{outputText}</p>
        </div>
      )}
    </>
  );
}

export default App;
