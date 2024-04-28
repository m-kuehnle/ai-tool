"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { ChangeEvent, useState } from "react";
import { fetchOctoAI } from "../api";
import { countWords } from "../lib/utils";
import { Clipboard, ClipboardCheckIcon, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// @ts-ignore
import pdfToText from "react-pdftotext";

//import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
//import { pdfexamples } from "@/utils/constants";
import PreviewPDF from "./pdfPreview";
import { WORD_LIMIT_MAX, WORD_LIMIT_MIN } from "../utils/constants";

// AI API-Key
const { VITE_OCTOAI_TOKEN } = import.meta.env;

const PdfInput = () => {
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [copyClipboardSuccess, setCopyClipboardSuccess] = useState(false);
  type PDFFile = string | File | null;
  const [uploadedFile, setUploadedFile] = useState<PDFFile>(null);
  const [errorMessage, seterrorMessage] = useState("");

  const extractText = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(event.target.files ? event.target.files[0] : null);
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
    extractText;

    if (!text) {
      setShowAlert(true);
      setOutputText("");
      seterrorMessage("Please upload a PDF to summarize.");
      return;
    }

    const wordCount = countWords(text);
   

    if (wordCount > WORD_LIMIT_MAX || wordCount < WORD_LIMIT_MIN) {
      setShowAlert(true);
      setOutputText("");
      seterrorMessage(
        `Please make sure the PDF contains ${
          wordCount > WORD_LIMIT_MAX ? "at most" : "at least"
        } ${
          wordCount > WORD_LIMIT_MAX ? WORD_LIMIT_MAX : WORD_LIMIT_MIN
        } words.`
      );
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
    <div className="grid sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:place-content-stretch h-full">
      <div className="overflow-auto bg-white dark:bg-background rounded-md p-4 row-span-full order-2">
        <PreviewPDF initialFile={uploadedFile} />
        {!uploadedFile && (
          <>
            <Skeleton className="w-full h-64" />
          </>
        )}
        {/* {!uploadedFile && (
          <div className="hidden sm:block ">
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
                     extractText;
                     handleClick("hallo das ist beispieltext aus dem pdf nochmal mehr text und noch mehr text und noch mehr und mehr 100 wörter");
                    }}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                </div>
              ))}
            </BentoGrid>
          </div>
        )} */}
      </div>

      <div
        className={`overflow-auto bg-white dark:bg-background rounded-md p-4 sm:row-span-full order-3 ${
          outputText ? "block" : "hidden sm:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
          Summary:
        </h2>
        <p className="text-gray-600 text-sl dark:text-white my-4">
          {outputText}
          {!outputText && (
            <>
              <div className="space-y-2">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </>
          )}
        </p>
      </div>

      {/* Inputfeld und Schaltfläche zum Hochladen */}
      <div className="flex flex-col gap-2 row-auto">
        <div className="flex justify-between gap-2">
          <Input
            type="file"
            className="max-w-fit"
            accept="application/pdf"
            onChange={extractText}
          />
          <Button
            disabled={isFetching}
            className="max-w-fit bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => handleClick(pdfText)}
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing
                ...
              </>
            ) : (
              "Summarize Text"
            )}
          </Button>
        </div>
        {showAlert && (
          <div className="mt-[10px]">
            <CustomAlert message={errorMessage} />
          </div>
        )}
      </div>

      <div className="row-auto order-last">
        {outputText && (
          <Button
            variant="outline"
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
        )}
      </div>

      {/* BentoGrid für mobile Ansicht */}
      {/* <div className="block sm:hidden mt-8">
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
      </div> */}
    </div>
  );
};

export default PdfInput;
