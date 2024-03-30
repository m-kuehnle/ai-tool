import React, { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "./components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const { VITE_OCTOAI_TOKEN } = import.meta.env;

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isFetching, setIsFetching] = useState(false); // Track if fetching is in progress
  const [progress, setProgress] = useState(0); // Progress percentage
  const [showAlert, setShowAlert] = useState(false); // Track if alert should be shown

  const handleClick = async () => {
    try {
      setIsFetching(true); // Start fetching

      // Check if inputText contains at least 10 words
      if (countWords(inputText) < 15) {
        setShowAlert(true);
        return;
      }
      const response = await fetchOctoAI(inputText);
      setOutputText(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutputText("Error occurred while fetching data.");
    } finally {
      setIsFetching(false); // End fetching
    }
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(e.target.value);
    setShowAlert(false); // Hide alert when input changes
  };

  const fetchOctoAI = async (text: string) => {
    // Simulating progress approximation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 10; // Increment progress by a random value
      if (currentProgress > 90) {
        clearInterval(progressInterval); // Stop interval if progress reaches near completion
      }
      setProgress(Math.min(currentProgress, 100)); // Cap progress at 100%
    }, 500); // Update progress every 500ms

    const requestData = {
      messages: [
        {
          role: "system",
          content: `Summarize the following in German language:${text}`,
        },
      ],
      model: "mixtral-8x7b-instruct-fp16",
      presence_penalty: 0,
      temperature: 0.1,
      top_p: 0.9,
    };

    const response = await fetch(
      "https://text.octoai.run/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${VITE_OCTOAI_TOKEN}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    clearInterval(progressInterval); // Stop interval when fetch is complete
    setProgress(100); // Set progress to 100% when fetch is complete

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  };

  // Function to count words in a string
  const countWords = (text: string) => {
    return text.split(/\s+/).filter((word) => word !== "").length;
  };

  return (
    <>
      <link rel="icon" href="favicon.ico" />

      <div className="flex items-center my-10 ml-4">
        <h1 className="text-xl tracking-wider text-gray-900 mr-4">
          AI Text Summarizer.
        </h1>
        <Avatar>
          <AvatarImage src="favicon.ico" alt="@shadcn" /> 
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <h1 className="md:text-6xl mb-10 text-4xl font-bold text-gray-900 leading-tight text-center">
        <span className="text-indigo-600">Insert Text.</span>
        <br />
        <span className="text-gray-600">Get Summary.</span>
      </h1>

      <div className="flex flex-col gap-2 items-center m-4">
        <Textarea
          placeholder="Insert your text here..."
          value={inputText}
          onChange={handleInputChange}
        />
        {showAlert && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Please enter at least 15 words to summarize.
            </AlertDescription>
          </Alert>
        )}
        <Button className="max-w-fit" onClick={handleClick}>
          Summarize text
        </Button>
      </div>

      {isFetching && (
        <div className="max-w-60 mx-auto my-4 flex justify-center">
          <Progress value={progress} />
        </div>
      )}

      {outputText && (
        <div className="bg-gray-100 rounded-md p-4 m-4">
          <p className="text-gray-800">{outputText}</p>
        </div>
      )}

      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </>
  );
}

export default App;
