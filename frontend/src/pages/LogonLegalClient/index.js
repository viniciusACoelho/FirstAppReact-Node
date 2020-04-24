import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Image from '../../assets/paper.jpg';
import Image2 from '../../assets/paper2.jpg';

const useStyles = makeStyles((theme) => ({

    margin: {
        margin: theme.spacing(1),

    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
        
        
    },
    buttonLink: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        color: '#41414d',
        fontSize: '18px',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'opacity 0.2s',
    },
    container: {
        backgroundImage: `url(${Image})`,
        

    },
    menu: {
        backgroundImage: `url(${Image2})`,
        backgroundPosition: 'center',
        
        
    },
    textColor: {
        color: "white"
    },
    buttonColor: {
        color: "white",
        backgroundColor: "#ffab00",
        textTransform: "none",
        transition: "all 0.5s ease-out"
    },
    typography: {
        marginLeft: 10,

    }
    
}));



export default function Logon() {

    const classes = useStyles();
    const [pk_id_legal_client, setId] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = React.useState({
        showPassword: false
    });



    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session-legal-client', { pk_id_legal_client, password });

            localStorage.setItem('legal_client_name', response.data.name);
            localStorage.setItem('legal_client_password', response.data.password);
            localStorage.setItem('legal_client_id', response.data.pk_id_legal_client);

            history.push('/home-legal-client');
        } catch (err) {
            alert('Falha no login, tente novamente.');

        }
    }

    return (
        <Grid className={classes.container}>
            <Container className={classes.menu}>
                <Grid style={{ height: '100vh' }} container item direction="column" justify="center" alignItems="center">

                    <FormControl  xs={12} className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel  className={classes.textColor} >ID</InputLabel>
                        <OutlinedInput
                            
                            autoComplete='off'
                            className={classes.textColor}
                            id="outlined-adornment-pk_id_legal_client"
                            value={pk_id_legal_client}
                            onChange={e => setId(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">

                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControl xs={12} className={clsx(classes.margin, classes.textField, classes.textColor)} variant="outlined">
                        <InputLabel className={classes.textColor}>Password</InputLabel>
                        <OutlinedInput
                            className={classes.textColor}
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        className={classes.textColor}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />


                    </FormControl>

                    <Grid justify="flex-start">
                        <Button 
                        onClick={handleLogin} 
                        className={clsx(classes.margin, classes.textField, classes.buttonColor)} 
                        variant="contained" 
                        
                         
                        >
                            <Typography>Entrar</Typography>
                        </Button>
                        <Link className={clsx(classes.buttonLink, classes.textColor)} to="/register-legal-client">
                            <FiLogIn size={16} color="#ffab00" />
                            <Typography className={classes.typography}>Não tenho cadastro</Typography>
                        </Link>
                        <Link className={clsx(classes.buttonLink, classes.textColor)} to="/">
                            <FiArrowLeft size={16} color="#ffab00" />
                            <Typography className={classes.typography}>Voltar</Typography>
                        </Link>
                    </Grid>

                </Grid>



            </Container>
        </Grid>
    );
}