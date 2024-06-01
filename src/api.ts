export const fetchOctoAI = async (text: string, token: string, language: string): Promise<string> => {
  const requestData = {
    messages: [
      {
        role: "user",
        content: `Provide an overall briefly as possible summary about the given input text. Make sure the summary is in ${language}. The text should be not in bold. Place SUMMARY_START before the summary starts and SUMMARY_END after it is finished. This is the given text to summarize: ${text}`,
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
