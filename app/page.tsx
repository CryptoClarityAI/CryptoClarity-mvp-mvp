'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CryptoClarityMVP() {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkProject = async () => {
    setLoading(true);
    setResult(null);

    const mockAIResponse = (name) => {
      if (!name) return { summary: "Ni vnosa.", trustLevel: "nizek" };
      const riskyWords = ["pepe", "elon", "moon", "shiba", "floki"];
      const isRisky = riskyWords.some((word) => name.toLowerCase().includes(word));
      return {
        summary: isRisky
          ? `Projekt '${name}' vsebuje znake, ki so pogosto povezani z visokim tveganjem ali špekulacijami.`
          : `Projekt '${name}' ni zaznan kot posebej tvegan. Vseeno priporočamo dodatno raziskavo.`,
        trustLevel: isRisky ? "nizek" : "visok",
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
          <h1 className="text-2xl font-bold text-center">CryptoClarity MVP</h1>
          <Input
            placeholder="Vnesi ime projekta (npr. Worldcoin)"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Button onClick={checkProject} disabled={loading}>
            {loading ? "Preverjam..." : "Preveri projekt"}
          </Button>
          {result && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Rezultat:</h2>
              <p>{result.summary}</p>
              <p className={`font-bold mt-2 ${result.trustLevel === "nizek" ? "text-red-600" : "text-green-600"}`}>
                Zaupanje: {result.trustLevel === "nizek" ? "⚠️ Sumljivo" : "✅ Verodostojno"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}