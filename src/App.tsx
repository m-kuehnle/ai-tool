import { ChangeEvent, useState } from "react";
import "./App.css";
import { Textarea } from "./components/ui/textarea";
import { Progress } from "./components/ui/progress";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { fetchOctoAI, countWords } from "./api";
import { Input } from "./components/ui/input";
import { ThemeProvider } from "next-themes";

import Tesseract from "tesseract.js";

// @ts-ignore
import pdfToText from "react-pdftotext";

// Components
import Header from "./sections/header";
import Background from "./sections/background";
import CustomAlert from "./sections/customAlert";

// AI API-Key
const { VITE_OCTOAI_TOKEN } = import.meta.env;

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [summaryText, setSummaryText] = useState(""); // Zustandsvariable für den zusammengefassten Text
  const [, setSelectedTab] = useState("text-input");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Zustandsvariable für das hochgeladene Bild

  const resetStateVariables = () => {
    setInputText("");
    setOutputText("");
    setIsFetching(false);
    setProgress(0);
    setShowAlert(false);
    setPdfText("");
    setUploadedImageUrl("");
    setSummaryText(""); // Zurücksetzen der zusammengefassten Textvariable
    setUploadedFile(null); // Zurücksetzen der hochgeladenen Datei
  };

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
        setSummaryText(summaryText); // Aktualisiere die zusammengefasste Textvariable
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

  const handleImageUpload = async () => {
    // Entfernen Sie den Event-Parameter
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

  const handleTabChange = (tabValue: string) => {
    setSelectedTab(tabValue);
    resetStateVariables();
  };

  return (
    <>
      <ThemeProvider attribute="class">
        <Header />
        <div className="m-4">
          <Tabs defaultValue="text-input">
            <TabsList>
              <TabsTrigger
                value="text-input"
                onClick={() => handleTabChange("text-input")}
              >
                Input Text
              </TabsTrigger>
              <TabsTrigger
                value="file-input"
                onClick={() => handleTabChange("file-input")}
              >
                Upload PDF
              </TabsTrigger>
              <TabsTrigger
                value="image-input"
                onClick={() => handleTabChange("image-input")}
              >
                Upload Image
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text-input">
              <Textarea
                placeholder="Insert your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mt-4 text-gray-600 text-sm"
              />
              <Button
                className="max-w-fit mt-4"
                onClick={() => handleClick(inputText)}
              >
                Summarize Text
              </Button>

              {showAlert && (
                <CustomAlert message="Please enter at least 15 words to summarize." />
              )}

              {isFetching && (
                <div className="max-w-60 mx-auto mt-4 flex justify-center">
                  <Progress value={progress} />
                </div>
              )}

              {outputText && (
                <div className="bg-gray-100 rounded-md p-4 mt-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Summary:
                  </h2>
                  <p className="text-gray-600 text-sm">{outputText}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="file-input">
              <Input
                type="file"
                className="sm:max-w-fit mt-4"
                accept="application/pdf"
                onChange={extractText}
              />
              <Button
                className="max-w-fit mt-4"
                onClick={() => handleClick(pdfText)}
              >
                Summarize PDF
              </Button>

              {showAlert && (
                <CustomAlert message="Please upload a PDF to summarize." />
              )}

              {isFetching && (
                <div className="max-w-60 mx-auto mt-4 flex justify-center">
                  <Progress value={progress} />
                </div>
              )}

              {outputText && (
                <div className="bg-gray-100 rounded-md p-4 mt-4">
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Summary:
                  </h2>
                  <p className="text-gray-600 text-sm">{outputText}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="image-input">
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
                  <h2 className="text-lg font-bold mb-2 text-gray-600 ">
                    Summary:
                  </h2>
                  <p className="text-gray-600 text-sm">{summaryText}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Background />
      </ThemeProvider>
    </>
  );
}

export default App;
