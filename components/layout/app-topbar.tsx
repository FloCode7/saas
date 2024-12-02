import React from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { LoaderPinwheel } from "lucide-react";

export function AppTopbar() {
  return (
    <nav className="h-20 border-b border-border/40 bg-background items-center px-4">
      <div className="flex items-center justify-between lg:px-10 py-5">
        {/* Logo à gauche */}
        <LoaderPinwheel />

        {/* Actions à droite */}
        <div className="flex items-center space-x-4">
          {/* Toggle Dark Mode */}
          <ModeToggle />

          {/* Profil utilisateur */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">John Doe</span>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
