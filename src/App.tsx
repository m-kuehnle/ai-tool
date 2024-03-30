import React, { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const { VITE_OCTOAI_TOKEN } = import.meta.env;

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetchOctoAI(inputText);
      setOutputText(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutputText("Error occurred while fetching data.");
    }
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputText(e.target.value);
  };

  const fetchOctoAI = async (text: string) => {
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

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  };

  return (
    <>
      <div className="flex flex-start my-10">
        <p className="text-xl tracking-wider text-gray-900">
          AI Text Summarizer.
        </p>
      </div>
      <h1 className="md:text-6xl mb-10 text-4xl font-bold text-gray-900 leading-tight text-center">
        <span className="text-indigo-600">Insert Text.</span>
        <br />
        <span className="text-gray-600">Get Summary.</span>
      </h1>

      <div className="flex flex-col gap-2 items-center">
        <Textarea
          placeholder="Insert your text here..."
          value={inputText}
          onChange={handleInputChange}
        />
        <Button className="max-w-fit" onClick={handleClick}>
          Summarize text
        </Button>
      </div>

      {outputText && (
        <div className="bg-gray-100 rounded-md shadow-md p-4 my-4">
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
