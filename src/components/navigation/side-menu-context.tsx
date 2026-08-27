import { SideMenu } from '@/components/navigation/side-menu';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type SideMenuContextValue = {
  openSideMenu: () => void;
  closeSideMenu: () => void;
};

const SideMenuContext = createContext<SideMenuContextValue | null>(null);

export function SideMenuProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const openSideMenu = useCallback(() => setIsOpen(true), []);
  const closeSideMenu = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ openSideMenu, closeSideMenu }),
    [closeSideMenu, openSideMenu],
  );

  return (
    <SideMenuContext.Provider value={value}>
      {children}
      {isOpen && <SideMenu onClose={closeSideMenu} />}
    </SideMenuContext.Provider>
  );
}

export function useSideMenu() {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error('useSideMenu must be used within SideMenuProvider.');
  }

  return context;
}
