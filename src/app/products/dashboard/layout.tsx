import LayoutComponent from '@/components/products/LayoutComponent';
import SideNav from '@/components/shared/sidenav/sidenav';
import { montserrat } from '@/components/ui/fonts/fonts';
import '@/sass/globals.sass';

const navmsj = () => {
    return (
        <div>
        </div>
    );
};

const Layout = ({ children }:{children:React.ReactNode}) => {
    return (

        <div className={`${montserrat.className} overflow-visible dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800`}>
            <LayoutComponent
                navbarChildren={navmsj()}	
                sidebarChildren={<SideNav/>}
                contenChildren={children}
            />

        </div>
    );
}

export default Layout;