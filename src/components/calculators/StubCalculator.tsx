"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StubCalculator({ toolName }: { toolName?: string }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center bg-muted/20">
      <Alert className="max-w-md mx-auto border-primary/20 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary font-semibold">Coming Soon</AlertTitle>
        <AlertDescription className="text-muted-foreground mt-2">
          The interactive calculator for {toolName ? <span className="font-semibold">{toolName}</span> : "this tool"} is currently under development. Please check back later!
        </AlertDescription>
      </Alert>
    </div>
  );
}
