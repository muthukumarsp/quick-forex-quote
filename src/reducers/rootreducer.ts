import { UPDATE_USER_INPUT_AND_QUOTE, UPDATE_QUOTE } from '../actions/actionTypes';
import { FormValues } from '../pages/RequestQuote/RequestQuote';
import { getCallingCodeByCountryCode } from '../components/CallingCountryCodeSelect/CallingCountrySelect';
import { getCountryByCode } from '../components/CurrencySelect/CurrencySelect';

export interface MyAppState {
  formValues: FormValues;
  currentQuote?: any;
}
const initialState: MyAppState = {
  formValues: {
    firstName: '',
    lastName: '',
    email: '',
    callingCode: getCallingCodeByCountryCode('AUS'),
    mobile: '',
    fromCurrency: getCountryByCode('AUD'),
    toCurrency: getCountryByCode('USD'),
    amount: ''
  }
};
const rootReducer = (state: MyAppState = initialState, action = {} as any) => {
  switch (action.type) {
    case 'UPDATE_USER_INPUT_AND_QUOTE':
      return {
        ...state,
        ...action.payload
      };
    case 'UPDATE_QUOTE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
export default rootReducer;
