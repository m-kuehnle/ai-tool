import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomAlert from "./customAlert";
import { Progress } from "@/components/ui/progress";
import { fetchOctoAI } from "../api";
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { items } from "@/utils/constants";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

const countWords = (text: string) => {
  return text.split(/\s+/).filter((word) => word !== "").length;
};

interface TextInputProps {
  example?: string;
}

const TextInput = ({ example }: TextInputProps) => {
  const [inputText, setInputText] = useState(example);
  const [showAlert, setShowAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [progress, setProgress] = useState(0);
  const [summary] = useState("");

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
      <div className="mt-8 hidden sm:block">
        <div>
          <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
              <div key={i}>
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  onClick={() => setInputText(item.example_text)}
                />
              </div>
            ))}
          </BentoGrid>
          <div>{summary}</div>
        </div>
      </div>

      <Textarea
        placeholder="Insert your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="mt-4 text-gray-600 text-sm"
      />
      <Button
        className="max-w-fit mt-4"
        onClick={() => handleClick(inputText || "")}
      >
        Summarize Text
      </Button>

      <div className="mt-8 block sm:hidden">
        <div>
          <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
              <div key={i}>
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  onClick={() => setInputText(item.example_text)}
                />
              </div>
            ))}
          </BentoGrid>
          <div>{summary}</div>
        </div>
      </div>

      {showAlert && (
        <CustomAlert
          message={
            countWords(inputText || "") > 10000
              ? "You can only enter 10.000 words."
              : "Please enter at least 15 words to summarize."
          }
        />
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