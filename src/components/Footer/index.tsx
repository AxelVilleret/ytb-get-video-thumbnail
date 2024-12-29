import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { ThemeContext } from '../../App';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://axel-villeret.netlify.app/">
                Axel Villeret
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {

    const { darkThemeActive } = useContext(ThemeContext);
    return (
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: darkThemeActive
                            ? 'rgba(0, 0, 0, 0.87)'
                            : 'rgba(255, 255, 255, 0.87)',
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1" color={darkThemeActive ? 'text.primary' : 'text.secondary'}>
                            Made with ❤️ by Axel Villeret
                        </Typography>
                        <Copyright />
                    </Container>
                </Box>
    );
}