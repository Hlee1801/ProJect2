import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { routes } from '../../utils/routes';
import AppLayout from './AppLayout';
const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const diffLayout = !router.asPath.includes(routes.login);
  return (
    <>{diffLayout ? <AppLayout>{children}</AppLayout> : <>{children}</>}</>
  );
};

export default Layout;
