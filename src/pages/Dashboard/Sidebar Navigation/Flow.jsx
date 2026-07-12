// SidebarNavigation/Flow.jsx

import { useState } from "react";
import FlowSetup from "./Flow/FlowSetup";
import FlowSession from "./Flow/FlowSession";
import FlowComplete from "./Flow/FlowComplete";

export default function Flow() {
  const [stage, setStage] = useState("setup"); // "setup" | "session" | "complete"

  const [flowData, setFlowData] = useState({
    mainGoal: "",
    duration: null, // in minutes
    subGoals: [], // [{ id, text, completed }]
  });

  const [completedCount, setCompletedCount] = useState(0);

  const handleStart = (data) => {
    setFlowData(data);
    setStage("session");
  };

  const handleComplete = (finalCompletedCount) => {
    setCompletedCount(finalCompletedCount);
    setStage("complete");
  };

  const handleReturn = () => {
    setFlowData({ mainGoal: "", duration: null, subGoals: [] });
    setCompletedCount(0);
    setStage("setup");
  };

  return (
    <div className="w-full h-full">
      {stage === "setup" && <FlowSetup onStart={handleStart} />}

      {stage === "session" && (
        <FlowSession flowData={flowData} onComplete={handleComplete} />
      )}

      {stage === "complete" && (
        <FlowComplete
          mainGoal={flowData.mainGoal}
          duration={flowData.duration}
          completedCount={completedCount}
          totalCount={flowData.subGoals.length}
          onReturn={handleReturn}
        />
      )}
    </div>
  );
}