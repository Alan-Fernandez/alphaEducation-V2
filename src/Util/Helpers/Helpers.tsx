import { formatarData, isValidDate } from "@/Util/Util";

export const getUpdatedFields = (editData, formDataCopi) => {
  const updatedFields = {};
  Object.keys(editData).forEach((key) => {
    if (editData[key] !== formDataCopi[key]) {
      updatedFields[key] = editData[key];
    }
  });
  return updatedFields;
};

export const prepareFormData = (updatedFields) => {
  let formattedDate;
  let cleanedCpf;

  if (updatedFields.birth_date) {
    formattedDate = formatarData(updatedFields.birth_date);
    if (formattedDate === null || !isValidDate(formattedDate)) {
      return null;
    }
  }

  if (updatedFields.cpf) {
    cleanedCpf = updatedFields.cpf.replace(/[.-]/g, '');
  }

  const formDataToSend = new FormData();

  if (updatedFields.head_office && updatedFields.head_office[0]) {
    let headOfficeString;

    if (typeof updatedFields.head_office[0] === 'string') {
      headOfficeString = updatedFields.head_office[0];
    } else {
      const headOfficeObject = updatedFields.head_office[0];
      headOfficeString = headOfficeObject.id;
    }
    if (headOfficeString !== undefined) {
      formDataToSend.append('head_office', headOfficeString);
    } else {
      console.error('headOfficeString es undefined');
    }
  }

  for (let key in updatedFields) {
    if (
      key !== 'profile' &&
      key !== 'branch_office' &&
      key !== 'head_office' &&
      updatedFields[key] &&
      updatedFields[key] !== ''
    ) {
      const valueToAdd = updatedFields[key];
      if (key === 'video' || key === 'img_profile') {
        if (valueToAdd instanceof File) {
          formDataToSend.append(key, valueToAdd, valueToAdd.name);
        }
      } else {
        formDataToSend.append(
          key,
          key === 'cpf' ? cleanedCpf : key === 'birth_date' ? formattedDate : valueToAdd
        );
      }
    }
  }
  return formDataToSend;
};

export const handleChange = (setEditData) => (e) => {
  if (e && e.target) {
    const { name, type } = e.target;
    let newValue;

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
        [name]: newValue
      };
      return updatedFormData;
    });
  }
};

export const handleImageChange = (setEditData) => (e) => {
  if (e.target.files && e.target.files.length > 0) {
    const { name } = e.target;
    const newValue = e.target.files[0];

    if (newValue && (newValue.type.startsWith('image/') || newValue.type.startsWith('video/'))) {
      setEditData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue
      }));
      e.target.value = '';
    } else {
      console.error('El archivo seleccionado no es una imagen o video', errorMessages);
    }
  } else {
    console.error('No se seleccionó ningún archivo', errorMessages);
  }
};

export const handleModalClose = (setIsModalOpen, setMessage) => () => {
  setIsModalOpen(false);
  setMessage('');
};
