import { createFileRoute } from "@tanstack/react-router";
import { testGemini } from "../lib/ai/gemini";
import { useState } from "react";

export const Route = createFileRoute("/gemini-test")({
  component: GeminiTest,
});

function GeminiTest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTest() {
    setLoading(true);
    setResult("");

    try {
      const response = await testGemini();
      setResult(response ?? "No response");
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : "Gemini test failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Gemini API Test</h1>

      <button onClick={handleTest} disabled={loading}>
        {loading ? "Testing..." : "Test Gemini"}
      </button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {result}
        </pre>
      )}
    </div>
  );
}