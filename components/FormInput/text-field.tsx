import React from 'react'
import { FieldProps, getIn } from 'formik'
import { TextField, TextFieldProps } from "@mui/material";

export const TextInput: React.FC<FieldProps & TextFieldProps> = props => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, form, ...rest } = props

  return (
    <TextField
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
      {...rest} // includes any Material-UI specific props
      {...field} // includes all props contributed by the Formik Field/FastField
    />
  )
}