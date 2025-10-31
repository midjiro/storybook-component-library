import { useContext } from 'react';
import { SidebarContext } from '../context/sidebarContext';

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
      throw new Error('Sidebar components must be used within Sidebar');
    }
    return context;
  };
  