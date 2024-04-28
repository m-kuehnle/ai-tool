import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { fetchOctoAI } from "../api";
import { countWords } from "../lib/utils";
import { Clipboard, ClipboardCheckIcon, Loader2 } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { image_examples } from "@/utils/constants";
import { WORD_LIMIT_MAX, WORD_LIMIT_MIN } from "../utils/constants";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

const ImageInput = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [copyClipboardSuccess, setCopyClipboardSuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const handleClick = async (text: string) => {
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

  const handleImageUpload = async () => {
    if (!uploadedFile) {
      setShowAlert(true);
      seterrorMessage(`Please upload a Image to summarize.`);
      return;
    }
    setIsFetching(true);

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        const extractedText = await extractTextFromImage(uploadedFile);

        const wordCount = countWords(extractedText);
        if (wordCount > WORD_LIMIT_MAX || wordCount < WORD_LIMIT_MIN) {
          setShowAlert(true);
          setOutputText("");
          setIsFetching(false);
          seterrorMessage(
            `Please make sure the Image contains ${
              wordCount > WORD_LIMIT_MAX ? "at most" : "at least"
            } ${
              wordCount > WORD_LIMIT_MAX ? WORD_LIMIT_MAX : WORD_LIMIT_MIN
            } words.`
          );
          return;
        }
        handleClick(extractedText);
      }
    };
    reader.readAsDataURL(uploadedFile);
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const dataUrl = event.target.result as string;
          const {
            data: { text },
          } = await Tesseract.recognize(dataUrl, "eng");
          resolve(text);
        } else {
          reject(new Error("Failed to read image file"));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const convertUrlToFile = async (url: string): Promise<File | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], "image.jpg");
    } catch (error) {
      console.error("Error converting URL to file:", error);
      return null;
    }
  };

  return (
    <>
      <div className="hidden sm:block">
        <div>
          <h3 className="font-bold text-indigo-600 text-center mb-4">
            Try some examples
          </h3>
          <BentoGrid className="max-w-4xl mx-auto">
            {image_examples.map((item, i) => (
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
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  onClick={async () => {
                    const file = await convertUrlToFile(item.header);
                    setUploadedFile(file);
                  }}
                />
              </div>
            ))}
          </BentoGrid>
        </div>
      </div>

      <Input
        type="file"
        className="sm:max-w-fit mt-4"
        accept="image/*"
        capture="environment"
        onChange={(e) =>
          setUploadedFile(e.target.files ? e.target.files[0] : null)
        }
      />
      {uploadedFile && (
        <div className="mt-2 relative">
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded Image"
            style={{ maxWidth: "60%" }}
          />
        </div>
      )}

      <Button
        disabled={isFetching}
        className="max-w-fit mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={handleImageUpload}
      >
        {isFetching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing ...
          </>
        ) : (
          "Summarize Text"
        )}
      </Button>

      {showAlert && (
        <div className="mt-[10px]">
          <CustomAlert message={errorMessage} />
        </div>
      )}

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

      <div className="mt-8 block sm:hidden">
        <div>
          <h3 className="font-bold text-indigo-600 text-center mb-4">
            Try some examples
          </h3>
          <BentoGrid className="max-w-4xl mx-auto">
            {image_examples.map((item, i) => (
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
                  className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  onClick={async () => {
                    const file = await convertUrlToFile(item.header);
                    setUploadedFile(file);
                  }}
                />
              </div>
            ))}
          </BentoGrid>
        </div>
      </div>
    </>
  );
};

export default ImageInput;
