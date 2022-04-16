/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { userService } from '../../services';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { ResponseCode } from '../../constants/error-code';

export default Login;

function Login() {
  const router = useRouter();

  type UserSubmitForm = {
    email: string;
    password: string;
  };
  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required')
  });
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm, setErrors}) => {
      setErrorMessage("");
      userService.login(values.email, values.password)
        .then((response) => {
          console.log(response);
          if(response.code == ResponseCode.OK){
            resetForm();
            const returnUrl: any = router.query.returnUrl || '/admin';
            router.push(returnUrl);
          }
          else if(response.code == ResponseCode.UNAUTHORIZED){
            setErrorMessage(response.message);
          }
          else if(response.code == ResponseCode.NOT_APPROVED){
            setErrorMessage(response.message);
          }
          else if(response.code == ResponseCode.VALIDATION_ERROR){
            setErrors(response.errors);
          }
        })
        .catch(error => {
          
        });
    },
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 shadow sm:rounded-md sm:overflow-hidden p-6 mb-20 bg-white">
        <h2 className="mt-3 text-center text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              autoComplete='off'
              fullWidth
              id='email'
              name='email'
              label='Email'
              size='small'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              size='small'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <p className='text-red-600 text-sm text-center'>{errorMessage && errorMessage}</p>
          <p className='text-center text-sm text-blue-600'><Link href='/registration'>Teacher Registration</Link></p>
        </form>
      </div>
    </div>
  );
}
