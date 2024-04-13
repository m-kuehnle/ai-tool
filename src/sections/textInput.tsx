import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import CustomAlert from "./customAlert";
import { Progress } from "@/components/ui/progress";
import { fetchOctoAI } from "../api"; // 'countWords' function is not needed here anymore

const { VITE_OCTOAI_TOKEN } = import.meta.env;

// Diese Funktion wird von 'api.ts' importiert
const countWords = (text: string) => {
  return text.split(/\s+/).filter((word) => word !== "").length;
};

const TextInput = () => {
  const [inputText, setInputText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [progress, setProgress] = useState(0);

  const handleClick = async (text: string) => {
    try {
      setIsFetching(true);

      // Setze den Alert zurück
      setShowAlert(false);

      if (text && text.trim() !== "") {
        if (countWords(text) > 10000) {
          // Wenn mehr als 10.000 Wörter eingegeben wurden, zeige einen Alert an
          setShowAlert(true);
          return;
        }

        let summaryText = text;

        if (countWords(text) >= 15) {
          summaryText = await fetchOctoAI(text, setProgress, VITE_OCTOAI_TOKEN);
        }

        setOutputText(summaryText);
      } else {
        setShowAlert(true); // Zeige eine Warnung an, wenn kein Text eingegeben wurde
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutputText("Error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Textarea
        placeholder="Insert your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="mt-4 text-gray-600 text-sm"
      />
      <Button className="max-w-fit mt-4" onClick={() => handleClick(inputText)}>
        Summarize Text
      </Button>

      {showAlert && (
        <CustomAlert message={countWords(inputText) > 10000 ? "You can only enter 10.000 words." : "Please enter at least 15 words to summarize."} />
      )}

      {isFetching && (
        <div className="max-w-60 mx-auto mt-4 flex justify-center">
          <Progress value={progress} />
        </div>
      )}

      {outputText && (
        <div className="bg-gray-100 rounded-md p-4 mt-4">
          <h2 className="text-xl font-bold mb-2 text-gray-600 ">Summary:</h2>
          <p className="text-gray-600 text-sl">{outputText}</p>
        </div>
      )}
    </>
  );
};

export default TextInput;
