import { useState } from "react";
import { generateAssistantResponse } from "../utils/alertUtils";
 
function AssistantPanel() {
  const [question, setQuestion] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState(
    "Ask me something like: Explain alert A-1003"
  );
 
  const handleAskAssistant = () => {
    const response = generateAssistantResponse(question);
    setAssistantAnswer(response);
  };
 
  return (
<div id="assistant" className="assistant-box">
<h2>AI Alert Assistant</h2>
<p>
        Ask the assistant to explain alerts, show critical incidents, or generate
        a daily SOC summary.
</p>
 
      <div className="example-prompts">
<button onClick={() => setQuestion("Explain alert A-1003")}>
          Explain alert A-1003
</button>
 
        <button onClick={() => setQuestion("Show critical alerts")}>
          Show critical alerts
</button>
 
        <button onClick={() => setQuestion("Generate daily summary")}>
          Generate daily summary
</button>
</div>
 
      <div className="input-row">
<input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: Explain alert A-1003"
        />
 
        <button onClick={handleAskAssistant}>Ask</button>
</div>
 
      <div className="answer-box">
<h3>Assistant Response</h3>
<p>{assistantAnswer}</p>
</div>
</div>
  );
}
 
export default AssistantPanel;
