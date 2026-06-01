"use client";

import { useState } from "react";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";

export default function AIResponsePanel() {
  const [suggestion, setSuggestion] = useState(
    "We have identified the issue with your database connection. Our team is working on a fix and we estimate it will be resolved within the next 2 hours. We apologize for the inconvenience and will notify you once the fix is deployed."
  );
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm">
          🤖
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            AI-Powered Response
          </h3>
          <p className="text-xs text-gray-400">Human-in-the-loop</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Summary
        </p>
        <p className="text-sm text-gray-600">
          Customer reports database connection timeout affecting production
          environment. High-priority incident requiring immediate attention.
        </p>
      </div>

      <div className="mb-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Classification
        </p>
        <div className="flex gap-2">
          <Badge variant="critical">High Risk</Badge>
          <Badge variant="high">Critical</Badge>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Suggested Response
        </p>
        <textarea
          value={suggestion}
          onChange={(e) => {
            setSuggestion(e.target.value);
            setApplied(false);
          }}
          className="min-h-[100px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-sm leading-relaxed text-gray-700 transition-colors focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        {applied && (
          <span className="text-sm font-medium text-success animate-pulse">
            ✓ Applied successfully
          </span>
        )}
        <Button onClick={handleApply} size="sm">
          Apply suggestion
        </Button>
      </div>
    </div>
  );
}
