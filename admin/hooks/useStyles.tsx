import React from 'react';
import { createStyles } from '@mantine/core';
const useStyles = createStyles((theme, _params, getRef) => {
  const icon: any = getRef('icon');
  return {
    wrapper: {
      minHeight: 900,
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wwun?ver=f5d4)',
    },

    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      minHeight: 900,
      maxWidth: 450,
      paddingTop: 80,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },

    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      height: '3em',
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
    user: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    },
    tableHeader: {
      position: 'sticky',
      top: 0,
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease',

      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[2]
        }`,
      },
    },

    scrolled: {
      boxShadow: theme.shadows.sm,
    },
    root: {
      display: 'flex',
      backgroundImage: `linear-gradient(-60deg, ${
        theme.colors[theme.primaryColor][4]
      } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
      padding: theme.spacing.xl * 1.5,
      borderRadius: theme.radius.md,
      width: '100%',
      textAlign: 'center',
      [theme.fn.smallerThan('sm')]: {
        flexDirection: 'column',
      },
    },

    invoice_title: {
      color: theme.white,
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: theme.fontSizes.sm,
    },

    count: {
      color: theme.white,
      fontSize: 32,
      lineHeight: 1,
      fontWeight: 700,
      marginBottom: theme.spacing.md,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    description: {
      color: theme.colors[theme.primaryColor][0],
      fontSize: theme.fontSizes.sm,
      marginTop: 5,
    },

    stat: {
      flex: 1,

      '& + &': {
        paddingLeft: theme.spacing.xl,
        marginLeft: theme.spacing.xl,
        borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

        [theme.fn.smallerThan('sm')]: {
          paddingLeft: 0,
          marginLeft: 0,
          borderLeft: 0,
          paddingTop: theme.spacing.xl,
          marginTop: theme.spacing.xl,
          borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
        },
      },
    },
  };
});

export default useStyles;
