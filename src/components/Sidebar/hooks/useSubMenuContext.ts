import { useContext } from "react";

import { SubMenuContext } from "../context/subMenuContext";

export const useSubMenuContext = () => {
    const context = useContext(SubMenuContext);
    if (!context) {
      throw new Error('SubMenuItem must be used within SubMenu');
    }
    return context;
  };

