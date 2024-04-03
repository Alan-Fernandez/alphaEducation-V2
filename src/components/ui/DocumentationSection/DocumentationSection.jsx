"use client";
import axios from "axios";
import React,  { use, useEffect, useState } from "react";
// import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from'./DocumentationSection.module.css'
import InputMask from 'react-input-mask';
import Image from 'next/image';
import CourseForm from "../../products/dashboard/signup/CourseForm/CourseForm";

const DocumentationSection = ({
    setFormData,
    formData, 
    handleChange,
    handleImageChange,
    setErrorMessages,
    errorMessages,
    errors,
    setErrors
  }) => {

  const [imageURL, setImageURL] = useState(null);

  const handleFileChange = (event) => {
    const { name, files } = event.target || {};
        if (name === 'img_profile' || name === 'video') {
            handleImageChange({
              target: {
                  name,
                  files: [files[0]],
              },
            });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const validateCPF = (value) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\.\d{2}$/;
    return cpfRegex.test(value);
  };

  const handleCPFChange = (event) => {
    const { name, value } = event.target || {};
    const cleanedCPF = value.replace(/[\.\-]/g, '');
    const isValidCPF = validateCPF(cleanedCPF);

    handleChange(event);

  };

  return (

    <div
      className="p-6 rounded-xl "
    >
        <h2
          className="text-xl font-bold text-gray-600 dark:text-gray-200 capitalize text-center"
        >
          Dados Pessoais
        </h2>
      <div
        className="flex flex-wrap gap-y-4 gap-x-1 mt-4 justify-between items-center"
      >
        {/* CPF */}
        <div>
          <label 
            className="text-black dark:text-gray-200"
            htmlFor="cpf"
          >
              CPF:
          </label>
          <InputMask
            id="cpf"
            mask="999.999.999-99"
            type="text"
            name="cpf"
            placeholder='000.000.000.00'
            value={formData.cpf}
            onChange={handleCPFChange}
            required
            className="block w-60 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
          />
        </div>

        {/* Nome Completo  */}
          <div className="flex-col w-full">
            <label
              className="text-black dark:text-gray-200"
              htmlFor="full_name"
            >
                Nome Completo:
            </label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              className="flex-grow w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
        </div>

        {/* Nome Social   */}
        <div className="flex-col w-full">
            <label
              className="text-black dark:text-gray-200"
              htmlFor="social_name"
            >
              Nome Social:
            </label>
            <input
              id="social_name"
              type="text"
              name="social_name"
              className="flex-grow w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.social_name}
              onChange={handleChange}
            />
        </div>

        {/* Nacionalidade   */}
        <div>
          <label
            className="text-black dark:text-gray-200" 
            htmlFor="nationality"
          >
            Nacionalidade:
          </label>
          <input
            id="nationality"
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="block w-42 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            required
          />
        </div>

        {/* RG OU RNE   */}
        <div>
          <label 
            className="text-black dark:text-gray-200"
            htmlFor="rg"
            >
              RG ou RNE:
          </label>
          <input
            id="rg"
            type="text"
            name="rg"
            placeholder="Apenas números"
            maxLength="11"
            className="block w-42 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
            value={formData.rg}
            onChange={handleChange}
            required
          />
        </div>

        {/* Órgão Expedidor  */}
        <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="issuing_body_rg"
            >
                Orgão Expedidor:
            </label>
            <input
              id="issuing_body_rg"
              type="text"
              maxLength="5"
              name="issuing_body_rg"
              className="block w-40 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.issuing_body_rg}
              onChange={handleChange}
              required
            />
        </div>

        {/* Passaporte   */}
          <div>
            <label 
              className="text-black dark:text-gray-200"
              htmlFor="passaport"
            >
              Passaporte:
            </label>
            <input
              id="passaport"
              type="number"
              maxLength="9"
              name="passaport"
              className="block w-60 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.passaport}
              onChange={handleChange}
            />
        </div>

        {/* Emmail  */}
          <div>
            <label 
              className="text-black dark:text-gray-200"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="block w-60 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.email}
              onChange={handleChange}
            />
        </div>

        {/* Phone */}
          <div>
            <label 
              className="text-black dark:text-gray-200"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              id="phone"
              type="number"
              maxLength="11"
              minLength='11'
              name="phone"
              className="block w-60 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.phone}
              onChange={handleChange}
            />
        </div>
        
        {/* Data de Nascimento   */}
          <div>
            <label
              className="text-black dark:text-gray-200" 
              htmlFor="birth_date"
            >
              Data de Nascimento:</label>
            <input
              id="birth_date"
              type="date" 
              name="birth_date" 
              className="block w-30 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.birth_date}
              onChange={handleChange} 
              required
            />
        </div> 
        
        {/* Sexo   */}
        <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="sexuality"
            >
              Sexo:
            </label>
            <select
              id="sexuality"
              name="sexuality"
              className="block w-40 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-gray-600 rounded-xl"
              onChange={handleChange}
              value={formData.sexuality}
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outros</option>
            </select>
        </div>
        
        {/* Estado Civil   */}
          <div>
            <label
              className="text-black dark:text-gray-200"
              htmlFor="civil_status"
            >
                Estado Civil:
            </label>
            <select
              id="civil_status"
              name="civil_status"
              className="block w-40 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-gray-600 rounded-xl"
              onChange={handleChange}
              value={formData.civil_status}
              required
            >
              <option value="SOL">Solteiro(a)</option>
              <option value="CAS">Casado(a)</option>
              <option value="SEP">Separado(a)</option>
              <option value="DIV">Divorciado(a)</option>
              <option value="VIU">Viúvo(a)</option>
            </select>
        </div>
        
        {/* Nome da Mãe   */}
          <div className="flex-col w-full">
            <label
              className="text-black dark:text-gray-200"
              htmlFor="mother_name"
            >Nome Da Mãe:</label>
            <input
              id="mother_name"
              type="text"
              name="mother_name"
              className="flex-grow w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.mother_name}
              onChange={handleChange}
              required
            />
        </div>
        
        {/* Nome do Pai   */}
          <div className="flex-col w-full">          
            <label
              className="text-black dark:text-gray-200"
              htmlFor="father_name"
            >
                Nome Do Pai:
            </label>
            <input
              id="father_name"
              type="text"
              name="father_name"
              className="flex-grow w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-400 dark:bg-transparent dark:text-white rounded-xl"
              value={formData.father_name}
              onChange={handleChange}
            />
          </div>
        
        
        {/* Senha   */}

{/*         
          <div className="my-8 bg-gray-100 border p-3">
            <label
              className="text-black" 
              htmlFor="password"
            >
                Senha:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          {errorMessages.passaport && <p style={{ color: 'red' }}>{errorMessages.passaport}</p>}
        </div>

         */}
        </div>

        {/* {errors?.length > 0 && (
          <div className="mt-4">
            <ul className="text-red-600">
              {errors.map((error, index) => (
                <li key={index}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
      )} */}
      


      
      {/* {Imagem de Perfil e Vídeo}   */}
      <div className="w-full flex justify-evenly my-4 border dark:border-gray-400 border-gray-200 p-3 bg-gray-100 dark:bg-transparent dark:border-none">
          <div>
            <label 
              className="block text-md font-medium text-black dark:text-gray-200"
              htmlFor="img_profile"
            >
              Imagem de perfil:
            </label>
            <div className="mt-1 flex max-w-40 hover:bg-white dark:hover:bg-slate-600 justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
              <div 
                className="space-y-1 text-center"
              >
              {imageURL ? (
                    <Image
                      src={imageURL} 
                      alt="Profile" 
                      style={{ width: '100px', height: '100px' }}
                      />
                  ) : 
                  <div>
                    <svg className="mx-auto h-12 w-12 text-black dark:text-slate-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label 
                        class="relative cursor-pointer rounded-xl font-medium text-indigo-600 dark:text-orange-500 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        htmlFor="img_profile"
                      >
                        <span className="">Carregue um arquivo</span>
                        <input
                          id="img_profile"
                          type="file"
                          name="img_profile"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1 text-black dark:text-gray-200">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-black dark:text-gray-200">
                          PNG, JPG, GIF de até 10MB
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>

          <div>
            <label 
              className="block text-md font-medium text-black dark:text-gray-200"
              htmlFor="video"
            >
              Vídeo:
            </label>
            <div className="mt-1 flex w-full justify-center px-6 pt-5 pb-6 border-2 hover:bg-white dark:hover:bg-slate-600 border-gray-300 border-dashed rounded-xl">
              <div 
                className="space-y-1 text-center"
              >
                <svg className="mx-auto h-12 w-12 text-black dark:text-gray-200" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label 
                    class="relative cursor-pointer rounded-xl font-medium text-indigo-600 dark:text-orange-500 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    htmlFor="video"
                  >
                    <span className="">Carregue um arquivo:</span>
                    <input
                      type="file"
                      id="video"
                      name="video"
                      accept="video/*"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1 text-black dark:text-gray-200">ou arraste e solte</p>
                </div>
                <p className="text-xs text-black dark:text-gray-200">
                      Video em mp4 de até 10mb
                </p>
              </div>
            </div>
            {/* {src ? <Image src={src} alt="Your Company" width={32} height={32} /> : null} */}
          </div>

          {/* <div>
            <label
              className="text-black" 
              htmlFor="password"
            >
                Senha:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errorMessages.passaport && <p style={{ color: 'red' }}>{errorMessages.passaport}</p>}
          </div> */}
    </div>
    </div>
  );
};



DocumentationSection.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessages: PropTypes.object.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};


export default DocumentationSection;


























{/* 
      <input
        label={'Perfil De Usuário:'}
        id={'full_name'}
        name={'full_name'}
        value={formData.civil_status}
        onChange={handleChange('civil_status', value)}
        options={[
          { value: 'SOL', label: 'Solteiro(a)' },
          { value: 'CAS', label: 'Casado(a)' },
          { value: 'SEP', label: 'Separado(a)' },
          { value: 'DIV', label: 'Divorciado(a)' },
          { value: 'VIU', label: 'Viúvo(a)' },
        ]}
      /> */}

      {/* <input
          label={'Endereço:'}
          id={'address'}
          type={'text'}
          name={'address'}
          error={errorMessages.address}
          value={getFullAddress()}
          onChange={handleChange('address', value)}
      /> */}









      {/* 
        <SelectField
          label={'Nacionalidade:'}
          id={'nationality'}
          name={'nationality'}
          value={formData.nationality}
          error={errorMessages.nationality}
          onChange={handleChange('nationality', value)}
          options={countries.map(country => ({
            value: country.name.common,
            label: country.name.common
          }))}
        />
        {errorMessages.nationality && <p style={{ color: 'red' }}>{errorMessages.nationality}</p>} */}
