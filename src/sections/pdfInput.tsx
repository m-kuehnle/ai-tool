"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { ChangeEvent, useState } from "react";
import { fetchOctoAI } from "../api";
import { countWords } from "../lib/utils";
import { Clipboard, ClipboardCheckIcon, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel-custom";

// @ts-ignore
import pdfToText from "react-pdftotext";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { pdfexamples } from "@/utils/constants";
import { WORD_LIMIT_MAX, WORD_LIMIT_MIN } from "../utils/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState("English"); // State für die Sprache

  const initializeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(event.target.files ? event.target.files[0] : null);
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }

    extractTextFromFile(files[0]);
  };

  const extractTextFromFile = async (file: File) => {
    pdfToText(file)
      .then((text: string) => setPdfText(text))
      .catch(() => console.error("Failed to extract text from pdf"));
  };

  const summarizeText = async (text: string) => {
    if (!text) {
      setShowAlert(true);
      setOutputText("");
      setErrorMessage("Please upload a PDF to summarize.");
      return;
    }

    const wordCount = countWords(text);

    if (wordCount > WORD_LIMIT_MAX || wordCount < WORD_LIMIT_MIN) {
      setShowAlert(true);
      setOutputText("");
      setErrorMessage(
        `Please make sure the PDF contains ${
          wordCount > WORD_LIMIT_MAX ? "at most" : "at least"
        } ${
          wordCount > WORD_LIMIT_MAX ? WORD_LIMIT_MAX : WORD_LIMIT_MIN
        } words. Your word count is ${wordCount}.`
      );
      return;
    }
    try {
      setIsFetching(true);
      setShowAlert(false);

      let summaryText = await fetchOctoAI(text, VITE_OCTOAI_TOKEN, language); // Sprache an API-Aufruf übergeben
      setOutputText(summaryText);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutputText("Error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  const src =
    uploadedFile instanceof File
      ? URL.createObjectURL(uploadedFile)
      : uploadedFile || "";

  return (
    <div className="grid sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:place-content-stretch h-full">
      <div className="overflow-auto bg-white dark:bg-background rounded-md p-4 row-span-full order-2">
        {/* PDF Preview und Beispiele */}
        {uploadedFile && (
          <embed
            className="w-full h-full"
            src={src}
            title="PDF Viewer"
            type="application/pdf"
          ></embed>
        )}

        {!uploadedFile && (
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
              Try some examples
            </h3>

            {/* Desktop Examples */}
            <div className="hidden sm:block">
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
                        setUploadedFile(item.input);
                        fetch(item.input)
                          .then((response) => response.blob())
                          .then((blob) => {
                            const file = new File([blob], item.input, {
                              type: "application/pdf",
                            });
                            extractTextFromFile(file);
                          })
                          .catch((error) =>
                            console.error("Error fetching PDF:", error)
                          );
                      }}
                      className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                  </div>
                ))}
              </BentoGrid>
            </div>

            {/* Mobile Examples */}
            <Carousel className="block sm:hidden">
              <CarouselContent>
                {pdfexamples.map((item, i) => (
                  <CarouselItem key={i}>
                    <div className="p-1">
                      <Card
                        onClick={() => {
                          setUploadedFile(item.input);
                          fetch(item.input)
                            .then((response) => response.blob())
                            .then((blob) => {
                              const file = new File([blob], item.input, {
                                type: "application/pdf",
                              });
                              extractTextFromFile(file);
                            })
                            .catch((error) =>
                              console.error("Error fetching PDF:", error)
                            );
                        }}
                      >
                        <CardContent className="flex flex-col justify-between items-center p-6">
                          <img
                            src={item.header}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-xl my-4"
                          />
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>

      {/* Summary Output */}
      <div
        className={`overflow-auto bg-white dark:bg-background rounded-md p-4 sm:row-span-full order-3 ${
          outputText ? "block" : "hidden sm:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
          Summary
        </h2>
        <div className="text-gray-600 text-sl dark:text-white my-4">
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
        </div>
      </div>

      {/* Inputfeld und Schaltfläche zum Hochladen */}
      <div className="flex flex-col gap-2 row-auto">
        <div className="flex justify-between gap-2">
          <Input
            type="file"
            className="max-w-fit"
            accept="application/pdf"
            onChange={initializeFile}
            disabled={isFetching}
          />
            <Select onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            disabled={!uploadedFile || isFetching}
            className={`max-w-fith-full bg-indigo-600 hover:bg-indigo-700 text-white  ${
              (!uploadedFile || isFetching) && "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => summarizeText(pdfText)}
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing
                ...
              </>
            ) : (
              "Summarize"
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
    </div>
  );
};

export default PdfInput;
