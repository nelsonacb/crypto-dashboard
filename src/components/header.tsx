"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "@/components/logo";
import { useCryptoStore } from "@/store/crypto-store";
import { HeaderProps } from "@/interfaces";

export const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { searchTerm, setSearchTerm } = useCryptoStore();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-4 md:space-x-6">
          <Logo />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold">CryptoTracker</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end space-x-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar criptomoneda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
