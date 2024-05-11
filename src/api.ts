export const fetchOctoAI = async (text: string, VITE_OCTOAI_TOKEN: string) => {
  // Anfrage an die API senden
  const requestData = {
    messages: [
      {
        role: "user",
        content: `Summarize the given text as briefly as possible in English. Place SUMMARY_START before the summary starts and SUMMARY_END after it is finished. This is the given text to summarize: ${text}`,
      },
    ],
    model: "llama-2-13b-chat",
    presence_penalty: 0,
    temperature: 0.1,
    top_p: 0.9,
  };

  const response = await fetch("https://text.octoai.run/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${VITE_OCTOAI_TOKEN}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response");
  }

  const responseData = await response.json();
  // check model and usage statistics
  // console.log("model: ", responseData.model);
  // console.log("usage: ", responseData.usage);
  const summary = extractSummaryText(responseData.choices[0].message.content);
  return summary;
};

function extractSummaryText(summary: string): string {
  const startMark = "SUMMARY_START";
  const endMark = "SUMMARY_END";
  const startIndex = summary.indexOf(startMark) + startMark.length;
  const endIndex = summary.indexOf(endMark);
  return startIndex >= 0 && endIndex >= 0 && endIndex > startIndex
    ? summary.substring(startIndex, endIndex).trim()
    : "Start or end mark not found, or end mark precedes start mark.";
}
