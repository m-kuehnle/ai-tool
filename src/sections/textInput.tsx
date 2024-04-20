import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomAlert from "./customAlert";
import { fetchOctoAI } from "../api";
import { useState } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { items } from "@/utils/constants";
import { Clipboard, ClipboardCheckIcon, Loader2 } from "lucide-react";
import { countWords } from "../lib/utils";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

interface TextInputProps {
  example?: string;
}

const TextInput = ({ example }: TextInputProps) => {
  const [inputText, setInputText] = useState(example);
  const [showAlert, setShowAlert] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [summary] = useState("");
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
        disabled={isFetching}
        className="max-w-fit mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => handleClick(inputText || "")}
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
        <CustomAlert
          message={
            countWords(inputText ?? "") > 10000
              ? "You can only enter 10.000 words."
              : "Please enter at least 15 words to summarize."
          }
        />
      )}

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
    </>
  );
};

export default TextInput;
