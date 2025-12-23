import { useState, useEffect } from "react";
import { ExcitingLoader, LoaderStep } from "@/components/ExcitingLoader";

const Index = () => {
  const [steps, setSteps] = useState<LoaderStep[]>([
    {
      id: "import",
      state: "loading",
      loadingTitle: "Importing Calls",
      completeText: "2,049 Calls Imported",
      counter: 0,
      counterLabel: "calls",
    },
    {
      id: "categorize",
      state: "loading",
      loadingTitle: "Categorizing your calls",
      completeText: "5 Categories Identified",
      counter: 0,
      counterLabel: "categories",
    },
    {
      id: "analyze",
      state: "loading",
      loadingTitle: "Analyzing your Customer Success calls",
      completeText: "99 Customer Success Calls Analyzed",
      counter: 0,
    },
  ]);

  // Simulate progress
  useEffect(() => {
    // All steps run simultaneously
    const importInterval = setInterval(() => {
      setSteps((prev) => prev.map((s) => {
        if (s.id === "import" && s.state === "loading" && (s.counter || 0) < 2049) {
          return { ...s, counter: Math.min((s.counter || 0) + Math.floor(Math.random() * 100) + 50, 2049) };
        }
        return s;
      }));
    }, 100);

    const categorizeInterval = setInterval(() => {
      setSteps((prev) => prev.map((s) => {
        if (s.id === "categorize" && s.state === "loading" && (s.counter || 0) < 5) {
          return { ...s, counter: (s.counter || 0) + 1 };
        }
        return s;
      }));
    }, 600);

    const analyzeInterval = setInterval(() => {
      setSteps((prev) => prev.map((s) => {
        if (s.id === "analyze" && s.state === "loading" && (s.counter || 0) < 99) {
          return { ...s, counter: Math.min((s.counter || 0) + Math.floor(Math.random() * 5) + 1, 99) };
        }
        return s;
      }));
    }, 100);

    // Complete import at 3s
    const timeout1 = setTimeout(() => {
      clearInterval(importInterval);
      setSteps((prev) => prev.map((s) => 
        s.id === "import" ? { ...s, state: "complete" as const, counter: 2049 } : s
      ));
    }, 3000);

    // Complete categorize at 4s
    const timeout2 = setTimeout(() => {
      clearInterval(categorizeInterval);
      setSteps((prev) => prev.map((s) => 
        s.id === "categorize" ? { ...s, state: "complete" as const, counter: 5 } : s
      ));
    }, 4000);

    // Complete analyze at 5s
    const timeout3 = setTimeout(() => {
      clearInterval(analyzeInterval);
      setSteps((prev) => prev.map((s) => 
        s.id === "analyze" ? { ...s, state: "complete" as const, counter: 99 } : s
      ));
    }, 5000);

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
