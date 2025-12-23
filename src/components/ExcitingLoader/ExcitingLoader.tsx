import LoaderField, { LoaderFieldState } from "./LoaderField";

export interface LoaderStep {
  id: string;
  state: LoaderFieldState;
  loadingTitle: string;
  completeText: string;
  counter?: number;
  counterLabel?: string;
}

interface ExcitingLoaderProps {
  title: string;
  steps: LoaderStep[];
  isOpen?: boolean;
}

const ExcitingLoader = ({ title, steps, isOpen = true }: ExcitingLoaderProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay with pulsing glow effects */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm">
        {/* Blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-loader-blue/20 blur-[100px] pulse-glow-blue" />
        {/* Teal glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%] w-[400px] h-[400px] rounded-full bg-loader-teal/20 blur-[80px] pulse-glow-teal" />
      </div>

      {/* Loader card container with rotating gradient border */}
      <div className="relative p-[2px] rounded-xl rotating-border">
        {/* Inner white card */}
        <div className="relative bg-card rounded-xl px-8 py-8 min-w-[420px] max-w-[500px]">
          {/* Title */}
          <h2 className="text-xl font-semibold text-card-foreground text-center mb-6">
            {title}
          </h2>

          {/* Steps */}
          <div className="flex flex-col gap-3">
            {steps
              .filter((step) => step.state !== "inactive")
              .map((step) => (
                <LoaderField
                  key={step.id}
                  state={step.state}
                  loadingTitle={step.loadingTitle}
                  completeText={step.completeText}
                  counter={step.counter}
                  counterLabel={step.counterLabel}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcitingLoader;
