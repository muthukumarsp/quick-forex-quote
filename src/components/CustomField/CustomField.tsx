import React from 'react';

import styles from './CustomField.module.scss';
import { FieldProps } from 'formik';

interface CustomFieldProps {
  type?: string;
  label?: string;
  className?: string;
  required?: boolean;
}
const CustomField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  type,
  className,
  required,
  ...props
}: FieldProps & CustomFieldProps) => (
  <div className={className + ' ' + styles['field-wrapper']}>
    {
      <label className={styles['label']} htmlFor={field.name}>
        {label} {required && <span style={{ color: 'red' }}> *</span>}
      </label>
    }
    <div className={styles['input-wrapper']}>
      <input
        type={type || 'text'}
        id={field.name}
        className={styles['input-element']}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <div className={styles['error']}>{errors[field.name]}</div>
      )}
    </div>
  </div>
);
export default CustomField;
