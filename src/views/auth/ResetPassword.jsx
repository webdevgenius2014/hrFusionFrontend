import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {Grid, Card, CardContent,  Box, Container, Avatar, Button, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormInputPassword } from '../../components/form-components/formInputPassword';
import SubmitButton from '../../components/form-components/submitButton';
const ResetPassword = (props) => {
  const validationSchema = Yup.object().shape({    
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
});
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({resolver: yupResolver(validationSchema)});
  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };    
return (
    <Container component="main" maxWidth="xs">
        <Card
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
          <CardContent sx={{p:3}}>
            <Avatar sx={{ m: [1, 'auto'], bgcolor: 'secondary.main' }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" textAlign='center'>Reset Password</Typography>
            <Box component="form" onClick={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>               
                <FormInputPassword 
                  name='password' 
                  control={control} 
                  label='Password'
                  required
                  error={errors && errors.password} 
                  {...register('password')}
                />
                <FormInputPassword
                  name='confirmPassword' 
                  control={control} 
                  label='Confirm Password'
                  required                  
                  error={errors.confirmPassword}
                  {...register('confirmPassword')}
                />
                <SubmitButton btnText="Submit" />                
                <Grid container>
                    <Grid item xs textAlign='center'>
                      <Link to="/" variant="body2">
                        Back to Login?
                      </Link>
                    </Grid>                    
                </Grid>
            </Box>
          </CardContent>
        </Card>
    </Container>
  );
}

export default ResetPassword;
