// COMPONENTS
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import Container, { ContainerProps } from '@mui/material/Container';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';

// ASSETS
import amazonLogo from 'assets/images/logo/amazonlogo_final.svg';
import { ReactNode, useEffect, useMemo, useState } from 'react';

//HOOKS
import { logout } from 'actions/authActions';

// TODO
import { Button } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import Image from 'next/image';

type FrontOuterProps = {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
};

const BasicLayout = ({ maxWidth, children }: FrontOuterProps) => {
  const [isClient, setIsClient] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const { isMobile } = useResponsive();
  const isLoginPage = useMemo(() => pathName === '/login', [pathName]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function onLogout() {
    await logout();
    router.refresh();
    router.replace('/login', { scroll: false });
  }

  if (!isClient) {
    return null;
  }

  const LogoutButton = () => {
    return (
      <Button onClick={onLogout}>
        <PowerSettingsNewIcon />
        <Typography mx={2}>로그 아웃</Typography>
      </Button>
    );
  };

  function Main() {
    return !isMobile ? (
      <Grid xs component="main" overflow="auto">
        <Container sx={{ height: '100%', width: '100%' }} maxWidth={maxWidth} disableGutters={maxWidth === false}>
          {children}
        </Container>
      </Grid>
    ) : (
      <Grid xs component="main" overflow="auto">
        <Container
          sx={{ height: '100%', width: '100%', px: 0 }}
          maxWidth={maxWidth}
          disableGutters={maxWidth === false}
        >
          {children}
        </Container>
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      height="100vh"
      width="100vw"
      bgcolor="background.default"
      rowGap={{ xs: 2, sm: 0 }}
      position={'relative'}
    >
      <Grid component="header" width="100%" zIndex={9} top={0}>
        <Paper>
          <Container>
            <Grid
              container
              flexWrap="nowrap"
              alignItems="center"
              mb={{ xs: 0, sm: 5 }}
              columnGap={{ xs: 1, sm: 3 }}
              py={2}
            >
              <Grid xs={4} sm="auto">
                <Link href="/stock-reports">
                  <Image
                    src={amazonLogo}
                    height={70}
                    width={100}
                    alt="Amazon Logo"
                    priority
                    style={{ objectFit: 'contain' }}
                  />
                </Link>
              </Grid>
              {isLoginPage ? (
                <Grid xs="auto" fontFamily="Gowun Batang">
                  <Typography fontSize={{ xs: 16, sm: 28 }} color="primary.dark">
                    마트 재고관리 웹
                  </Typography>
                </Grid>
              ) : null}
              <Grid xs="auto" textAlign="end" ml="auto">
                {LogoutButton()}
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Grid>
      {/* Main */}
      {Main()}
      <Grid xs="auto" component="footer">
        {/* Footer section */}
      </Grid>
    </Grid>
  );
};

export default BasicLayout;
