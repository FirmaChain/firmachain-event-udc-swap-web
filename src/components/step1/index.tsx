import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { ModalConnectionComplete } from '../modal';
import { useInterval } from '../../utils/interval';
import { Logo, TitleText, SubText, ButtonWrapper, Button, Step1Wrapper } from '../../styles';

export const LoginModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

interface IProps {
  isActive: boolean;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  setAddress: (address: string) => void;
  snackbar: (status: number) => void;
}

const Step1 = ({ isActive, setStep, setLoading, setAddress, snackbar }: IProps) => {
  const [requestKey, setRequestKey] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loginModalState, setLoginModalState] = useState(false);
  const [isTickerActive, setIsTickerActive] = useState(false);

  useInterval(() => timerTick(), (isActive && isTickerActive) ? 1000 : null);

  const getRequestStatus = async (requestKey: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/swap/requests/${requestKey}`);

      if (response.data.code !== 0) {
        throw new Error('INVALID REQUEST');
      }
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };

  const timerTick = () => {
    if (requestKey !== '') {
      getRequestStatus(requestKey)
        .then((result) => {
          if (result.status === 1) {
            setIsTickerActive(false);
            setWalletAddress(result.signer);
            setLoading(false);
            setLoginModalState(true);
          } else if(result.status < 0) {
            setIsTickerActive(false);
            snackbar(result.status);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsTickerActive(false);
          snackbar(0);
        });
    }
  };

  const onClickConnect = () => {
    setLoading(true);
    setRequestKey('');
    axios
      .post(`${process.env.REACT_APP_API_HOST}/swap/sign/login`)
      .then((response) => {
        if (response.data.code !== 0) {
          throw new Error('INVALID REQUEST');
        }
        const url = response.data.result.qrcode;
        window.location.href = url;
        setIsTickerActive(true);
        setRequestKey(response.data.result.requestKey);
      })
      .catch((error) => {
        console.log(error);
        snackbar(0);
        setIsTickerActive(false);
      });
  };
  
  const onClickCloseLoginModal = () => {
    setAddress(walletAddress);
    setLoginModalState(false);
    setStep(1);
  };
  
  return (
    <Step1Wrapper>

      <ModalConnectionComplete visible={loginModalState} address={walletAddress} onClose={onClickCloseLoginModal} />

      <Logo />
      <TitleText>{'UDC\nEVENT SWAP'}</TitleText>
      <SubText style={{marginTop: '14px'}}>UET Token to FCT Coin</SubText>
      <ButtonWrapper>
        <Button style={{borderRadius: '0.4rem'}} isActive={true} onClick={onClickConnect}>
          CONNECT
        </Button>
      </ButtonWrapper>
    </Step1Wrapper>
  );
};

export default React.memo(Step1);
