import React from 'react';

import { FieldProps } from 'formik';
import Select from 'react-select';
import { currencies } from 'country-data';

import styles from './CurrencySelect.module.scss';

export interface CurrencyCode {
  value: string;
  label: string;
}

interface CurrencySelectProps {
  type?: string;
  label?: string;
  className?: string;
  required?: boolean;
  value?: CurrencyCode;
  setFieldTouched?: () => void;
  setFieldValue?: () => void;
}

const customStyles = {
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: 'blue'
  })
};
const CurrencyList = currencies.all;
let currencyCodeOptions = CurrencyList.map(item => ({
  value: item.code,
  label: item.name + ' (' + item.code + ')'
}));

export const getCountryByCode = (code: string): CurrencyCode =>
  currencyCodeOptions.filter((c: CurrencyCode) => c.value === code)[0];

const CurrencySelect = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  className,
  type,
  value,
  required,
  setFieldTouched,
  setFieldValue,
  ...props
}: FieldProps & CurrencySelectProps) => {
  return (
    <div className={className + ' ' + styles['field-wrapper']}>
      {label && (
        <label className={styles['label']} htmlFor={field.name}>
          {label} {required && <span style={{ color: 'red' }}> *</span>}
        </label>
      )}
      <div className={styles['input-wrapper']}>
        <Select
          styles={customStyles}
          className={styles['input-element']}
          onBlur={setFieldTouched}
          onChange={setFieldValue}
          options={currencyCodeOptions}
          value={value}
        />
        {touched[field.name] && errors[field.name] && (
          <div className={styles['error']}>{errors[field.name]}</div>
        )}
      </div>
    </div>
  );
};
export default CurrencySelect;
