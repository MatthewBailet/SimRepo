"use client";

import React from "react";
import PilotProgramHero from "@/components/templates/PilotProgramHero";
import PilotProgramRoles from "@/components/templates/PilotProgramRoles";
import PilotProgramForm from "@/components/templates/PilotProgramForm";
import Header from "@/components/templates/header";

export default function PilotProgramPage() {
  return (
    <main className="min-h-screen bg-white">

      <PilotProgramHero />
      <PilotProgramRoles />
      <PilotProgramForm />
    </main>
  );
} 