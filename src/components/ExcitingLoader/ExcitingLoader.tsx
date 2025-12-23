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
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      {/* Orbiting blurred shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Shape 1 - Large blue */}
        <div 
          className="absolute w-[350px] h-[350px] rounded-full bg-loader-blue/35 blur-[80px]"
          style={{ 
            '--orbit-radius': '120px',
            animation: 'orbit 8s linear infinite, pulse-glow 3s ease-in-out infinite'
          } as React.CSSProperties}
        />
        {/* Shape 2 - Medium teal */}
        <div 
          className="absolute w-[280px] h-[280px] rounded-full bg-loader-teal/40 blur-[70px]"
          style={{ 
            '--orbit-radius': '100px',
            animation: 'orbit 10s linear infinite reverse, pulse-glow 4s ease-in-out infinite 1s'
          } as React.CSSProperties}
        />
        {/* Shape 3 - Large blue */}
        <div 
          className="absolute w-[320px] h-[320px] rounded-full bg-loader-blue/30 blur-[75px]"
          style={{ 
            '--orbit-radius': '140px',
            animation: 'orbit 6s linear infinite, pulse-glow 2.5s ease-in-out infinite 0.5s'
          } as React.CSSProperties}
        />
        {/* Shape 4 - Large teal */}
        <div 
          className="absolute w-[300px] h-[300px] rounded-full bg-loader-teal/35 blur-[70px]"
          style={{ 
            '--orbit-radius': '90px',
            animation: 'orbit 12s linear infinite, pulse-glow 3.5s ease-in-out infinite 2s'
          } as React.CSSProperties}
        />
        {/* Shape 5 - Medium teal */}
        <div 
          className="absolute w-[260px] h-[260px] rounded-full bg-loader-teal/45 blur-[65px]"
          style={{ 
            '--orbit-radius': '130px',
            animation: 'orbit 7s linear infinite reverse, pulse-glow 2s ease-in-out infinite 1.5s'
          } as React.CSSProperties}
        />
        {/* Shape 6 - Medium blue */}
        <div 
          className="absolute w-[290px] h-[290px] rounded-full bg-loader-blue/40 blur-[72px]"
          style={{ 
            '--orbit-radius': '110px',
            animation: 'orbit 9s linear infinite, pulse-glow 3s ease-in-out infinite 0.8s'
          } as React.CSSProperties}
        />
      </div>

      {/* Loader card container with rotating gradient border */}
      <div className="relative p-[2px] rounded-xl rotating-border">
        {/* Inner white card */}
        <div className="relative z-10 bg-card rounded-[10px] px-8 py-8 min-w-[420px] max-w-[500px]">
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
