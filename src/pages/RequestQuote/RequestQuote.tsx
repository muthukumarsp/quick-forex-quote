import { Field, Form, Formik, FormikProps } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import CustomField from '../../components/CustomField/CustomField';
import PageLayout from '../../components/PageLayout/PageLayout';

import { getQuote } from '../../api/ApiCalls';
import styles from './RequestQuote.module.scss';
import CurrencySelect, {
  CurrencyCode
} from '../../components/CurrencySelect/CurrencySelect';
import CallingCountryCodeSelect, {
  CallingCountryCode
} from '../../components/CallingCountryCodeSelect/CallingCountrySelect';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { UPDATE_USER_INPUT_AND_QUOTE } from '../../actions/actionTypes';
import { MyAppState } from '../../reducers/rootreducer';
import { withRouter } from 'react-router';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  callingCode: CallingCountryCode;
  mobile: string;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  amount: string;
}
const mobileRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RequestQuoteSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter first name'),
  lastName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter last name'),
  email: Yup.string().email('Invalid email'),
  callingCode: Yup.object<CallingCountryCode>().shape({
    value: Yup.string().required(),
    label: Yup.string().required()
  }),
  mobile: Yup.string().matches(mobileRegExp, 'Phone number is not valid'),
  fromCurrency: Yup.object<CurrencyCode>().shape({
    value: Yup.string().required(),
    label: Yup.string().required()
  }),
  toCurrency: Yup.object<CurrencyCode>().shape({
    value: Yup.string().required(),
    label: Yup.string().required()
  }),
  amount: Yup.number().required('Please enter amount to transfer')
});

const RequestQuote: React.FC = ({ history }: any) => {
  const [formValues, setFormValues] = useState(); // To update the form values entered by user
  const selectedData = useSelector((state: MyAppState) => state.formValues, shallowEqual); // fetch from redux store
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const currentQuote = await getQuote(formValues);
        dispatch({
          type: UPDATE_USER_INPUT_AND_QUOTE,
          payload: {
            formValues,
            currentQuote
          }
        });

        history.push({
          pathname: '/quoteresult'
        });
      } catch (error) {
        alert('Fetch error');
      }
    };
    if (formValues) {
      fetchQuote();
    }
  }, [formValues]);

  const handleSubmit = (values: FormValues) => {
    setFormValues({
      fromCurrency: values.fromCurrency.value,
      toCurrency: values.toCurrency.value,
      amount: values.amount,
      ...values
    });
  };
  return (
    <PageLayout>
      <Formik
        initialValues={selectedData}
        validationSchema={RequestQuoteSchema}
        onSubmit={handleSubmit}
        render={({ values, setFieldTouched, setFieldValue }: FormikProps<FormValues>) => (
          <Form>
            <div className={styles['top-section']}>
              <div className={styles['name-block']}>
                <Field
                  className="name-item"
                  name="firstName"
                  label="First Name"
                  required
                  placeholder="First Name"
                  // forwardRef={inputEl}
                  component={CustomField}
                />
                <Field
                  name="lastName"
                  required
                  label="Last Name"
                  placeholder="Last Name"
                  component={CustomField}
                />
              </div>
              <Field
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                component={CustomField}
              />
              <div className={styles['mobile-field']}>
                <Field
                  name="callingCode"
                  label="Telephone/Mobile"
                  setFieldTouched={() => setFieldTouched('callingCode', true)}
                  setFieldValue={(selected: CurrencyCode) =>
                    setFieldValue('callingCode', selected)
                  }
                  value={values.callingCode}
                  component={CallingCountryCodeSelect}
                />
                <Field name="mobile" type="number" component={CustomField} />
              </div>
            </div>
            <div className={styles['bottom-section']}>
              <div className={styles['currency-block']}>
                <Field
                  className="currency-item"
                  name="fromCurrency"
                  label="From Currency"
                  required
                  setFieldTouched={() => setFieldTouched('fromCurrency', true)}
                  setFieldValue={(selected: CurrencyCode) =>
                    setFieldValue('fromCurrency', selected)
                  }
                  value={values.fromCurrency}
                  component={CurrencySelect}
                />
                <Field
                  name="toCurrency"
                  label="To Currency"
                  required
                  setFieldTouched={() => setFieldTouched('toCurrency', true)}
                  setFieldValue={(selected: CurrencyCode) =>
                    setFieldValue('toCurrency', selected)
                  }
                  value={values.toCurrency}
                  component={CurrencySelect}
                />
              </div>
              <div className={styles['amount-input']}>
                <Field
                  name="amount"
                  required
                  label="Amount"
                  type="number"
                  component={CustomField}
                />
              </div>
              <div className={styles['submit-button-block']}>
                <SubmitButton type="submit">GET QUOTE</SubmitButton>
              </div>
            </div>
          </Form>
        )}
      />
    </PageLayout>
  );
};

export default withRouter(RequestQuote);
