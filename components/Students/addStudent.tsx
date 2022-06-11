import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import AdminLayout from "../DashboardLayout";
import { TextField, Select, MenuItem, FormControl } from "@mui/material";

const FormikSelect = ({ children, form, field }: any) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={e => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

export default function AddStudentComponent() {
  const router = useRouter();
  useEffect(() => {

  }, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    birthday: Yup.date()
      .required('Date of Birth is required'),
    age: Yup.number()
      .required('Name is required'),
    gender: Yup.string()
      .required('Gender is required'),
    home_language: Yup.string(),
    how_you_know_about_our_school: Yup.string(),
    about_child: Yup.string(),
    primary_contact: Yup.string(),
    preferred_contact: Yup.string(),
    guardians: Yup.array().min(1, "Add at least 1 guardian").of(
      Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        email: Yup.string()
          .email('Email is invalid'),
        cell_phone: Yup.string()
          .email('Email is invalid').required('Name is required'),
        relationship_to_child: Yup.string()
          .email('Email is invalid').required('Name is required'),
      })
    ),
    siblings: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        age: Yup.number()
          .required('Name is required'),
      })
    )
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      birthday: '',
      age: '',
      gender: '',
      home_language: '',
      how_you_know_about_our_school: '',
      about_child: '',
      primary_contact: '',
      preferred_contact: '',
      guardians: [],
      siblings: []
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setErrors }) => {

    }
  });


  return (
    <AdminLayout>
      <>
        <h2 className="mt-3 text-2xl font-extrabold text-gray-900">Add Student</h2>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className='flex space-x-4'>
            <TextField
              fullWidth
              id='name'
              name='name'
              label='Name*'
              size='small'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id='birthday'
              name='birthday'
              label='Date of Birth*'
              size='small'
              type="date"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.birthday)}
              helperText={formik.touched.name && formik.errors.birthday}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              fullWidth
              id='age'
              name='age'
              label='Age'
              size='small'
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.age)}
              helperText={formik.touched.name && formik.errors.age}

            />
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ display: 'block' }}
              className="form-select
              appearance-none 
              block w-full px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              <option value="" label="Gender" disabled>
                Gender{" "}
              </option>
              <option value="Male" label="Male">
                {" "}
                Male
              </option>
              <option value="female" label="Female">
                Female
              </option>
            </select>
          </div>
          <div className="flex space-x-4">
            <FieldArray name="guardians">
              {() => (formik.values.guardians.map((guardian, i) => {
                const ticketErrors = formik.errors.guardians?.length && formik.errors.guardians[i] || {};
                const ticketTouched = formik.touched.guardians?.length && formik.touched.guardians[i] || {};
                return (
                  <div key={i} className="list-group list-group-flush">
                    <div className="list-group-item">
                      <h5 className="card-title">Ticket {i + 1}</h5>
                      <div className="form-row">
                        <div className="form-group col-6">
                          <label>Name</label>
                          <Field name={`guardians.${i}.name`} type="text" className={'form-control' + (ticketErrors && ticketTouched ? ' is-invalid' : '')} />
                          <ErrorMessage name={`guardians.${i}.name`} component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-6">
                          <label>Email</label>
                          <Field name={`guardians.${i}.email`} type="text" className={'form-control' + (ticketErrors && ticketTouched ? ' is-invalid' : '')} />
                          <ErrorMessage name={`guardians.${i}.email`} component="div" className="invalid-feedback" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }))}
            </FieldArray>
          </div>
        </form>
      </>
    </AdminLayout>
  );
}
