"use client";

import React, { useContext, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import '@/sass/globals.sass';
import { montserrat } from '@/components/ui/fonts/fonts';
import { SelecUnidad } from '@/components/products/SelecUnidad';
import { SelectedContext } from '@/context/SelectedContext';

type HeadOffices = {
    id: string;
};

const Page = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const {setUserHeadOfficeId, setSelectedProfileId, userProfile, setUserProfile, selectedDivision, setSelectedDivision, selectedTura, setSelectedTura, setSelectedOfficeId } = useContext(SelectedContext); // Importa setSelectedOfficeId
    const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);


    if (status === "loading") {
        return <p>Loading...</p>;
    }
    const setIsEscolas = () => {
        const headOfficeId = session?.user.head_offices[0] || null;
        setUserHeadOfficeId(headOfficeId);
    };
    
    const handleRedirecion = () => {
        // Verifica si se han seleccionado ambos
        if (!selectedOffice || !selectedProfile ) {
            alert('Por favor, selecciona una oficina y un perfil antes de continuar.');
            return;
        }

        setIsEscolas();
        if(userProfile==='Facial Recognition'){
            router.push('/products/FacialRecognition');
        }else{
            router.push('/products/dashboard');
        }
    }

    return (
        <div className={`${montserrat.className} flex justify-center w-screen h-screen no-scrollbar bg-white dark:bg-gray-900 `}>
        <div className="inline-flex flex-col justify-center items-center overflow-hidden p-6 sm:py-12 md:overflow-hidden">
                        <div className="dark:bg-slate-800 p-12 sm:w-full flex-col justify-center items-center inline-flex overflow-hidden rounded-2xl border-2 dark:border-gray-500 md:shadow-md divide-y divide-gray-500">
                            <div className='flex-col justify-center items-center inline-flex gap-3'>                            
                                <h2 className="text-center font-medium text-slate-400 dark:text-slate-200">
                                    Selecione a I.E. que deseja acessar:
                                </h2>
                                <div className="m-3">
                                    <div className="uploader px-6 pb-4 flex justify-center items-center text-lg">
                                        {
                                            session && session.user.branch_offices && session.user.branch_offices.map((officeId, index) => (
                                                <div
                                                    className="font-bold m-1 px-6 py-2 rounded justify-center items-center" 
                                                    key={index}
                                                >
                                                    <SelecUnidad
                                                        setIsEscolas={setIsEscolas}
                                                        officeId={officeId}
                                                        compName={`company_name`}
                                                        index={index}
                                                        setOfficeId={(id) => {
                                                            if (id) {
                                                                setSelectedOfficeId(id);
                                                                setSelectedOffice(id);
                                                            }
                                                        }}
                                                        setOfficeValue={setSelectedDivision}
                                                        selectedDivision = {selectedDivision}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-center mt-4 font-medium text-slate-400 dark:text-slate-200">
                                    Selecione o Perfil de Usuário que deseja acessar:
                                </h2>
                                <div className="sm:w-full md:w-full">
                                    <div className="uploader px-6 pb-4 flex justify-center items-center text-lg">     
                                        {
                                            session && session.user.profiles && session.user.profiles.map((officeId, index) => (
                                                <div 
                                                    className="font-bold m-1 px-6 py-2 rounded justify-end"
                                                    key={index}
                                                >
                                                    <SelecUnidad
                                                        setIsEscolas={setIsEscolas}
                                                        officeId={officeId}
                                                        compName={'name'}
                                                        index={index}
                                                        setOfficeId={(id) => {
                                                            if (id) {
                                                                setSelectedProfileId(id);
                                                                setSelectedProfile(id);
                                                            }
                                                        }}
                                                        setOfficeValue={setUserProfile}
                                                        selectedDivision = {userProfile}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            
                                <button 
                                    // className="uploader px-6 pb-4 flex items-center text-lg rounded shadow-lg "
                                    className="text-center font-medium text-white mt-3 rounded-3xl shadow-lg bg-indigo-600 py-2 px-28 hover:opacity-80"
                                    onClick={handleRedirecion}
                                    >
                                    Entrar    
                                </button>
                            
                        </div>
                    </div>
                </div>
    )
}

export default Page
