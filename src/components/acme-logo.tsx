import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/src/app/ui/fonts/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      {/* <p className="text-[44px]">Alpha</p> */}
              <Image
                // className="h-20 w-auto"
                src="/AlphaEduc - horizontal.svg"
                alt="Alphaeduc_LOGO"
                width={200} // Añade la propiedad width
                height={50} // Añade la propiedad height
              />
    </div>
  );
}
