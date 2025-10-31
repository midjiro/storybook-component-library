import { createContext } from "react";


export interface SubMenuContextType {
    expandedId: string | null;
 
    setExpandedId: (id: string | null) => void;  
  }
  
export const SubMenuContext = createContext<SubMenuContextType | undefined>(undefined);