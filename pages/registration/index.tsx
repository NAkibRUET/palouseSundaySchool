/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { userService } from '../../services';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { ResponseCode } from '../../constants/error-code';
import { phoneRegx } from '../../constants/pattern';
import { Registration } from '../../models/RegistrationModel';
import { Profile } from '../../models/ProfileMode';

export default Registration;

function Registration() {
  const router = useRouter();
  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    phone: Yup.string().matches(RegExp(phoneRegx), "Phone should be like (XXX)XXX-XXXX. () and - are optional."),
    password: Yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Plese confirm your password"),
    firstName: Yup.string().required('First Name is Required'),
    lastName: Yup.string().required('Last Name is Required'),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      const profileData: Profile = {
        firstName: values.firstName,
        lastName: values.lastName
      }

      let regData: Registration = {
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        profile: profileData,
        role: 1
      }

      console.log(values.email);
      setErrorMessage("");
      setSuccessMessage("");
      userService.register(regData)
        .then((response) => {
          console.log(response);
          if (response.code == ResponseCode.OK) {
            resetForm();
            setSuccessMessage("Registration Successful, Please Login")
          }
          else if (response.code == ResponseCode.UNAUTHORIZED) {
            setErrorMessage(response.message);
          }
          else if (response.code == ResponseCode.VALIDATION_ERROR) {
            setErrors(response.errors);
          }
          else if (response.code == ResponseCode.ALREADY_EXISTS) {
            setErrorMessage(response.message);
            console.log("Exists");
          }
        })
        .catch(error => {

        });
    },
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 shadow sm:rounded-md sm:overflow-hidden p-6 mb-20 bg-white">
        <h2 className="mt-3 text-center text-2xl font-extrabold text-gray-900">Register as a Teacher</h2>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className='flex space-x-4'>
            <TextField
              fullWidth
              id='firstName'
              name='firstName'
              label='First Name*'
              size='small'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          
            <TextField
              fullWidth
              id='lastName'
              name='lastName'
              label='Last Name*'
              size='small'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id='email'
              name='email'
              label='Email*'
              size='small'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div>
            <TextField
              autoComplete='off'
              fullWidth
              id='phone'
              name='phone'
              label='Phone'
              size='small'
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password*"
              type="password"
              size='small'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password*"
              type="password"
              size='small'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <p className='text-red-600 text-sm text-center'>{errorMessage && errorMessage}</p>
          <p className='text-green-600 text-sm text-center'>{successMessage && successMessage}</p>
          <p className='text-center text-sm text-blue-600'><Link href='/login'>Already have an account? Please Login</Link></p>
        </form>
      </div>
    </div>
  );
}
