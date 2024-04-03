import {Montserrat, Lusitana, Inter, Teko} from 'next/font/google'


export const montserrat = Montserrat({
    weight: ["400", "700"],
    subsets: ['latin'] })

export const teko = Teko({
    weight: ["400", "700"],
    subsets: ['latin']
})
    
export const lusitana = Lusitana({ 
    weight: ["400", "700",],
    subsets: ['latin'] 
})

export const inter = Inter({ subsets: ['latin'] });