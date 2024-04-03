"use client"
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { teko } from '@/components/ui/fonts/fonts';
import '@/sass/globals.sass';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({children}: {children: React.ReactNode}) {
  const [message, setMessage] = useState("");

  const { data: session, status } = useSession();
  const img_profile_url = session?.user?.img;
  const handleSignOut = async () => {
    try {
      await signOut();

    } catch (error) {
      setMessage('Error al cerrar sesión:');
    }
  };

  return (
    <Disclosure as="nav" className="bg-blue-400 dark:bg-blue-900 sidebar">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8x1 px-2 sm:px-6 lg:px-8 sidebar dark:bg-blue-950">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  {/* <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button> */}
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className={`${teko.className} flex flex-shrink-0 items-center gap-2`}>
                    <Link
                      href={`/products`}
                    >
                      <Image
                      className="h-9 w-auto subpixel-antialiased"
                      src="/Alpha_Color_LOGO.svg"
                      alt="Alphaeduc_LOGO"
                      width={32} // Añade la propiedad width
                      height={32} // Añade la propiedad height
                        />
                  </Link>
                  <p className='text-2xl text-white subpixel-antialiased'>AlphaEduc</p>
                  </div>
                  <div className="sm:flex sm:items-center sm:justify-center w-full sm:ml-6">
                    {children}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                  {/* <button
                    type="button"
                    className="relative rounded-full bg-transparent p-1 text-white hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Ativar Notificações</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}


                  {/* Profile dropdown */}


                  <Menu as="div" className="relative ml-3 bg-gradient-to-b from-green-600 via-blue-600 to-red-600 rounded-full ">
                    <div>
                      <Menu.Button className="relative m-1 flex rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {img_profile_url ? (
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={img_profile_url}
                            alt="img perfil"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Image
                            className="h-12 w-12 rounded-full"
                            src='/icon alpha.svg'
                            alt="img perfil"
                            width={40}
                            height={40}
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={`/products/dashboard/editUserProfile`}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Perfil
                            </Link>
                          )}
                        </Menu.Item>
  {/* 

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Opções
                            </a>
                          )}
                        </Menu.Item>
                        
                        */}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={handleSignOut}
                            >
                              Sair
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

