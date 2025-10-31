import { createContext } from "react";


interface SidebarContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);