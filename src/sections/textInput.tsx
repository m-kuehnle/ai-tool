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
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel-custom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [language, setLanguage] = useState("English"); // State für die Sprache

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

  return (
    <div className="grid sm:grid-cols-2 sm:grid-rows-2 gap-4 sm:place-content-stretch h-full">
      <div className="overflow-auto bg-white dark:bg-background rounded-md p-4 row-span-full order-2">
        <Textarea
          placeholder="Insert your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="text-gray-600 text-sm flex-grow"
        />

        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-gray-600 dark:text-white">
            Try some examples
          </h3>
          <div className="hidden sm:block">
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

          <Carousel className="block sm:hidden">
            <CarouselContent>
              {text_examples.map((item, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <Card onClick={() => setInputText(item.input)}>
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
      </div>

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

      <div className="flex flex-col gap-2 row-auto">
        <div className="flex justify-end gap-2">
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
            disabled={!inputText || isFetching}
            className={`max-w-fit bg-indigo-600 hover:bg-indigo-700 text-white ${
              (!inputText || isFetching) && "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => handleClick(inputText || "")}
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

export default TextInput;
