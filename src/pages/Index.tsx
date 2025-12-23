import { useState, useEffect } from "react";
import { ExcitingLoader, LoaderStep } from "@/components/ExcitingLoader";

const Index = () => {
  const [steps, setSteps] = useState<LoaderStep[]>([
    {
      id: "import",
      state: "loading",
      loadingTitle: "Importing your calls",
      completeText: "2,049 Calls Imported",
      counter: 0,
    },
    {
      id: "categorize",
      state: "inactive",
      loadingTitle: "Categorizing your calls",
      completeText: "5 Categories Identified",
      counter: 0,
      counterLabel: "categories",
    },
    {
      id: "analyze",
      state: "inactive",
      loadingTitle: "Analyzing your Customer Success calls",
      completeText: "99 Customer Success Calls Analyzed",
      counter: 0,
    },
  ]);

  // Simulate progress
  useEffect(() => {
    // Phase 1: Import calls
    const importInterval = setInterval(() => {
      setSteps((prev) => {
        const importStep = prev.find((s) => s.id === "import");
        if (importStep && importStep.state === "loading" && (importStep.counter || 0) < 2049) {
          return prev.map((s) =>
            s.id === "import"
              ? { ...s, counter: Math.min((s.counter || 0) + Math.floor(Math.random() * 100) + 50, 2049) }
              : s
          );
        }
        return prev;
      });
    }, 100);

    // Phase 2: Complete import, start categorizing
    const timeout1 = setTimeout(() => {
      clearInterval(importInterval);
      setSteps((prev) =>
        prev.map((s) => {
          if (s.id === "import") return { ...s, state: "complete" as const, counter: 2049 };
          if (s.id === "categorize") return { ...s, state: "loading" as const };
          return s;
        })
      );
    }, 3000);

    // Phase 3: Progress categorizing
    const categorizeInterval = setInterval(() => {
      setSteps((prev) => {
        const catStep = prev.find((s) => s.id === "categorize");
        if (catStep && catStep.state === "loading" && (catStep.counter || 0) < 5) {
          return prev.map((s) =>
            s.id === "categorize"
              ? { ...s, counter: (s.counter || 0) + 1 }
              : s
          );
        }
        return prev;
      });
    }, 400);

    // Phase 4: Complete categorizing, start analyzing
    const timeout2 = setTimeout(() => {
      clearInterval(categorizeInterval);
      setSteps((prev) =>
        prev.map((s) => {
          if (s.id === "categorize") return { ...s, state: "complete" as const, counter: 5 };
          if (s.id === "analyze") return { ...s, state: "loading" as const };
          return s;
        })
      );
    }, 5500);

    // Phase 5: Progress analyzing
    const analyzeInterval = setInterval(() => {
      setSteps((prev) => {
        const analyzeStep = prev.find((s) => s.id === "analyze");
        if (analyzeStep && analyzeStep.state === "loading" && (analyzeStep.counter || 0) < 99) {
          return prev.map((s) =>
            s.id === "analyze"
              ? { ...s, counter: Math.min((s.counter || 0) + Math.floor(Math.random() * 5) + 1, 99) }
              : s
          );
        }
        return prev;
      });
    }, 100);

    // Phase 6: Complete analyzing
    const timeout3 = setTimeout(() => {
      clearInterval(analyzeInterval);
      setSteps((prev) =>
        prev.map((s) => {
          if (s.id === "analyze") return { ...s, state: "complete" as const, counter: 99 };
          return s;
        })
      );
    }, 8000);

    return () => {
      clearInterval(importInterval);
      clearInterval(categorizeInterval);
      clearInterval(analyzeInterval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ExcitingLoader title="Analyzing your calls..." steps={steps} isOpen={true} />
    </div>
  );
};

export default Index;
