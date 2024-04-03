"use client";
import Countdown from '@/components/shared/sidenav/Countdown/Countdown';
import NavLinks from './nav-links/nav-links';
import { signOut } from "next-auth/react";

export default function SideNav() {


 // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    try {
      // Cerrar sesión utilizando NextAuth
      await signOut();

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const seconds = 60*60;
  return (
    <div className="flex h-full flex-col px-3  py-2 md:px-2 dark:bg-slate-900">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-slate-800 md:block"></div>
        <div>
          {/* <button
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-slate-700 dark:text-white p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            onClick={handleSignOut}
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sair</div>
          </button> */}
        
        </div>

      </div>
      <Countdown className="absolute bottom-0 left-0 dark:text-gray-200"
          seconds={seconds}
        />
    </div>
  );
}
