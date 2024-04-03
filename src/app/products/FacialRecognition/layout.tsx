import React from 'react'
import CurrentTime from '@/src/app/ui/products/FacialRecognition/CurrentTime/CurrentTime'
import LayoutComponent from '@/src/app/ui/products/LayoutComponent'

export default function layout (
    {children}: {children: React.ReactNode}
    ){
    return (
        <div className='no-scrollbar'>
            <LayoutComponent
                navbarChildren={<CurrentTime/>}	
                sidebarChildren={null}
                contenChildren={children}
            />
        </div>
    )
}
