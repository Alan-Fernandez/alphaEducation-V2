// UserEdit.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUpdatedFields, handleChange, handleImageChange, handleModalClose, prepareFormData } from '@/Util/Helpers/Helpers';
import { handleRequestError } from '@/Util/handleRequestError';
import Modal from '@/components/Modal/Modal';


const UserEdit = ({
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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUser();
  }, [userId]);

  const editUser = async (e) => {
    e.preventDefault();
    const updatedFields = getUpdatedFields(editData, formDataCopi);
    const formDataToSend = prepareFormData(updatedFields);

    if (!formDataToSend) {
      console.error('Error al preparar los datos.');
      return;
    }
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setMessage('Usuário atualizado com sucesso!');
      setIsModalOpen(true);
    } catch (error) {
      setMessage('error al cadastrar!');
      setIsModalOpen(true);

      if (error && error.isAxiosError) {
        handleRequestError(error, formDataToSend);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} message={message} onClose={handleModalClose(setIsModalOpen, setMessage)}>
            <DocumentationSection
              editUser={editUser}
              editData={editData}
              handleChange={handleChange(setEditData)}
              handleImageChange={handleImageChange(setEditData)}
              errors={errors}
              setErrors={setErrors}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserEdit;
