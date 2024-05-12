// Function to remove unwanted characters from the text
function sanitizeTextInput(input: string): string {
  // Regular expression to match allowed characters
  const regex = /[^a-zA-Z0-9\s+$%&-]/g;
  // Filter out unwanted characters using the regular expression
  const sanitizedInput = input.replace(regex, "");

  return sanitizedInput;
}

// Function to fetch the summary from OctoAI
export const fetchOctoAI = async (text: string, VITE_OCTOAI_TOKEN: string) => {
  try {
    // Filter the text
    const filteredText = sanitizeTextInput(text);
    console.log("Filtered text:", filteredText);

    // Fetch the summary
    const summary = await fetchSummary(filteredText, VITE_OCTOAI_TOKEN);
    return summary;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return "Error fetching data: " + error.message;
  }
};

// Function to fetch a summary for the text
const fetchSummary = async (text: string, token: string): Promise<string> => {
  const requestData = {
    messages: [
      {
        role: "user",
        content: `Provide an overall briefly as possible summary about the given input text in English not in bold. Place SUMMARY_START before the summary starts and SUMMARY_END after it is finished. This is the given text to summarize: ${text} `,
      },
    ],
    model: "meta-llama-3-8b-instruct",
    presence_penalty: 0,
    temperature: 0.1,
    top_p: 0.9,
  };

  const response = await fetch("https://text.octoai.run/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response");
  }

  const responseData = await response.json();
  const summary = extractSummaryText(responseData.choices[0].message.content);
  return summary;
};

// Function to extract the summary from the API response
function extractSummaryText(summary: string): string {
  const startMark = "SUMMARY_START";
  const endMark = "SUMMARY_END";
  const startIndex = summary.indexOf(startMark) + startMark.length;
  const endIndex = summary.indexOf(endMark);
  return startIndex >= 0 && endIndex >= 0 && endIndex > startIndex
    ? summary.substring(startIndex, endIndex).trim()
    : "Start or end mark not found, or end mark precedes start mark.";
}