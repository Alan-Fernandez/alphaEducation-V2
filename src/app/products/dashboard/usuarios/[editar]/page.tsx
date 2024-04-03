// @ts-nocheck
"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import UserEdit from '@/src/app/ui/products/profile/UserEdit/UserEdit';
import ViewUser from '@/src/app/ui/products/profile/ViewUser/ViewUser';




interface Props {
    params: {
        editar: string;
    }
}

export default function ProfileDetail({params}:Props) {
    const { data: session, status } = useSession();
    const accessToken = session?.user?.access;
    const [isLoading, setIsLoading] = useState(true);
    
    const [errors, setErrors] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [ formDataCopi, setFormDataCopi] = useState({});
 
    // Declarar uma nova variável dados com state e atribuir o objeto
    const [editData, setEditData] = useState({});

    const [addressData, setAddressData] = useState({
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        country: '',
        CEP: '',
        user:'',
    });
    const [message, setMessage] = useState("");
    const userId = params.editar;


const getUser = async () => {
    if (!userId) {
        setMessage("Erro: Usuário não encontrado!");
        return;
    }

    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setEditData(data);
        setFormDataCopi(data);
        setIsLoading(false);
        setMessage("");
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.mensagem);
        } else {
            setMessage("Erro: Tente mais tarde!");
        }
    }
}
    // useEffect é usado para lidar com efeitos colaterais em um componente. Por exemplo, atualizar o estado do componente, fazer chamadas a APIs, manipular eventos, entre outros.
useEffect(() => {
    if (accessToken) { // Asegúrate de que el token de acceso está disponible antes de hacer la solicitud
        getUser();
    }
}, [userId, accessToken]); 
    // Executar a função quando o usuário clicar no botão do formulário

    return (
        <div className='flex flex-col overflow-hidden sm:rounded-lg gap-3'>
            <div className='bg-green-200 dark:bg-indigo-900 overflow-hidden group rounded-xl p-5 transition-all duration-500 transform'>
                <div 
                    className="flex items-center justify-center gap-4"
                >
                    <img
                        className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 transform" 
                        src={`${editData.img_profile_url}`} 
                        alt="" 
                        width={64} // añade un valor para width
                        height={64} // añade un valor para height
                        // loading="lazy" 
                    />
                </div>
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 p-3 mt-2 leading-5 text-white self-end bg-green-500 dark:bg-blue-700 rounded-3xl hover:opacity-80 focus:outline-none" 
                >
                    {isEditing ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <span>Ver Usuário</span>
                        </>
                    ) : (
                        <>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <span>Editar Usuário</span>
                        </>
                    )}
                </button>
            </div>

            <div>
                
                {isEditing ? (
                    <UserEdit
                        userId={userId}
                        editData={editData}
                        setEditData={setEditData}
                        accessToken={accessToken}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        message={message}
                        setMessage={setMessage}
                        getUser={getUser}
                        errors={errors}
                        setErrors={setErrors}
                        formDataCopi={formDataCopi}
                        setFormDataCopi={setFormDataCopi}
                    />
                ) : (
                    <ViewUser
                        userId={userId}
                        editData={editData}
                        setEditData={setEditData}
                        accessToken={accessToken}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        message={message}
                        setMessage={setMessage}
                        getUser={getUser}
                    />
                )}

            </div>

        </div>
    )
}
