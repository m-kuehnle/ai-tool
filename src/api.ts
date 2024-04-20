// api.ts
// Api abfragen 
export const fetchOctoAI = async (text: string, setProgress: (progress: number) => void, VITE_OCTOAI_TOKEN: string) => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 90) {
        clearInterval(progressInterval);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 500);

    // Anfrage an die API senden
    const requestData = {
      messages: [
        {
          role: "system",
          content: `provide a brief summary of the following text in english: ${text}`,
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

    clearInterval(progressInterval);
    setProgress(100);

    const responseData = await response.json();
    return responseData.choices[0].message.content;
};



// Funktion zum Zählen der Wörter in einem Text

export const countWords = (text: string) => {
    return text.split(/\s+/).filter((word) => word !== "").length;
}