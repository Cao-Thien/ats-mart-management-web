'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Box, Button, Container, Paper, Typography } from '@mui/material';
import AtsInputFieldLogin from '@/components/AtsInputFieldLogin';
import logo from '@/assets/images/logo.svg';
import iconUser from '@/assets/images/icon-user.svg';
import iconLock from '@/assets/images/icon-lock.svg';

// ACTIONS
import { login } from 'actions/authActions';

// HOOKS
import { useNotification } from 'hooks/useNotification';
import useResponsive from 'hooks/useResponsive';

export default function Login() {
  const router = useRouter();
  const { error } = useNotification();
  const { isMobile } = useResponsive();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await login({ username, password });
    if (result) {
      router.replace('/stock-reports', { scroll: false });
    } else {
      error('로그인 실패');
    }
  };

  return (
    <Container
      id="hello"
      component="main"
      sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Paper
        elevation={0}
        sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'transparent' }}
      >
        <Image src={logo} alt="Amazon" width={isMobile ? 298 : 188} height={isMobile ? 80 : 120}></Image>
        <Typography
          component="h5"
          textAlign={'center'}
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ color: '#2D3038', mt: '40px' }}
        >
          세일즈 매니저만 로그인할 수 있습니다!
        </Typography>
        <Box component="form" sx={{ mt: '64px', width: '100%' }}>
          <AtsInputFieldLogin
            // @ts-ignore
            onChange={e => setUsername(e.target.value)}
            onKeyDown={(e: WindowEventMap['keydown']) => e.key === 'Enter' && handleLogin()}
            IconProps={{
              src: iconUser,
            }}
            InputBaseProps={{
              id: 'username',
              name: 'username',
              placeholder: '아이디',
              autoFocus: true,
            }}
          ></AtsInputFieldLogin>
          <AtsInputFieldLogin
            // @ts-ignore
            onChange={e => setPassword(e.target.value)}
            onKeyDown={(e: WindowEventMap['keydown']) => e.key === 'Enter' && handleLogin()}
            IconProps={{
              src: iconLock,
            }}
            InputBaseProps={{
              type: 'password',
              id: 'password',
              name: 'password',
              placeholder: '비밀번호',
              autoComplete: 'current-password',
            }}
            sx={{
              mt: '24px',
            }}
          ></AtsInputFieldLogin>
          <Button
            size="large"
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: '48px',
              height: '56px',
              borderRadius: '9999px',
              fontSize: '18px',
              lineHeight: '22px',
            }}
          >
            로그인
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
