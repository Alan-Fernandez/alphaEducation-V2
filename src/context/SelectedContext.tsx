import React from 'react';

export interface HeadOffices {
    id: string;
    // otras propiedades si las hay
}

export const SelectedContext = React.createContext({
    selectedTura: null as string | null,
    setSelectedTura: (value: string | null) => {},

    selectedDivision: null as string | null,
    setSelectedDivision: (value: string | null) => {},

    selectedOfficeId: null as string | null,
    setSelectedOfficeId: (value: string | null) => {},

    // Seleccion de perfil---
    selectedProfileId: null as string | null,
    setSelectedProfileId: (value: string | null) => {},

    userProfile: null as string | null, // Agrega esto
    setUserProfile: (value: string | null) => {}, // Agrega esto

    userHeadOfficeId: null as HeadOffices | null,
    setUserHeadOfficeId: (value: HeadOffices | null) => {},

});