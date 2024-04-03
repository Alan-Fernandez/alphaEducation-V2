"use client";

import { SessionProvider } from "next-auth/react";
import { SelectedContext } from '../context/SelectedContext';
import { useEffect, useState } from "react";
import { HeadOffices } from "../context/SelectedContext";

interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedTura, setSelectedTura] = useState<string | null>(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [userHeadOfficeId, setUserHeadOfficeId] = useState<HeadOffices | null>(null);
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDivision(localStorage.getItem('selectedDivision') || null);
    setSelectedTura(localStorage.getItem('selectedTura') || null);
    setSelectedOfficeId(localStorage.getItem('selectedOfficeId') || null);
    setSelectedProfileId(localStorage.getItem('selectedProfileId') || null);
    setUserProfile(localStorage.getItem('userProfile'));

    let initialUserHeadOfficeId = null;
    try {
      const storedValue = localStorage.getItem('userHeadOfficeId');
      if (storedValue !== null) {
          initialUserHeadOfficeId = JSON.parse(storedValue);
      }
    } catch (error) {
      console.error('Error parsing userHeadOfficeId from localStorage', error);
    }
    setUserHeadOfficeId(initialUserHeadOfficeId);
  }, []);

  useEffect(() => {
    if (selectedDivision !== null) {
        localStorage.setItem('selectedDivision', selectedDivision);
    }
    if (selectedTura !== null) {
        localStorage.setItem('selectedTura', selectedTura);
    }
    if (selectedOfficeId !== null) {
        localStorage.setItem('selectedOfficeId', selectedOfficeId);
    }
    if (selectedProfileId !== null) {
        localStorage.setItem('selectedProfileId', selectedProfileId);
    }
    if (userHeadOfficeId !== null) {
        localStorage.setItem('userHeadOfficeId', userHeadOfficeId ? JSON.stringify(userHeadOfficeId) : '');
    }
    if (userProfile !== null) {
        localStorage.setItem('userProfile', userProfile);
    }
  }, [selectedDivision, selectedTura, selectedOfficeId, selectedProfileId, userHeadOfficeId, userProfile]);

  return (
    <SessionProvider>
      <SelectedContext.Provider value={
          {
            userHeadOfficeId, 
            setUserHeadOfficeId, 
            selectedProfileId, 
            setSelectedProfileId, 
            selectedDivision, 
            setSelectedDivision, 
            selectedTura, 
            setSelectedTura, 
            selectedOfficeId, 
            setSelectedOfficeId, 
            userProfile, 
            setUserProfile 
          }}
        >
        {children}
      </SelectedContext.Provider>
    </SessionProvider>
  )
};
export default SessionAuthProvider;