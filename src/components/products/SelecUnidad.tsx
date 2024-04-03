"use client";
import React, { useState, useEffect } from "react";
import styled from "./SelecUnidad.module.scss";
import { SelectedContext } from '@/src/context/SelectedContext';

interface HeadOffice {
  id: string;
  company_name: string;
}

interface OfficeId {
  id: string;
  company_name: string;
  head_office: HeadOffice;
  name: string;
}

interface SelecUnidadProps {
  index: number;
  officeId:  OfficeId;
  setIsEscolas: () => void;
  setOfficeId: (value: string | null) => void; 
  setOfficeValue: (value: string | null) => void; 
  selectedDivision: string | null; 
  compName: string; 
}

export const SelecUnidad = ({compName, index, officeId, setOfficeId, setOfficeValue, selectedDivision  }:SelecUnidadProps) => {
  const [officeIdState, setOfficeIdState] = useState<string | null>(null);
  const [officeValueState, setOfficeValueState] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false); 
  

  useEffect(() => {
    if (officeIdState !== null) {
      localStorage.setItem('officeId', officeIdState);
    }  
    if (officeValueState !== null) {
      localStorage.setItem('officeValue', officeValueState);
    } else {
      localStorage.setItem('officeValue', '');
    }
  }, [officeIdState, officeValueState]);

  const handleDivisionClick = (index: string, value: string) => {
    const newIndex: string | null  = `${index}` === selectedDivision ? null : index;
    setOfficeId(newIndex);
    setOfficeValue(value);
    setOfficeIdState(newIndex);
    setOfficeValueState(value);
    setIsSelected(!isSelected); 
  };

  return (
    <div className="inline-flex flex-wrap items-center">
        <div>
          {
            <div className="flex flex-wrap items-center justify-center">
                <button
                className={`border border-gray-300 rounded px-5 py-2 cursor-pointer flex-grow m-2 hover:bg-gray-200 ${
                    isSelected ? "bg-blue-600 text-white" : "bg-white text-black"  // Usa el estado isSelected para determinar si el botón debe ser azul
                }`}
                onClick={() => handleDivisionClick( `${index}`, officeId.name)}
                >
                  {
                    compName == 'company_name' ?
                    <p>
                      {officeId.company_name}
                    </p>:
                    <p>
                      {officeId.name}
                    </p>
                  }
                </button>
            </div>
          }
        </div>
    </div>
  );
};