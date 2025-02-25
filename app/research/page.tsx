"use client";

import React from "react";
import ResearchHero from "@/components/templates/ResearchHero";
import ResearchOverview from "@/components/templates/ResearchOverview";
import ResearchPapers from "@/components/templates/ResearchPapers";
import ResearchTeam from "@/components/templates/ResearchTeam";

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white">
      <ResearchHero />
      <ResearchOverview />
      <ResearchPapers />
      <ResearchTeam />
    </main>
  );
} 