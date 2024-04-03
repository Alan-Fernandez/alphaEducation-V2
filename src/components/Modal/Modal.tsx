import React from 'react';
import styled from './Modal.module.scss'




const Modal = (
  {children, isModalOpen, setIsModalOpen}:
  {
    children: React.ReactNode, 
    isModalOpen: boolean, 
    setIsModalOpen: (val: boolean) => void
  }) => {

    return (
      <>
        {
          isModalOpen && 
            <div className={styled.modal}>
                <div>
                    <div 
                      // className={styled.content}
                    >
                      {children}
                    </div>
                    <button className={styled.butSelec}/>
                </div>
            </div>
        }
      </>
    )
}


export default Modal;