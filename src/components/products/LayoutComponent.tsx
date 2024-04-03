// En tu componente del servidor
import { ReactNode } from 'react';
import Navbar from '../shared/Navbar/Navbar';
import '@/sass/globals.sass';

interface LayoutProps {
  sidebarChildren:  ReactNode  | null;
  navbarChildren : ReactNode | null;
  contenChildren: ReactNode | null;
}
export default function LayoutComponent({ contenChildren, sidebarChildren, navbarChildren }: LayoutProps) {
  return (
        <div>
          <div>
            {navbarChildren &&
            <Navbar>{navbarChildren}</Navbar>
            }
          </div>
          <div className="flex h-screen flex-col md:flex-row md:overflow-visible">
            { sidebarChildren &&(
              <div className="w-full flex-none md:w-64 ">
                {sidebarChildren}
              </div>
            )}
              <div className="flex-grow md:overflow-y-auto m-4 no-scrollbar">
                {contenChildren}
              </div>
          </div>
        </div>
  );
}