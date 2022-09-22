import React, { useState } from 'react';

// import Header from '../components/header';
// import Footer from '../components/footer';
import Step1 from '../components/step1';
import Step2 from '../components/step2';

import { useSnackbar } from 'notistack';
import { MainContainer, ContentsContainer } from '../styles';

interface IProps {
  setLoading: (isLoading: boolean) => void;
}

const Main = ({ setLoading }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [currentStep, setStep] = useState(0);
  const [address, setAddress] = useState('');

  const handleErrorSnackbar = (status: number) => {
    setLoading(false);
    let message = '';
    switch (status) {
      case -1:
        message = 'Connection with wallet is expired.';
        break;
      case -2:
        message = 'Connection has been rejected.';
        break;
      case -3:
        message = 'Failed to get token information';
        break;
      default:
        message = 'Connection with wallet failed.';
        break;
    }
    return (enqueueSnackbar(message, {
      variant: "error",
      autoHideDuration: 3000,
    }))
  }

  return (
    <>
      <MainContainer>
        <ContentsContainer currentStep={currentStep}>
          <Step1 isActive={currentStep === 0} setStep={setStep} setLoading={setLoading} setAddress={setAddress} snackbar={handleErrorSnackbar} />
          <Step2 isActive={currentStep === 1} setStep={setStep} setLoading={setLoading} address={address} snackbar={handleErrorSnackbar}/>
        </ContentsContainer>
      </MainContainer>
    </>
  );
};

export default React.memo(Main);
