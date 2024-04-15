import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Avatar, Text, Group, UnstyledButton } from '@mantine/core';
import {
  IconDoor,
  IconLogout,
  IconLayoutDashboard,
  IconBrandBooking,
  IconBuildingSkyscraper,
  IconAdjustmentsAlt,
} from '@tabler/icons';
import useStyles from 'hooks/useStyles';
import { useAuth } from 'hooks';
import { routes, Navigations } from 'utils';
import shallow from 'zustand/shallow';
const navigations = [
  {
    id: 1,
    link: routes.home,
    label: 'Bảng điều khiển',
    icon: IconLayoutDashboard,
  },
  {
    id: 2,
    link: routes.manageRoom,
    label: 'quản lý phòng khách sạn',
    icon: IconBuildingSkyscraper,
  },
  {
    id: 3,
    link: routes.manageBooking,
    label: 'quản lý đơn đặt phòng',
    icon: IconBrandBooking,
  },
  {
    id: 4,
    link: routes.setting,
    label: 'Cài đặt',
    icon: IconAdjustmentsAlt,
  },
];
type TypeNav = {
  onClose: () => void;
};
export function NavbarChild({ onClose }: TypeNav) {
  const router = useRouter();
  const [logout, user] = useAuth(
    (state) => [state.logout, state.user],
    shallow,
  );
  const token = user?.access_token;
  const { classes, cx } = useStyles();
  const links = navigations.map((item) => (
    <span
      className={cx(classes.link, {
        [classes.linkActive]: item.link === router.pathname,
      })}
      onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        onClose();
      }}
      key={item.id}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />

      <Link href={item.link}>{item.label}</Link>
    </span>
  ));
  useEffect(() => {
    if (user === null) {
      router.push(routes.login);
    }
  }, []);
  return (
    <>
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <div className={classes.user}>
          <Group>
            <Avatar radius="xl" />
            <div style={{ flex: 1 }}>
              <Text>{user?.user?.fullName}</Text>
              <Text>{user?.user?.email}</Text>
            </div>
            <IconLogout size={15} stroke={1.5} onClick={() => logout(token)} />
          </Group>
        </div>
      </Navbar.Section>
    </>
  );
}
