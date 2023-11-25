import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import{useEffect}from 'react'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
              www.grupoInnova6d.com
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

const theme = createTheme();

export default function Login() {
    useEffect(() => {
       alert("Al aceptar esta ventana usted está aceptando los términos y condiciones de uso, sus datos serán tratados conforme a lo dispuesto en la ley.")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const navigate = useNavigate();
    const axios = require("axios").default;
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('email')==="" || data.get('password')===""){
            alert("Falta un dato");
        }else{
            var parametros = {"user":data.get("email"), "password":data.get("password")};
            axios.post("http://localhost:3053/login", parametros)
            .then((contesto)=>{
                if(contesto.status===200 && contesto.data!=null){
                    sessionStorage.setItem("usuario", contesto.data.user);
                    sessionStorage.setItem("admin", contesto.data.administrator);
                    if(contesto.data.type==="camarero"){
                        navigate('/'+data.get('email')+'/camarero');
                    }else{
                        navigate('/'+data.get('email')+'/cocinero');
                    }
                }
            })
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                  >
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                          <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                          Acceso de usuario
                      </Typography>
                      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                          <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Usuario"
                              name="email"
                              autoComplete="email"
                              autoFocus
                          />
                          <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Contraseña"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                          />

                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                            >
                                Acceder
                          </Button>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                              onClick={()=>navigate("/")}
                            >
                                Atrás
                           </Button>
                      </Box>
                  </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
