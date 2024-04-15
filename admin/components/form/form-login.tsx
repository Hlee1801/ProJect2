import React, { useEffect } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Paper, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import { IconLogin } from '@tabler/icons';
import { useStyles } from 'hooks';
import { useRouter } from 'next/router';
import { emailRegex, routes, ILogin, loginSchema } from 'utils';
import { useAuth } from 'hooks';
import shallow from 'zustand/shallow';
import { showNotification } from '@mantine/notifications';

const FormLogin = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: zodResolver(loginSchema),
  });

  const [login, user, auth] = useAuth(
    (state) => [state.login, state.user, state.auth],
    shallow,
  );
  const onSubmit = (data: ILogin) => {
    login(data);
  };
  useEffect(() => {
    if (user?.user?.role === 'admin') {
      router.push(routes.home);
    }
  }, [auth, router, user]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Admin
          </Title>

          <TextInput label="Email" size="md" {...form.getInputProps('email')} />
          <PasswordInput
            label="Mật khẩu"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
          />
          <Button
            leftIcon={<IconLogin />}
            fullWidth
            mt="xl"
            size="md"
            type="submit"
          >
            Đăng Nhập
          </Button>
        </Paper>
      </div>
    </form>
  );
};

export default FormLogin;
