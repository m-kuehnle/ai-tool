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
          content: "Bitte fasse folgenden Text auf Deutsch sehr kurz zusammen:",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "llama-2-13b-chat",
      max_tokens: 128,
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
      <h1>AI TOOL</h1>
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Type your message here."
          value={inputText}
          onChange={handleInputChange}
        />
        <Button onClick={handleClick}>Send message</Button>
      </div>

      {outputText && (
        <div className="bg-[#fafafa] text-[#333] p-4 mt-4">
          <p>{outputText}</p>
        </div>
      )}
    </>
  );
}

export default App;
