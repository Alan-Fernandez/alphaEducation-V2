import React , { useState } from 'react';
import axios from 'axios';




const AddressForm = ({setAddressData, addressData, errors }) => {
  
    const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  return (
    <div
      className="max-w-6xl p-6 mx-auto bg-transparent rounded-md"
    >
      <h2
          className="text-xl font-bold text-gray-600 dark:text-gray-200 capitalize text-center"
      >
          Endereço
      </h2>
      <div className="flex flex-wrap gap-y-4 gap-x-1 mt-4 justify-between items-center mx-2">

        {/* CEP */}
        <div>
          <label
            className="text-black dark:text-gray-200"
            htmlFor="CEP"
          >
            CEP:
          </label>
            <input
                type="number"
                id="CEP"
                maxLength="10"
                name="CEP"
                className="block w-40 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
                value={addressData.CEP}
                onChange={handleAddressChange}
            />
        </div>

        {/* Rua */}
        <div>
          <label 
            className="text-black dark:text-gray-200"
            htmlFor="street"
          >
            Rua:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            className="block w-96 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            value={addressData.street}
            onChange={handleAddressChange}
          />
        </div>
      {/* Número */}
      <div>
        <label
          className="text-black dark:text-gray-200"
          htmlFor="number"
          >
          Número:
        </label>
        <input
          className="block w-28 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
          type="number"
          id="number"
          name="number"
          value={addressData.number}
          onChange={handleAddressChange}
        />
        </div>
        
        {/* Complemento */}
      <div>
        <label
          className="text-black dark:text-gray-200"
          htmlFor="complement"
        >
          Complemento:
        </label>
        <input
          type="text"
          id="complement"
          name="complement"
          className="block w-42 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
          value={addressData.complement}
          onChange={handleAddressChange}
        />
        </div>
        
        {/* Bairro */}
        <div>
          <label 
            className="text-black dark:text-gray-200"
            htmlFor="district"
          >
            Bairro:
          </label>
          <input
            type="text"
            id="district"
            name="district"
            className="block w-96 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            value={addressData.district}
            onChange={handleAddressChange}
          />
        </div>

        {/* Cidade */}
        <div>
          <label 
            htmlFor="city"
            className="text-black dark:text-gray-200"
          >
            Cidade:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="block w-96 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            value={addressData.city}
            onChange={handleAddressChange}
          />
        </div>

        {/* Estado */}
        <div>
          <label
            className="text-black dark:text-gray-200" 
            htmlFor="state"
          >
            Estado:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="block w-60 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            value={addressData.state}
            onChange={handleAddressChange}
          />
        </div>

        {/* País */}
        <div>
          <label 
            className="text-black dark:text-gray-200"
            htmlFor="country"
          >
            País:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="block w-60 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            value={addressData.country}
            onChange={handleAddressChange}
          />
        </div>
      </div>
        {errors.length > 0 && (
          <div className="mt-4">
            <ul className="text-red-600">
              {errors.map((error, index) => (
                <li key={index}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
          )}
    </div>
  );
};

export default AddressForm;