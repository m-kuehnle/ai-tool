import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { fetchOctoAI } from "../api";
import { countWords } from "../lib/utils";
import { Clipboard, ClipboardCheckIcon, Loader2 } from "lucide-react";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

const ImageInput = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [copyClipboardSuccess, setCopyClipboardSuccess] = useState(false);

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

  const handleImageUpload = async () => {
    if (!uploadedFile) {
      // Überprüfen, ob eine Datei hochgeladen wurde
      setShowAlert(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        setUploadedImageUrl(target.result as string);
        const extractedText = await extractTextFromImage(uploadedFile);
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

  return (
    <>
      <Input
        type="file"
        className="sm:max-w-fit mt-4"
        accept="image/*"
        capture="environment"
        onChange={(e) =>
          setUploadedFile(e.target.files ? e.target.files[0] : null)
        }
      />
      {uploadedImageUrl && (
        <div className="mt-2 relative">
          <img
            src={uploadedImageUrl}
            alt="Uploaded Image"
            style={{ maxWidth: "100%" }}
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
        <CustomAlert message="This Image contains no Text or was not found" />
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
    </>
  );
};

export default ImageInput;
