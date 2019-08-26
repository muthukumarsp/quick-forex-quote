import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import PageLayout from '../../components/PageLayout/PageLayout';
import { useSelector, useDispatch } from 'react-redux';
import { MyAppState } from '../../reducers/rootreducer';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { UPDATE_QUOTE } from '../../actions/actionTypes';
import Styles from './QuoteResult.module.scss';

const Result: React.FC = (props: any) => {
  const { currentQuote, formValues } = useSelector((state: MyAppState) => state);
  const dispatch = useDispatch();
  const { CustomerRate, CustomerAmount } = currentQuote || ({} as any);
  const { fromCurrency, toCurrency, amount } = formValues;
  useEffect(() => {
    if (!currentQuote) {
      props.history.replace('/');
    }
  });
  const handleBackButton = () => {
    dispatch({
      type: UPDATE_QUOTE,
      payload: {
        currentQuote: undefined
      }
    });
    props.history.goBack();
  };
  return (
    <PageLayout>
      <div className={Styles['result-page']}>
        <div className={Styles['content-area']}>
          <div className={Styles['page-heading']}> OFX Customer Rate </div>
          <div className={Styles['customer-rate']}>{CustomerRate}</div>
          <div className={Styles['result-section']}>
            <div className={Styles['section-heading']}> From</div>
            <div>
              <span className={Styles['currency-code']}>{fromCurrency.value}</span>
              <span className={Styles['currency-value']}>{amount}</span>
            </div>
          </div>
          <div className={Styles['result-section']}>
            <div className={Styles['section-heading']}> To</div>
            <div>
              <span className={Styles['currency-code']}>{toCurrency.value}</span>
              <span className={Styles['currency-value']}>{CustomerAmount}</span>
            </div>
          </div>
          <div className={Styles['button-block']}>
            <SubmitButton onClick={handleBackButton}>START NEW QUOTE </SubmitButton>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default withRouter(Result);
