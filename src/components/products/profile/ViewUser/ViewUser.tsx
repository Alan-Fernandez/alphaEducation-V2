// @ts-nocheck

"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ViewUser({
        userId,
        editData,
        setEditData, 
        accessToken,
        isLoading,
        setIsLoading,
        message,
        setMessage,
        getUser
}) {

    // Declarar uma nova variável dados com state e atribuir o objeto
    const [apiResponse, setApiResponse] = useState(null);
    
    useEffect(() => {
        // Chamar a função com requisição para API
        getUser();
    }, [userId]);

    useEffect(() => {
    if (apiResponse) {
        setEditData(apiResponse);
    }
}, [apiResponse]);

const getSexuality = (sexuality) => {
    switch(sexuality) {
        case 'M': return 'Masculino';
        case 'F': return 'Femenino';
        case 'O': return 'Otros';
        default: return '';
    }
}


    return (
        <>
            {isLoading ? (
                <div>Cargando...</div>
            ):(
                    <div className='flex flex-col text-gray-700 dark:text-gray-100 bg-indigo-50 dark:bg-slate-800 p-3 rounded-xl'>
                        <div className='flex items-center gap-2 mx-2 mb-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" 
                                />
                            </svg>

                            <h2 className='text-xl font-bold'>Detalhes do Usuário</h2>
                        </div>     
                    {message ? <p>{message}</p> : ""}
                    <div>
                    <dl className='grid grid-cols-2 mx-6'>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Nome:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.full_name || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                CPF:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.cpf || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                RG:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.rg || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Nome da Mãe: 
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.mother_name || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Nome do Pai: 
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.father_name || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Data de Nascimento:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.birth_date || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                País de Nascimento: 
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.country_birth || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Estado de Nascimento: 
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.state_birth || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Cidade de Nascimento: 
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.city_birth || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Nacionalidade:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.nationality || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                E-mail:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.email || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Telefone:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.phone || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Sexo:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {getSexuality(editData.sexuality)}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Estado Civil:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.civil_status || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Órgão Emissor RG:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.issuing_body_rg || ""}
                            </dd>
                        </div>
                        <div className="p-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-md font-semibold text-gray-600 dark:text-gray-200">
                                Clase del Profesor:
                            </dt>
                            <dd className="mt-1 text-md text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {editData.teacher_className || ""}
                            </dd>
                        </div>
                    </dl>
                </div>
                </div>
            )}
        </>
    )
}
