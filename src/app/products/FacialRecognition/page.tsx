"use client"
import React from 'react';
import CameraAccess from '@/src/app/ui/products/FacialRecognition/CameraAccess/CameraAccess';
import { Suspense } from 'react';

const FacialRecognition = () => {
    return (

        <div className="text-center" >
            
                <h2 className="text-blue-600 text-3xl font-bold m-12">
                    APROXIME O ROSTO PARA SE IDENTIFICAR
                </h2>
            
            
                <div className='flex justify-center'>
                <div>
                        <CameraAccess />
                </div>
                    
            </div>
        </div>
    );
};

export default FacialRecognition;

// className="flex justify-center items-center h-screen w-screen"