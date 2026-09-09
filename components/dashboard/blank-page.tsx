"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export function BlankPage({ title }: { title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Header onMenu={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-4 text-muted-foreground">
            This page is currently blank and under construction.
          </p>
        </main>
      </div>
    </div>
  );
}
