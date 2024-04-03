"use client";

import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const WithAutoLogout = (WrappedComponent: React.ComponentType<any>) => {

    const AutoLogoutComponent = (props: any) => {
        const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
        const pathname = usePathname();

        const handleSignOut = () => {
            signOut();
        };

        useEffect(() => {
            const resetLogoutTimer = () => {
                if (logoutTimer) {
                    clearTimeout(logoutTimer);
                }
                
                if (pathname == '/products/FacialRecognition') {
                    setLogoutTimer(setTimeout(handleSignOut, 24 * 60 * 60 * 1000));
                } else {
                    setLogoutTimer(setTimeout(handleSignOut, 60 * 60 * 1000));   
                }
            };

            window.addEventListener('mousemove', resetLogoutTimer);
            window.addEventListener('keydown', resetLogoutTimer);
            window.addEventListener('scroll', resetLogoutTimer);

            return () => {
                if (logoutTimer) {
                    clearTimeout(logoutTimer);
                }
                window.removeEventListener('mousemove', resetLogoutTimer);
                window.removeEventListener('keydown', resetLogoutTimer);
                window.removeEventListener('scroll', resetLogoutTimer);
            };
        }, [logoutTimer, pathname]);

        return <WrappedComponent {...props} />;
    };

    AutoLogoutComponent.displayName = `WithAutoLogout(${getDisplayName(WrappedComponent)})`;

    function getDisplayName(WrappedComponent: React.ComponentType<any>) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    return AutoLogoutComponent;
};

export { WithAutoLogout };