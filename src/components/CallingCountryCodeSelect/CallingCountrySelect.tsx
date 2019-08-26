import React from 'react';

import { FieldProps } from 'formik';
import Select from 'react-select';
import countries, { currencies } from 'country-data';

import styles from './CallingCountySelect.module.scss';

export interface CallingCountryCode {
  value: string;
  label: string;
}

interface CallingCountryCodeSelectProps {
  type?: string;
  label?: string;
  className?: string;
  required?: boolean;
  value?: CallingCountryCode;
  setFieldTouched?: () => void;
  setFieldValue?: () => void;
}

const CallingCountryCodeList = countries.callingCountries.all;
const callingCodeOptions = CallingCountryCodeList.map(item => ({
  value: item.countryCallingCodes[0],
  label: item.countryCallingCodes[0]
}));

export const getCallingCodeByCountryCode = (countryCode: string) => {
  const item = CallingCountryCodeList.filter(c => c.alpha3 === countryCode)[0];
  return {
    value: item.countryCallingCodes[0],
    label: item.countryCallingCodes[0]
  };
};

const customStyles = {
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: 'blue'
  })
};
const CallingCountryCodeSelect = ({
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
}: FieldProps & CallingCountryCodeSelectProps) => {
  return (
    <div className={className + ' ' + styles['field-wrapper']}>
      {label && (
        <label className={styles['label']} htmlFor={field.name}>
          {label} {required && <span style={{ color: 'red' }}> *</span>}
        </label>
      )}
      <div>
        <Select
          styles={customStyles}
          className={styles['input-element']}
          onBlur={setFieldTouched}
          onChange={setFieldValue}
          options={callingCodeOptions}
          value={value}
        />
        {touched[field.name] && errors[field.name] && (
          <div className={styles['error']}>{errors[field.name]}</div>
        )}
      </div>
    </div>
  );
};
export default CallingCountryCodeSelect;
