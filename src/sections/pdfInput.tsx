import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { Progress } from "@/components/ui/progress";
import { ChangeEvent, useState } from "react";
import { fetchOctoAI, countWords } from "../api";

// @ts-ignore
import pdfToText from "react-pdftotext";

// AI API-Key
const { VITE_OCTOAI_TOKEN } = import.meta.env;

const PdfInput = () => {
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [pdfText, setPdfText] = useState("");

  const extractText = async (event: ChangeEvent<HTMLInputElement>) => {
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

      if (text && text.trim() !== "") {
        // Überprüfen, ob der Text nicht leer ist
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
      <Input
        type="file"
        className="sm:max-w-fit mt-4"
        accept="application/pdf"
        onChange={extractText}
      />
      <Button className="max-w-fit mt-4" onClick={() => handleClick(pdfText)}>
        Summarize PDF
      </Button>

      {showAlert && <CustomAlert message="Please upload a PDF to summarize." />}

      {isFetching && (
        <div className="max-w-60 mx-auto mt-4 flex justify-center">
          <Progress value={progress} />
        </div>
      )}

      {outputText && (
        <div className="bg-gray-100 rounded-md p-4 mt-4">
          <h2 className="text-lg font-bold mb-2 text-gray-600 ">Summary:</h2>
          <p className="text-gray-600 text-sm">{outputText}</p>
        </div>
      )}
    </>
  );
};

export default PdfInput;
