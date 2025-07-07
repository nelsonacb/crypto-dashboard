"use client";

import type React from "react";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Banner } from "@/components/Banner";
import { DashboardLayoutProps } from "@/interfaces";

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
