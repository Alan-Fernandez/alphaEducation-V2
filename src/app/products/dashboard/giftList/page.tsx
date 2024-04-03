"use client"
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { ErrorResponse, handleRequestError } from '@/src/app/utils/handleRequestError';
import EventFilter from '@/src/app/ui/Modal/EventFilter';
import qs from 'qs';


interface Event {
    user_id: string;
    user_name: string;
    // teacher_class: string;
    user_img: string;
    user_teacher_class: string;
    event_type: string;
    timestamp: string;
}

const GiftList = () => {
    const { data: session, status } = useSession();
    const accessToken = session?.user?.access;

    const [list, setList] = useState<Event[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filterParams, setFilterParams] = useState({
        full_name: '',
        user_teacher_class: '',
        teacher_class: '',
        event_type: '',
        start_date: '',
        end_date: '',
        date: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilterParams({
            ...filterParams,
            [name]: value
        });
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student-in-out-log/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setList(data);
        } catch (error) {
            const axiosError = error as AxiosError;
            // console.log('Error de solicitud:', axiosError.response?.data);
            if (error && (error as AxiosError).isAxiosError) {
                handleRequestError(error as AxiosError<ErrorResponse>, list);
            }
            console.log(axiosError.response?.data)
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [accessToken]);

    // Función para aplicar los filtros seleccionados

    const handleApplyFilter = async (event: string) => {

        const { full_name, event_type, start_date, end_date, date, teacher_class } = filterParams;

        const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/student-in-out-log/`;

        const queryParams = qs.stringify(filterParams);

        const filteredUrl = `${baseUrl}?${queryParams}`;
        const filteredUrlExport = `${baseUrl}export-csv/?${queryParams}`;

        if (event === 'filter') {
            try {
                const response = await axios.get(filteredUrl, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setList(response.data);
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log('Error de solicitud:', axiosError.response?.data);
                if (error && (error as AxiosError).isAxiosError) {
                handleRequestError(error as AxiosError<ErrorResponse>, list);
                }
                console.log(axiosError.response?.data)
            }
            setIsModalOpen(false); 

        } else if (event === 'export') { 
            try {
                const response = await axios.get(filteredUrlExport, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const blob = new Blob([response.data], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'archivo.csv');
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);

            } catch (error) {
                const axiosError = error as AxiosError;
                console.log('Error de solicitud:', axiosError.response?.data);
                if (error && (error as AxiosError).isAxiosError) {
                    handleRequestError(error as AxiosError<ErrorResponse>, list);
                }
            }
        }
    };



    return (
        <section className="container mx-auto font-semibold">
            <div className="flex justify-end mb-4 gap-1">
                
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Filtrar
                    </button>
                    
                    <EventFilter
                        setFilterParams={setFilterParams}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        handleApplyFilter={handleApplyFilter}
                        filterParams={filterParams}
                        handleChange = {handleChange}
                    />
                    <button
                        onClick={() => fetchData()}
                        className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Limpar
                    </button>
                
                
                    <button
                        onClick={() => handleApplyFilter('export')} className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Exportar
                    </button>
                
            </div>
            <div className="w-full mb-8 overflow-hidden rounded-t-xl">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-sm font-bold text-left text-gray-600 dark:text-gray-100 bg-indigo-100 dark:bg-slate-600 border-b border-gray-300 dark:border-slate-700 divide-x dark:divide-slate-700">
                                <th className="px-4 py-3">Nome</th>
                                <th className="px-4 py-3">Turma</th>
                                {/* <th className="px-4 py-3">Curso</th> */}
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Data e Hora</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-500 dark:border-slate-500">

                            {list?.map((item, index) => (
                                <tr key={`${item.user_id}-${index}`} className="text-gray-700">
                                    <td className="px-4 py-3 border">
                                        <div className="flex items-center text-sm">
                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">

                                            <img
                                                className="object-cover w-full h-full rounded-full" 
                                                src={`${item.user_img}`} 
                                                alt="" 
                                                width={64} // añade un valor para width
                                                height={64} // añade un valor para height
                                                // loading="lazy" 
                                            />

                                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                            {/* <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div> */}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-black">{item.user_name}</p>
                                                <p className="text-xs text-gray-600">{item.user_id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-md font-semibold border">{item.user_teacher_class}</td>
                                    <td className="px-4 py-3 text-xs border">
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
                                    </td>
                                    <td className="px-4 py-3 text-sm border">{item.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </section> 
        )
}

export default GiftList




