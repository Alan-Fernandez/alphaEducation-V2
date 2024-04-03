// @ts-nocheck
"use client";
import React, { useState, useRef  } from 'react';
import styled from './Modal.module.scss'
import CourseForm from '../products/dashboard/Register/CourseForm/CourseForm';

const EventFilter = (
    { isModalOpen, setIsModalOpen,  setFilterParams, filterParams, handleApplyFilter, handleChange }:
  {
    isModalOpen:React.ReactNode;
    setIsModalOpen: (val: boolean) => void;  
    setFilterParams: (val: any) => void;
      filterParams: {
        full_name: string;
        event_type: string;
        start_date: string;
        end_date: string;
        date: string;
      }; 
    handleApplyFilter: (val: any) => void; 
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  }
) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

  const modalHandler = (val) => {
    setIsModalOpen(val);
  };

  return (
    <>

    { isModalOpen && 
    <div className={styled.modal}>
      <div
        className={`py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0`}
        // id="modal"
      >
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg ">
          <div className="py-8 px-5 md:px-10 bg-white dark:bg-slate-600 shadow-md rounded border border-gray-400 dark:border-none items-baseline ">
            <div className="w-full flex text-gray-600 items-center mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-wallet text-gray-800 dark:text-gray-200"
                width="52"
                height="52"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                  </svg>
                  <h1 className="text-gray-800 dark:text-gray-200 font-xl font-bold ">
                  Filtrar Pesquisa
                  </h1>
            </div>
            
            <label htmlFor="full_name" className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal">
              Nome Completo:
            </label>
            <input
              id="full_name"
              name='full_name'
              className="mb-5 mt-2 text-gray-600 dark:text-white dark:bg-slate-500 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-11 flex items-center pl-3 text-sm border-gray-400 rounded-xl border-2"
              value={filterParams.full_name}
              onChange={handleChange}
              placeholder="Nome Completo"
            />
            <div
              className="items-center mb-5 mt-2"
            >
              <label 
                htmlFor="event_type"
                className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mr-3"
              >
                Status:
              </label>
              <div 
                className="flex-grow"
              >
                <select
                  id="event_type"
                  name="event_type"
                  // className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
                  className="mb-5 mt-2 text-gray-600 dark:text-white dark:bg-slate-500 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-11 flex items-center pl-3 text-sm border-gray-400 rounded-xl border-2"
                  onChange={handleChange}
                  value={filterParams.event_type}
                >
                  <option value={'Selecione o Status'}>Selecione o Status</option>
                  <option value="IN">Entrada</option>
                  <option value="OUT">Saída</option>
                </select>
              </div>
            </div>
            
            <CourseForm
              handleChange={handleChange}
              formData={filterParams}
              titleName={''}
            />
            <div className='flex flex-wrap justify-between'>
              <div 
                className="flex-wrap items-center mb-5 mt-2"
              >
                <label 
                  htmlFor="start_date" 
                  className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mr-3 items-center"
                >
                  Data Inicial:
                </label>

                  <div 
                    className="flex-grow"
                  >
                    <input
                      id="start_date"
                      name='start_date'
                      type="date" 
                      className="text-gray-600 dark:text-white dark:bg-slate-500 focus:outline-none focus:border focus:border-indigo-700 font-normal w-10px h-11 flex items-center pl-3 text-sm border-gray-400 rounded-xl border-2"
                      placeholder="MM/YY"
                      value={filterParams.start_date}
                      onChange={handleChange}
                    />
                  </div>
              </div>

              <div
                className="items-center mb-5 mt-2"
              >
                <label 
                  htmlFor="end_date" 
                  className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mr-3"
                >
                  Data Final:
                </label>
                <div 
                  className="flex-grow"
                >
                  <input
                    id="end_date"
                    name='end_date'
                    type="date" 
                    className="text-gray-600 dark:text-white dark:bg-slate-500 focus:outline-none focus:border focus:border-indigo-700 font-normal w-10px h-11 flex items-center pl-3 text-sm border-gray-400 rounded-xl border-2"
                    placeholder="MM/YY"
                    value={filterParams.end_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div
                className="items-center mb-5 mt-2"
              >
                <label 
                  htmlFor="date" 
                  className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mr-3"
                >
                  Data:
                </label>
                <div 
                  className="flex-grow"
                >
                  <input
                    id="date"
                    name='date'
                    type="date" 
                    className="text-gray-600 dark:text-white dark:bg-slate-500 focus:outline-none focus:border focus:border-indigo-700 font-normal w-10px h-11 flex items-center pl-3 text-sm border-gray-400 rounded-xl border-2"
                    placeholder="MM/YY"
                    value={filterParams.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start w-full mt-10">
              <button 
                className="hover:opacity-90 bg-indigo-700 dark:bg-indigo-800 rounded-3xl font-medium text-white px-12 py-2 text-md"
                onClick={() => handleApplyFilter('filter')}
              >
                Filtrar
              </button>
              <button
                className="ml-3 text-gray-600 dark:text-gray-200 hover:border-gray-400 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-3xl font-medium px-8 py-2 text-md"
                onClick={() => modalHandler(false)}
              >
                Cancelar
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={() => modalHandler(false)}
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    }
    </>
);
};

export default EventFilter;
