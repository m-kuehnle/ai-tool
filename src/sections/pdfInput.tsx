import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { ChangeEvent, useState } from "react";
import { fetchOctoAI } from "../api";
import { countWords } from "../lib/utils";
import { Clipboard, ClipboardCheckIcon, Loader2 } from "lucide-react";

// @ts-ignore
import pdfToText from "react-pdftotext";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { pdfexamples } from "@/utils/constants";
// AI API-Key
const { VITE_OCTOAI_TOKEN } = import.meta.env;

const PdfInput = () => {
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [copyClipboardSuccess, setCopyClipboardSuccess] = useState(false);

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
    if (countWords(text) > 10000 || countWords(text) < 15) {
      setShowAlert(true);
      setOutputText("");
      return;
    }
    try {
      setIsFetching(true);
      setShowAlert(false);

      let summaryText = await fetchOctoAI(text, VITE_OCTOAI_TOKEN);
      setOutputText(summaryText);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutputText("Error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      {/* BentoGrid für Desktop-Ansicht */}
      <div className="hidden sm:block mt-8">
        <div>
          <h3 className="font-bold text-indigo-600 text-center mb-4">
            Try some examples
          </h3>
          <BentoGrid className="max-w-4xl mx-auto">
            {pdfexamples.map((item, i) => (
              <div key={i}>
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={
                    <img
                      src={item.header}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  }
                  onClick={() => {
                    if (item.pdf) {
                      window.open(item.pdf, "_blank");
                    } else {
                      console.error("PDF not available for this example");
                    }
                  }}
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
              </div>
            ))}
          </BentoGrid>
        </div>
      </div>

      {/* Inputfeld und Schaltfläche zum Hochladen */}
      <Input
        type="file"
        className="sm:max-w-fit mt-4"
        accept="application/pdf"
        onChange={extractText}
      />
      <Button
        disabled={isFetching}
        className="max-w-fit mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => handleClick(pdfText)}
      >
        {isFetching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing ...
          </>
        ) : (
          "Summarize Text"
        )}
      </Button>
      {showAlert && <CustomAlert message="Please upload a PDF to summarize." />}

      {/* Anzeige des zusammengefassten Textes */}
      {outputText && (
        <div className="bg-white dark:bg-background  rounded-md p-4 mt-4">
          <h2 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
            Summary:
          </h2>
          <p className="text-gray-600 text-sl dark:text-white my-4">
            {outputText}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(outputText);
              setCopyClipboardSuccess(true);
            }}
          >
            {!copyClipboardSuccess && (
              <>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </>
            )}
            {copyClipboardSuccess && (
              <>
                <ClipboardCheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                Successfully Copied
              </>
            )}
          </Button>
        </div>
      )}

      {/* BentoGrid für mobile Ansicht */}
      <div className="block sm:hidden mt-8">
        <div>
          <h3 className="font-bold text-indigo-600 text-center mb-4">
            Try some examples
          </h3>
          <BentoGrid className="max-w-4xl mx-auto">
            {pdfexamples.map((item, i) => (
              <div key={i}>
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={
                    <img
                      src={item.header}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  }
                  onClick={() => {
                    if (item.pdf) {
                      window.open(item.pdf, "_blank");
                    } else {
                      console.error("PDF not available for this example");
                    }
                  }}
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
              </div>
            ))}
          </BentoGrid>
        </div>
      </div>
    </>
  );
};

export default PdfInput;
