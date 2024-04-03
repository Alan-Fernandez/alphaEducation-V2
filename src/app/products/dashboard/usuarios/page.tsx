// @ts-nocheck
"use client"

import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { ErrorResponse, handleRequestError } from '@/src/app/utils/handleRequestError';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { SelectedContext } from '@/src/context/SelectedContext';



    const links = [
        { 
            name: 'Novo Usuário',
            href: '/products/dashboard/register',
        },

    ];

    interface Event {
        id: string;
        full_name: string;
        teacher_class: string;
        img_profile: string;
        cpf: string;
        timestamp: string;
        img_profile_url: string;
        profile_detail: string[];
    }

    // profile_detail


const Users = () => {
    const pathname = usePathname();
    const {userProfile} = useContext(SelectedContext);
    const { data: session, status } = useSession();
    const accessToken = session?.user?.access;
    const [list, setList] = useState<Event[]>([]);
    const [filterParams, setFilterParams] = useState('');

    const filterData = (data, perfil) => {
        let filteredData;

        if(perfil === 'Secretary'){
            filteredData = data.filter(item => 
                item.is_active &&
                item.profile_detail && 
                item.profile_detail.length > 0 && 
                item.profile_detail[0].name === 'Student'
            );
        } else if (perfil=== 'Admin') {
            filteredData = data.filter(item => 
                item.is_active &&
                item.profile_detail && 
                item.profile_detail.length > 0 && 
                item.profile_detail[0].name !== 'SuperAdmin' &&
                item.profile_detail[0].name !== 'Facial Recognition'
            );
        } else if (perfil === 'SuperAdmin'){
            filteredData = data;
        }
        return filteredData;
    }

    const fetchData = async () => {
        if (!accessToken) {
            console.log('Token de acceso no definido');
            return;
        }
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const filteredData = filterData(data, userProfile);
            setList(filteredData);

        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.isAxiosError) {
                handleRequestError(axiosError, list);
            }
            if (error && (error as AxiosError).isAxiosError) {
                handleRequestError(error as AxiosError<ErrorResponse>, list);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [userProfile, accessToken]);


    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterParams(e.target.value);
    }

    const results = !filterParams ? list : list.filter((dato)=> dato.full_name.toLowerCase().includes(filterParams.toLocaleLowerCase()))



    return (
        <section className="container mx-auto font-semibold">

            <div className="flex justify-between mb-4 gap-2 items-baseline">
            <div>
                <input 
                    type="text"
                    value={filterParams}
                        onChange={searchHandler}
                        className='w-96 rounded-2xl font-medium border-2 border-gray-300 dark:border-slate-400 bg-indigo-50 dark:bg-transparent dark:text-white text-sm'
                />
            </div>

            <>
                {links.map((link) => {
                    return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                        'flex items-center justify-center rounded-3xl bg-indigo-500 py-2 px-8 text-md text-white font-medium hover:opacity-80 md:flex md:justify-start',
                        {
                            'bg-indigo-200 text-indigo-700': pathname === link.href,
                        },
                        )}
                    >
                        <p className="md:block">{link.name}</p>
                    </Link>
                    );
                })}
                </>

            </div>

            <div className="w-full mb-8 rounded-t-xl">
                <div className="w-full">
                    <table className="w-full">
                        <thead>
                            <tr className="text-sm font-bold text-left text-gray-600 dark:text-gray-100 bg-indigo-100 dark:bg-slate-700 border-b border-gray-300 dark:border-slate-700 divide-x dark:divide-slate-600">
                                <th className="px-4 py-3">Nome</th>
                                <th className="px-4 py-3">Turma</th>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Perfil</th>
                                {/* <th className="px-4 py-3">Perfin</th> */}
                            </tr>
                        </thead>
                        <tbody className="bg-gray-100 dark:bg-slate-600 dark:border-slate-500 divide-y dark:divide-gray-500">

                            {results?.map((item, index) => (
                                <tr 
                                    key={`${item.id}-${index}`}
                                    className="text-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 dark:hover:bg-slate-500"
                                >
                                    <td className="px-6 py-3 dark:border-slate-500 ">
                                        <Link
                                            href={`/products/dashboard/usuarios/${item.id}`}
                                        >
                                    <div className="flex items-center text-sm">
                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">

                                                <img
                                                    className="object-cover w-full h-full rounded-full" 
                                                    src={`${item.img_profile_url}`} 
                                                    alt="" 
                                                    width={64} // añade un valor para width
                                                    height={64} // añade un valor para height
                                                    // loading="lazy" 
                                                />

                                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-black dark:text-white">{item.full_name}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-300">{item.cpf}</p>
                                            </div>
                                    </div>
                                        </Link>
                                </td>
                                <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">{item.teacher_class}</td>
                                {/* <td className="px-4 py-3 text-xs border">
                                    <span 
                                        className={`
                                            px-2 py-1 
                                            font-semibold 
                                            leading-tight 
                                            ${item.event_type === 'Saída' ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'} 
                                            rounded-sm
                                        `}> 
                                        {item.event_type}
                                    </span>
                                </td> */}
                                <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">{item.id}</td>
                                <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">{item.profile_detail[0].name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </section> 
        )
}

export default Users





