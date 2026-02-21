import { createContext, useContext, ReactNode } from "react";

type SidebarContextType = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: SidebarContextType;
}) {
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
