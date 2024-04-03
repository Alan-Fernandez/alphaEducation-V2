import React, { useRef, useEffect, useState, Suspense } from 'react';
import styles from './SelecUnidad.module.css';
import { useSession } from "next-auth/react";
import axios from 'axios';

const CameraAccess = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUserDetected, setIsUserDetected] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  
  const [userData, setUserData] = useState({
    user_id: null,
    user_name: null,
    event_type: null,
  });

  const [detectionCount, setDetectionCount] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
      } catch (error) {
        console.error('Erro ao conectar a camera:', error);
      }
    };

    const sendImageToServer = async (dataUrl) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/facial-recognition/`, {
          image: dataUrl
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(response.data.user_id === undefined){
          setServerMessage('');
        } else {
          setServerMessage(response.data.event_type);
        }
        setIsUserDetected(true);
        setUserData({
          user_id: response.data.user_id,
          user_name: response.data.user_full_name,
        });
      } catch (error) {
        setServerMessage('');
        setIsUserDetected(false);

        setUserData({
          user_id: null,
          user_name: null,
          event_type: null,
        });
      }
    };

    const captureFrame = () => {
      context.drawImage(video, 0, 0, 640, 480);
      const dataUrl = canvas.toDataURL('image/png');
      sendImageToServer(dataUrl);
    };

    getUserMedia();

    const intervalId = setInterval(captureFrame, 5000);

    return () => {
      clearInterval(intervalId);

      // Detener la reproducción y cerrar la cámara al desmontar el componente
      const tracks = video.srcObject?.getTracks();
      
      if (tracks) {
        tracks.forEach((track) => {
          track.stop();
        });
      }

      // Limpiar el srcObject para evitar posibles problemas de referencia
      video.srcObject = null;
    };
  }, [detectionCount]);

  return (
      <div>
      
        <div
        className={`
          ${styles.camera} 
          ${
            serverMessage === 'Entrada' && userData.user_id !== undefined  ? styles.entrada : 
            serverMessage === 'Saída' && userData.user_id !== undefined  ? styles.salida : 
            userData.user_id == undefined  ? styles.notDetected :
            userData.user_id == null  ? styles.notDetected : ''
          }
        `}
      >
        <video
          id="video"
          width="400"
          height="300"
          ref={videoRef}
          autoPlay
          // style={{ display: isUserDetected ? 'block' : 'none' }}
        />
      </div>
      <canvas id="canvas" width="640" height="480" ref={canvasRef} style={{ display: 'none' }}/>
      {isUserDetected || userData.user_id == null? (
        
        <div
          className="w-full grid grid-cols-2 gap-6 mt-28 place-items-start border rounded-xl p-10 items-baseline"
        >
          <div>
            {userData.user_id !== undefined && (
              <p
                className="text-3xl font-bold text-blue-500 bg-gray-200 rounded-3xl px-5 py-1"
              >
                {
                  userData.user_id == null ? '' : 
                  serverMessage
                }
              </p>
            )}
          </div>
          <div className="font-semibold text-xl text-blue-500 flex gap-1">
          <p className='font-bold'>ID:</p>
            <p>
              {`${userData.user_id}`}
            </p>
          </div>
          <div className="font-semibold text-xl text-blue-500 flex gap-1">
          <p className='font-bold'>Nome:</p>
            <p>
                {
                  userData.user_id == undefined ? 'reconociendo usuario...': 
                  userData.user_id !== null ? userData.user_name:
                  userData.user_id == null ? 'Usuario não cadastrado':
                  '' 
                }
            </p>
          </div>
        </div>
        
        ) : null}
    </div> 
    
  );
};

export default CameraAccess;