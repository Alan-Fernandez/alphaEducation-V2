'use client';


import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export const links = [
  { 
    name: 'Dashboard',
    href: '/products/dashboard',
    icon: ChartPieIcon 
  },
  // {
  //   name: 'Invoices',
  //   href: '/products/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  { 
    name: 'Controle de Acesso',
    href: '/products/dashboard/giftList',
    icon: ComputerDesktopIcon 
  },
  // { 
  //   name: 'Registrar',
  //   href: '/products/dashboard/register',
  //   icon: UserGroupIcon 
  // },
  { 
    name: 'Usuários',
    href: '/products/dashboard/usuarios',
    icon: UserGroupIcon 
  },
];

export default function NavLinks() {
   const pathname = usePathname();
  return (
    
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-14 grow items-center justify-center font-semibold text-gray-600 gap-2 rounded-md bg-gray-50 dark:bg-slate-800 dark:text-gray-300 p-3 text-md hover:bg-indigo-200 dark:hover:bg-slate-500 hover:text-blue-600 dark:hover:text-blue-200 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-indigo-200 text-blue-700': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}

    </>
  );
}
