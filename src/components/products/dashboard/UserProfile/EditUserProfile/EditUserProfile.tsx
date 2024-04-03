
// @ts-nocheck
"use client"
import { ErrorResponse, handleRequestError } from '@/src/app/utils/handleRequestError';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import DocumentationSection from '../../dashboard/Register/DocumentationSection/DocumentationSection';
import { formatarData, isValidDate } from '@/src/Util/Util';
import Modal from '../../../Modal/Modal';




const  UserEdit=(
    {
        userId,
        editData,
        setEditData, 
        accessToken,
        isLoading,
        setIsLoading,
        message,
        setMessage,
        getUser,
        errors,
        setErrors,
        formDataCopi,
        setFormDataCopi
    })=> {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ formData, setFormData ] = useState({});
        
    // useEffect é usado para lidar com efeitos colaterais em um componente. Por exemplo, atualizar o estado do componente, fazer chamadas a APIs, manipular eventos, entre outros.
    useEffect(() => {
        getUser();
    }, [userId]);

    const getUpdatedFields = () => {
        const updatedFields = {};
        Object.keys(editData).forEach((key) => {
            if (editData[key] !== formDataCopi[key]) {
                updatedFields[key] = editData[key];
            }
        });
        return updatedFields;
    };

    
const prepareFormData = (updatedFields) => {
    let formattedDate;
    let cleanedCpf;

    if(updatedFields.birth_date){
        formattedDate = formatarData(updatedFields.birth_date);
        if (formattedDate === null || !isValidDate(formattedDate)) {
            return null;
        }
    }

    if(updatedFields.cpf){
        cleanedCpf = updatedFields.cpf.replace(/[.-]/g, '');
    }
    
    const formDataToSend = new FormData();

    if (updatedFields.head_office && updatedFields.head_office[0]) {
        let headOfficeString: string;

        if (typeof updatedFields.head_office[0] === 'string') {
            headOfficeString = updatedFields.head_office[0] as string;
        } else {
            const headOfficeObject = updatedFields.head_office[0] as { id: string };
            headOfficeString = headOfficeObject.id;
        }
        if (headOfficeString !== undefined) {
            formDataToSend.append('head_office', headOfficeString);
        } else {
            console.error('headOfficeString es undefined');
        }
    }

    for (let key in updatedFields) {
        if (key !=='profile' && key !=='branch_office' && key !=='head_office' && updatedFields[key] && updatedFields[key] !== '') {

            const valueToAdd = updatedFields[key];
            if ((key === 'video' || key === 'img_profile') && valueToAdd instanceof File) {

                formDataToSend.append(key, valueToAdd, valueToAdd.name);
                
            } else {
                if (key === 'cpf') {
                    formDataToSend.append(key, cleanedCpf);
                } else {
                    formDataToSend.append(
                        key,
                        key === 'birth_date' ? formattedDate : valueToAdd
                    );
                }
            }
        }
    }
    return formDataToSend;
};



const editUser = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        const updatedFields = getUpdatedFields();
        const formDataToSend = prepareFormData(updatedFields);

    if (!formDataToSend) {
        console.error('Error al preparar los datos.');
        return;
    }
    try {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setMessage("Usuário atualizado com sucesso!");
        setIsModalOpen(true);
        
    } catch (error) {
        setMessage("error al cadastrar!");
        setIsModalOpen(true);

        const axiosError = error as AxiosError;
        if (error && (error as AxiosError).isAxiosError) {
            handleRequestError(error as AxiosError<ErrorResponse>, formData);
        }
        }
}


    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target) {
        const { name, type } = e.target;
        let newValue: any;

        if (type === 'file' && e.target.files) {
            newValue = e.target.files[0];
        } else if (type === 'checkbox') {
            newValue = e.target.checked;
        } else {
            newValue = e.target.value;
        }

        setEditData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [name]: newValue,
            };
            return updatedFormData;
        });
    }
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const { name } = e.target;
        const newValue = e.target.files[0];

        // Validar si el archivo es una imagen o video
        if (newValue && (newValue.type.startsWith('image/') || newValue.type.startsWith('video/'))) {
            setEditData((prevFormData) => ({
                ...prevFormData,
                [name]: newValue,
            }));
            e.target.value = '';
        } else {
            console.error('El archivo seleccionado no es una imagen o video', errorMessages);
        }
    } else {
        console.error('No se seleccionó ningún archivo', errorMessages);
    }
};



    const handleModalClose = () => {
        setIsModalOpen(false);
        setMessage('');
    };

    return (
        <>
            {isLoading ? (
                <div>Cargando...</div>
                ):(
                <div>
                    <Modal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    >
                        <div class="p-8 mt-10">
                            <div class="w-1/2 mx-auto p-4 rounded-md shadow-lg bg-gray-50">
                                <h1 class="text-2xl font-bold text-indigo-500 mb-4">{message}</h1>
                                {/* <p class="text-gray-700 text-left mb-4">.</p> */}

                                <div class="text-right">
                                    <button
                                        onClick={() => {
                                            handleModalClose();
                                            getUser();
                                        }}
                                        class="inline-block bg-indigo-500 py-2 px-4 text-white rounded-md font-semibold uppercase text-sm "
                                    >
                                            Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <form onSubmit={editUser} className='dark:bg-slate-800 rounded-xl'>
                    <input type="hidden" name="id" value={editData.id} />
                        <DocumentationSection
                            setFormData={setEditData}
                            formData={editData}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            setErrorMessages={setMessage}
                            errorMessages={message}
                            errors={errors}
                            setErrors={setErrors}
                        />
                        <button className="px-12 py-3 mt-2 leading-5 text-white self-end bg-indigo-600 rounded-3xl hover:opacity-80 focus:outline-none focus:bg-gray-600" type="submit">Salvar</button>

                    </form>
                        {message ? <p>{message}</p> : ""}
                </div>
            )}
        </>
    )
}


export default UserEdit;