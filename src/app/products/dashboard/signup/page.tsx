// @ts-nocheck
"use client"
import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AddressForm from '@/src/app/ui/products/dashboard/Register/AddressForm/AddressForm';
import DocumentationSection from '@/src/app/ui/products/dashboard/Register/DocumentationSection/DocumentationSection';
import { useSession } from "next-auth/react";
import { SelectedContext } from '@/src/context/SelectedContext';
import CourseForm from '@/src/app/ui/products/dashboard/Register/CourseForm/CourseForm';
import { formatarData, isValidDate } from '@/src/Util/Util';
import Modal from '@/src/app/ui/Modal/Modal';

interface ErrorMessages {
    [key: string]: string;
}

interface ResponseData {
    [key: string]: any;
}

interface FormDataToSend {
  // otras propiedades...
    head_office?: string[];
}


interface FormData {
    // [key: string]: string | boolean | File | null | string[];
    first_name: string;
    cpf: string;
    rg: string;
    passaport: string;
    mother_name: string;
    father_name: string;
    birth_date: string;
    country_birth: string;
    state_birth: string;
    city_birth: string;
    nationality: string;
    email: string;
    phone: string;
    img_profile: string;
    sexuality: string;
    civil_sts: string;
    central_office: string;
    is_active: boolean;
    // password: string;
    video: File | null;
    issuing_body_rg: string;
    full_name: string;
    teacher_class: string;
    head_office?: string[];
    // profile: string[];
    // branch_office: string[];
}

const errorMessages: ErrorMessages = {
        first_name: '',
        social_name: '',
        cpf: '',
        rg: '',
        passaport: '',
        mother_name: '',
        father_name: '',
        birth_date: '',
        country_birth: '',
        state_birth: '', 
        city_birth: '',
        nationality: '',
        email: '',
        phone: '',
        img_profile: '',
        sexuality: '',
        civil_status: '',
        central_office: '',
        is_active: '',
        // password: '',
        video: '',
        issuing_body_rg:'',
        full_name:'',
        teacher_class:'',
        head_office:'',
        // profile:'',
        // branch_office:'',
};




export default function Register() {
    const { data: session, status } = useSession();
    const accessToken = session?.user?.access;
    // const accessToken = session?.user?.access;
    const { userHeadOfficeId } = useContext(SelectedContext);

    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const [errorMessages, setErrorMessages] = useState({
        first_name: '',
        social_name: '',
        cpf: '',
        rg: '',
        passaport: '',
        mother_name: '',
        father_name: '',
        birth_date: '',
        country_birth: '',
        state_birth: '', 
        city_birth: '',
        nationality: '',
        email: '',
        phone: '',
        img_profile: '',
        sexuality: '',
        civil_status: '',
        central_office: '',
        is_active: true,
        // password: '',
        video: '',
        issuing_body_rg:'',
        full_name:'',
        teacher_class:'',
        head_office:'',
        // profile:'',
        // branch_office:'',
    });


    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        cpf: '',
        rg: '',
        passaport: '',
        mother_name: '',
        father_name: '',
        birth_date: '',
        country_birth: '', //pais
        state_birth: '', //estado
        city_birth: '', //cidade
        nationality: '',
        email: '',
        phone: '',
        img_profile: '',
        sexuality: '',
        civil_sts: '',
        central_office: '',
        is_active: true,
        // password: '',
        video: null,
        issuing_body_rg:'',
        full_name:'',
        teacher_class:'',
        head_office:[],
        // profile:[],
        // branch_office:[],
    });
    

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

    
    
    // const handleAddressChange = (newAddressData) => {
    //     console.log('newAddressData---:', newAddressData);
    //         setAddressData((prevFormData) => ({
    //         ...prevFormData,
    //         user: newAddressData
    //     }));
    // };

console.log('userHeadOfficeId', userHeadOfficeId)

const handleAddBranchOffice = (valueHeadOffice: any) => {
    // Actualiza el estado utilizando setFormData
    setFormData((prevFormData) => ({
        ...prevFormData,
        head_office: [valueHeadOffice],
    }));
};

useEffect(() => {
    if (userHeadOfficeId !== null) {
        handleAddBranchOffice(userHeadOfficeId);
    }
    
}, [userHeadOfficeId]);

    


const prepareFormData = () => {

    const formattedDate = formatarData(formData.birth_date);


    if (formattedDate === null || !isValidDate(formattedDate)) {
        setErrorMessages((prevErrorMessages) => ({
            ...prevErrorMessages,
            birth_date: 'Data de nascimento inválida',
        }));
        return null;
    }

    const cleanedCpf = formData.cpf.replace(/[.-]/g, '');
    
    const formDataToSend = new FormData();
    

if (formData.head_office && formData.head_office[0]) {
    let headOfficeString: string;

    if (typeof formData.head_office[0] === 'string') {
        headOfficeString = formData.head_office[0] as string;
    } else {
        const headOfficeObject = formData.head_office[0] as { id: string };
        if (headOfficeObject) {
            headOfficeString = headOfficeObject.id;
        }
    }
    if (headOfficeString !== undefined) {
        formDataToSend.head_office = headOfficeString;
    } else {
        setErrorMessages((prevErrorMessages) => ({ 
            ...prevErrorMessages, 
            head_office: 'Campo obrigatório'
        }));
    }
}

    // formData.profile.forEach(profileId => {
    //     formDataToSend.append('profile', profileId);
    // });


    for (let key in formData) {
        if (key !=='branch_office' && key !=='head_office' && formData[key]) {
            const valueToAdd = formData[key];

            if ((key === 'video' || key === 'img_profile') && valueToAdd instanceof File) {
                formDataToSend.append(key, valueToAdd, valueToAdd.name);
                
            } else {
                if (key === 'cpf') {
                    formDataToSend.append(key, cleanedCpf);
                    formDataToSend[key] = cleanedCpf; // Asignar el valor a formDataToSend.key
                } else {
                    formDataToSend.append(
                        key,
                        key === 'birth_date' ? formattedDate : valueToAdd
                    );
                    
                    // Asignar el valor a formDataToSend.key
                    formDataToSend[key] = valueToAdd;
                }
            }
        }
    }

    return formDataToSend;
};









const handleSubmitForm = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formDataToSend = prepareFormData();

    if (!formDataToSend) {
        console.error('Error al preparar los datos.');
        return;
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if(response.data.id) {
            //validacion si esta cadastrado el address
            if(!addressData.CEP && !addressData.street && !addressData.number && !addressData.complement && !addressData.district && !addressData.city && !addressData.state && !addressData.country)
            {
                setMessage("Usuário cadastrado com sucesso!");
                setIsModalOpen(true);

            }else{
                const addressDataID = response.data.id.toString();
                setAddressData(prevAddressData => ({
                    ...prevAddressData,
                    user: addressDataID
                }));
            }
        }else{
            console.error('Error al obtener el ID del usuario');
        }


    } catch (error) {
        const axiosError = error as AxiosError;
        
        console.error('Error al crear la usuario:', axiosError.response?.data);
        
        const responseData = axiosError.response?.data as { [key: string]: string[] };
        setMessage(`Error al crear la usuario`);
        setIsModalOpen(true);

        if (responseData) {
            for (const key in responseData) {
                if (Object.prototype.hasOwnProperty.call(responseData, key)) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [key]: responseData[key][0]
                    }));
                }
            }}
        }
};

    const handleCreateAddress = async () => {
        try {
            const addressResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-address/`,
            addressData,
            {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
                },
            }
            );
            setMessage("'Datos de usuario y dirección enviados exitosamente'!");
            setIsModalOpen(true);

        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error al crear la dirección:', axiosError.response?.data);
            const responseData = axiosError.response?.data as { [key: string]: string[] };
            setMessage(`Error al crear la dirección! ${responseData}`);
            setIsModalOpen(true);

            if (responseData) {
                for (const key in responseData) {
                    if (Object.prototype.hasOwnProperty.call(responseData, key)) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            [key]: responseData[key][0]
                        }));
                    }
                }}
        }
    };

        useEffect(() => {

            if (addressData?.user !== '') {
                handleCreateAddress();
            }
        }, [addressData?.user !== '']);


const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const { name } = e.target;
        const newValue = e.target.files[0];

        // Validar si el archivo es una imagen o video
        if (newValue && (newValue.type.startsWith('image/') || newValue.type.startsWith('video/'))) {
            setFormData((prevFormData) => ({
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

        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [name]: newValue,
            };
            return updatedFormData;
        });
    }
};

    const handleModalClose = () => {
        setIsModalOpen(false);
        setMessage('');
    };




return (
    <div className='flex-center bg-gray-50 dark:bg-slate-800'>
        <form 
            encType="multipart/form-data"
            onSubmit={handleSubmitForm}
        >
            <section
                className="max-w-6xl p-6 lg:mx-auto border-gray-700 flex-col"
            >
                <h1
                    className="text-xl font-bold text-gray-600 dark:text-gray-200 capitalize m-8"
                >
                    Cadastro de Cliente
                </h1>
                    <div className='divide-y gap-3'>
                    <Modal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    >
                        <div class="p-8 mt-10">
                            <div class="w-1/2 p-4 rounded-md shadow-lg bg-gray-50">
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

                        <DocumentationSection
                            formData={formData}
                            handleChange={handleChange}
                            errorMessages={errorMessages}
                            handleImageChange={handleImageChange}
                            setFormData={setFormData}
                            setErrorMessages={setErrorMessages}
                            errors={errors}
                            setErrors={setErrors}
                        />
                        <CourseForm
                            handleChange={handleChange}
                            formData={formData}
                            titleName={'Curso-Turma'}
                        />
                        
                        <AddressForm 
                            errors={errors}
                            setAddressData={setAddressData}
                            addressData={addressData}
                        />

                    <div
                        className="flex justify-end mt-6"
                    >

                    {/* <button id="Cancelar" name="Cancelar"  type="Reset">Cancelar</button> */}
                    </div>


                    </div>
                    <button
                        className="px-12 py-3 mt-2 leading-5 text-white self-end bg-indigo-600 rounded-3xl hover:opacity-80 focus:outline-none focus:bg-gray-600"
                        id="Cadastrar" 
                        name="Cadastrar"  
                        type="submit"
                    >
                        Cadastrar
                    </button>
            </section>
        </form>
    </div>
    )
}