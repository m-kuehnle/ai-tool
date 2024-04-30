import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomAlert from "./customAlert";
import { fetchOctoAI } from "../api";
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { text_examples } from "@/utils/constants";
import { Loader2, Clipboard, ClipboardCheckIcon } from "lucide-react";
import { countWords } from "../lib/utils";
import { WORD_LIMIT_MAX, WORD_LIMIT_MIN } from "../utils/constants";
import { Skeleton } from "@/components/ui/skeleton";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

interface TextInputProps {
  example?: string;
}

const TextInput = ({ example }: TextInputProps) => {
  const [inputText, setInputText] = useState(example);
  const [showAlert, setShowAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copyClipboardSuccess, setCopyClipboardSuccess] = useState(false);

  const handleClick = async (text: string) => {
    if (!text) {
      setShowAlert(true);
      setOutputText("");
      setErrorMessage("Please enter a text to summarize.");
      return;
    }

    const wordCount = countWords(text);
    if (wordCount > WORD_LIMIT_MAX || wordCount < WORD_LIMIT_MIN) {
      setShowAlert(true);
      setOutputText("");
      setErrorMessage(
        `Please make sure the Text contains ${
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
    <>
      {/* Examples */}
      <div className="p-4 hidden md:block">
        <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
          Try some examples
        </h3>
        <BentoGrid className="max-w-4xl mx-auto">
          {text_examples.map((item, i) => (
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
                onClick={() => setInputText(item.input)}
              />
            </div>
          ))}
        </BentoGrid>
      </div>

      {/* Textarea and Summary on desktop */}
      <div className="grid grid-cols-2 gap-4 hidden md:grid">
        {/* Textarea */}
        <div className="p-4 flex flex-col h-full">
          <Textarea
            placeholder="Insert your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="text-gray-600 text-sm flex-grow"
          />
          {/* CustomAlert */}
          {showAlert && (
            <div className="mt-2">
              <CustomAlert message={errorMessage} />
            </div>
          )}
          <Button
            disabled={isFetching}
            className="max-w-fit mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => handleClick(inputText || "")}
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

        {/* Summary */}
        <div className="overflow-auto bg-white dark:bg-background rounded-md p-4 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
            Summary
          </h2>
          <div className="text-gray-600 text-sl dark:text-white my-4 flex-grow">
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
      </div>

      {/* Textarea and Summary on Mobile Device*/}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {/* Textarea */}
        <div className="p-4 flex flex-col h-full">
          <Textarea
            placeholder="Insert your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="text-gray-600 text-sm flex-grow"
          />
          {/* CustomAlert */}
          {showAlert && (
            <div className="mt-2">
              <CustomAlert message={errorMessage} />
            </div>
          )}
          <Button
            disabled={isFetching}
            className="max-w-fit mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => handleClick(inputText || "")}
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
        {/* Summary */}
        <div className="overflow-auto bg-white dark:bg-background rounded-md p-4 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
            Summary
          </h2>
          <div className="text-gray-600 text-sl dark:text-white my-4 flex-grow">
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
      </div>

      {outputText && (
        <div className="p-4 flex sm:mt-[10px] sm:ml-[1030px] flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(outputText);
              setCopyClipboardSuccess(true);
            }}
          >
            {!copyClipboardSuccess ? (
              <>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </>
            ) : (
              <>
                <ClipboardCheckIcon className="mr-2 h-4 w-4 text-emerald-500" />
                Successfully Copied
              </>
            )}
          </Button>
        </div>
      )}

      {/* Examples on Mobile */}
      <div className="p-4 md:hidden">
        <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
          Try some examples
        </h3>
        <BentoGrid className="max-w-4xl mx-auto">
          {text_examples.map((item, i) => (
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
                onClick={() => setInputText(item.input)}
              />
            </div>
          ))}
        </BentoGrid>
      </div>
    </>
  );
};

export default TextInput;
