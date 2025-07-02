"use client";

import { BarChart3, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCryptoStore } from "@/store/crypto-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data";
import { SidebarProps } from "@/interfaces";

export const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { viewMode, setViewMode } = useCryptoStore();
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Menú</h2>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setOpen(false)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}

        {pathname === "/" && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Vista
            </p>
            <div className="space-y-1">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setViewMode("table")}
              >
                <Table className="mr-2 h-4 w-4" />
                Tabla
              </Button>
              <Button
                variant={viewMode === "cards" ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setViewMode("cards")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Tarjetas
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:bg-background/95 md:backdrop-blur">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};
