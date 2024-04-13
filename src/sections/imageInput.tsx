import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomAlert from "./customAlert";
import { useState } from "react";
import Tesseract from "tesseract.js";

const ImageInput = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = async () => {
    if (!uploadedFile) {
      // Überprüfen, ob eine Datei hochgeladen wurde
      console.error("No file uploaded");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        setUploadedImageUrl(target.result as string);
        const extractedText = await extractTextFromImage(uploadedFile); // Verwenden Sie die hochgeladene Datei
        setSummaryText(extractedText); // Set the summary text when image is uploaded
      }
    };
    reader.readAsDataURL(uploadedFile); // Verwenden Sie die hochgeladene Datei
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
          <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 -top-9 text-xl text-indigo-600 font-bold text-3xl">
            Your Image:
          </h2>
          <img
            src={uploadedImageUrl}
            alt="Uploaded Image"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}

      <Button className="max-w-fit mt-4" onClick={handleImageUpload}>
        Summarize Image
      </Button>

      {/* Anzeige des zusammengefassten Textes */}
      {summaryText && summaryText.trim() === "" && (
        <div className="mt-4">
          <CustomAlert message="Please upload an image with text to summarize." />
        </div>
      )}

      {/* Anzeige des zusammengefassten Textes */}
      {summaryText && summaryText.trim() !== "" && (
        <div className="bg-gray-100 rounded-md p-4 mt-4">
          <h2 className="text-lg font-bold mb-2 text-gray-600 ">Summary:</h2>
          <p className="text-gray-600 text-sm">{summaryText}</p>
        </div>
      )}
    </>
  );
};

export default ImageInput;
