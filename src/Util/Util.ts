
// @ts-nocheck

    export function isValidDate(dateString: string) {
        if (dateString) {
            const regEx = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateString.match(regEx)) return false;
            const currentDate = new Date();
            const selectedDate = new Date(dateString);
            return selectedDate <= currentDate;
        }
        return false;
    }


    export function formatarData(data: string) {
//   Verifica si la fecha es válida antes de formatearla

    if (!isValidDate(data)) {
        console.error('Fecha de nacimiento no válida: ', data);
        return null;
    }

    const date = new Date(data);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export const prepareFormData = (formData) => {
    if (!formData) {
        console.error('formData no está definido');
        return null;
    }

    if (!formData.id) {
        console.error('La propiedad id no está presente en el objeto editData');
        return null;
    }

    let formattedDate = formData.birth_date;

    // Verifica si birth_date ya está en el formato correcto
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(formData.birth_date)) {
        // Si no está en el formato correcto, intenta formatearlo
        formattedDate = formatarData(formData.birth_date);
    }

    if (formattedDate === null || !isValidDate(formattedDate)) {
        console.error('Fecha de nacimiento no válida: ', formattedDate);
        return null;
    }

    const cleanedCpf = formData.cpf.replace(/[.-]/g, '');
    
    const formDataToSend = new FormData();
    
    

if (formData.head_office) {
    let headOfficeString: string;

    if (typeof formData.head_office[0] === 'string') {
        headOfficeString = formData.head_office[0] as string;
    } else {
        const headOfficeObject = formData.head_office[0] as { id: string };
        headOfficeString = headOfficeObject.id;
    }
    console.log('formData--head_office -- :', headOfficeString);
    if (headOfficeString !== undefined) {
        formDataToSend.head_office = headOfficeString;
    } else {
        console.error('headOfficeString es undefined');
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
    console.log('formDataToSend.ID antes de enviar al servidor-', formDataToSend.id);
    console.log('formDataToSend antes de enviar al servidor---:', formDataToSend);
    return formDataToSend;
};


export const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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






export const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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


