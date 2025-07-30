"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CryptoClarityMVP() {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { summary: string; trustLevel: string }>(null);

  const checkProject = async () => {
    setLoading(true);
    setResult(null);

    const mockAIResponse = (name: string) => {
      if (!name) return { summary: "No input provided.", trustLevel: "low" };
      const riskyWords = ["pepe", "elon", "moon", "shiba", "floki"];
      const isRisky = riskyWords.some((word) => name.toLowerCase().includes(word));
      return {
        summary: isRisky
          ? `The project '${name}' contains words often associated with high risk or speculation.`
          : `The project '${name}' does not appear especially risky. Still, further research is recommended.`,
        trustLevel: isRisky ? "low" : "high",
      };
    };

    const data = mockAIResponse(projectName);
    await new Promise((r) => setTimeout(r, 1000));
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="CryptoClarity Logo"
              width={150}
              height={50}
              unoptimized
            />
          </div>
          <Input
            placeholder="Enter project name (e.g. Worldcoin)"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Button onClick={checkProject} disabled={loading}>
            {loading ? "Checking..." : "Check Project"}
          </Button>
          {result && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Result:</h2>
              <p>{result.summary}</p>
              <p className={`font-bold mt-2 ${result.trustLevel === "low" ? "text-red-600" : "text-green-600"}`}>
                Trust: {result.trustLevel === "low" ? "⚠️ Suspicious" : "✅ Trustworthy"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
