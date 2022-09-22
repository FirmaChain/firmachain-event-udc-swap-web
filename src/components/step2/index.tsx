import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Logo, TitleText, Step2Wrapper } from '../../styles';
import { convertCurrent, convertNumber, createDecimalPoint } from '../../utils/common';
import { convertFCTStringFromUFCT, getBalanceFromAddrress, getTokenBalanceFromDenom } from '../../utils/firma';
import { useInterval } from '../../utils/interval';
import { ModalRegistrationComplete } from '../modal';

export const TitleContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: flex-end; 
  flex: 1;
  padding-bottom: 1rem;
`

export const SwapContainer = styled.div`
  width: calc(100% - 4rem);
  border-radius: 0.4rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem;
  text-align: left;
  flex: 2;
`;

export const SwapTitleWrapper = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  align-items: center;
  background-color: #1c1c24;
  padding: 1.5rem;
  border-radius: 0.4rem;
  gap: 1.6rem;
`;

export const SwapTitle = styled.div`
  color: #c5c5d1;
  font-weight: normal;
  font-size: 2.3rem;
`;

export const AmountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export const AmountWrapper = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  background-color: #24242e;
  padding: 1.5rem;
  border-radius: 0.4rem;
  gap: 1rem;
`;

export const AmountHorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AmountTopText1 = styled.div`
  width: calc(30% - 1rem);
  color: #fff;
  font-weight: 500;
  font-size: 1.6rem;
`;

export const AmountTopText2 = styled.div`
  width: calc(70% - 1rem);  
  color: #a1a1ac;
  font-size: 1.6rem;
  font-weight: normal;
  text-align: right;
  & > span {
    color: #c5c5d1;
    font-weight: 500;
  }
`;

export const AmountText = styled.div`
  width: calc(70% - 1rem);  
  text-align: right;
  color: white;
  font-size: 2.3rem;
  padding: 0 .6rem;
`;

export const TokenSymbolText = styled.div`
  color: #c5c5d1;
  font-size: 1.4rem;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding-top: .8rem;
  padding-right: 1rem;
`

export const AmountBottomText2 = styled.div`
  width: calc(30% - 1rem);
  color: white;
  font-size: 2rem;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding-right: 1rem;
`;

export const AmountInputText = styled.input`
  width: 80%;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 2.3rem;
  outline: none;
`

export const ArrowDivier = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: .7rem 0;
`;

export const DenomIcon = styled.div<{ src: string }>`
  width: 2rem;
  height: 2rem;
  background-color: #ccc;
  border-radius: 1rem;
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const ArrowIcon = styled.div<{ src: string }>`
  width: 3.8rem;
  height: 3.8rem;
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const InfoText = styled.div`
  text-align: right;
  font-size: 1.4rem;
  color: #a1a1ac;
  margin: 1rem 0 5.6rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;
  & > img {
    width: 1.2rem;
    height: auto;
  }
`;

export const SwapButton = styled.div<{ isActive: boolean }>`
  width: calc(100% - 2rem);
  height: 5rem;
  padding: 0 1rem;
  line-height: 5rem;
  background-color: ${(props) => (props.isActive ? '#3550de' : '#44444f')};
  border-radius: 0.4rem;
  text-align: center;
  color: ${(props) => (props.isActive ? '#fff' : '#ffffff50')};
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

export const MaxButton = styled.div<{ isActive: boolean }>`
  width: 5rem;
  height: 2.3rem;
  line-height: 2.3rem;
  background-color: ${(props) => (props.isActive ? '#3550de' : '#44444f')};
  border-radius: 0.4rem;
  text-align: center;
  font-weight: bold;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

interface IProps {
  isActive: boolean;
  address: string;
  setStep: (step: number) => void;
  setLoading: (isLoading: boolean) => void;
  snackbar: (status: number) => void;
}

interface ITokenState {
  denom: string;
  symbol: string;
}

const Step2 = ({ isActive, address, setStep, setLoading, snackbar }: IProps) => {
  const [requestKey, setRequestKey] = useState('');
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [amount, setAmount] = useState('0');
  const [signData, setSignData] = useState({});
  const [tokenData, setTokenData] = useState<ITokenState>({
    denom: '',
    symbol: ''
  });
  const [registrationModalState, setRegistrationModalState] = useState(false);
  const [isTickerActive, setIsTickerActive] = useState(false);

  useInterval(() => timerTick(), (isActive && isTickerActive) ? 1000 : null);

  const initValues = () => {
    setBalance(0);
    setTokenBalance(0);
    setAmount('0');
    setRegistrationModalState(false);
  }

  useEffect(() => {
    if(isActive === false){
      initValues();
    }
  }, [isActive])

  const walletAddress = useMemo(() => {
    return address;
  }, [address])

  const isSwapActive = useMemo(() => {
    return (isActive && convertNumber(amount) > 0);
  }, [amount, isActive])

  const getBalance = useCallback(async () => {
    try {
      let result = await getBalanceFromAddrress(walletAddress);
      let balance = convertFCTStringFromUFCT(result);
      let numericBalance = convertNumber(balance);
      setBalance(numericBalance);
    } catch (error) {
        console.log(error);
    }
  }, [walletAddress]);

  const getTokenData = useCallback(async() => {
    try {
      if(isActive){
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/swap/token`);
        if (response.data.code !== 0) {
          throw new Error('INVALID REQUEST');
        }
        setTokenData(response.data.result.token);
      }
    } catch (error) {
      snackbar(-3);
      throw error;
    }
  }, [isActive, snackbar])

  const getTokenBalance = useCallback(async () => {
    try {
        let result = await getTokenBalanceFromDenom(walletAddress, tokenData.denom);
        let balance = convertFCTStringFromUFCT(result);
        let numericBalance = convertNumber(balance);
        setTokenBalance(numericBalance);
    } catch (error) {
        console.log(error);
    }
  }, [walletAddress, tokenData.denom]);

  useEffect(() => {
    if(tokenData.denom === ''){
      getTokenData();
    } else {
      getBalance();
      getTokenBalance();
    }
  }, [tokenData, getTokenData, getBalance, getTokenBalance])

  const onChangeAmount = (e:React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    
    if(convertNumber(value) >= tokenBalance) value = tokenBalance.toString();
    setAmount(value);
  }

  const onClickMax = () => {
    setAmount(tokenBalance.toString());
  };

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
            setSignData(JSON.parse(result.signData));
            setRegistrationModalState(true);
            setAmount('0');
            setLoading(false);
          } else if(result.status < 0) {
            setIsTickerActive(false);
            snackbar(result.status);
          }
        })
        .catch((error) => {
          setIsTickerActive(false);
          snackbar(0);
          console.log(error);
        });
    }
  };

  const onClickSwap = () => {
    if(isSwapActive){
      setLoading(true);
      setRequestKey('');
      axios
      .post(`${process.env.REACT_APP_API_HOST}/swap/sign/swap`, {
        signer: walletAddress, 
        tokenAmount: convertNumber(amount)
      })
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
        setIsTickerActive(false);
        snackbar(0);
        setAmount('0');
        console.log(error);
      });

    } else {
      return;
    }
  };

  const onClickCloseModal = () => {
    setRegistrationModalState(false);
    setStep(0);
  };
  
  const balanceExchange = (value: number) => {
    let exchange = createDecimalPoint(value * 0.001, 6);
    let exchangeValue = exchange.split('.');
    
    return (
      <AmountText>
        {`${exchangeValue[0]}.${exchangeValue[1]}`}
      </AmountText>
    )
  }

  return (
    <Step2Wrapper>

      <ModalRegistrationComplete visible={registrationModalState} signData={signData} tokenData={tokenData} onClose={onClickCloseModal} />
      
      <TitleContainer>
        <Logo />
        <TitleText style={{fontSize: '3.5rem'}}>{'UDC\nEVENT SWAP'}</TitleText>
      </TitleContainer>
      <SwapContainer>
        <AmountContainer>
          <AmountWrapper>
            <AmountHorizontalWrapper>
              <AmountTopText1 style={{width: 'auto'}}>From</AmountTopText1>
              <AmountTopText2>{`Balance : `}<span>{convertCurrent(tokenBalance)}</span></AmountTopText2>
              <MaxButton isActive={tokenBalance>0} onClick={onClickMax}>MAX</MaxButton>
            </AmountHorizontalWrapper>
            <AmountHorizontalWrapper style={{ height: '46px', padding: '0 12px', justifyContent: 'flex-end', background: '#44444f', borderRadius: '6px'}}>
              <AmountInputText style={{textAlign: 'right', padding: '0 .6rem'}} type={'number'} value={amount} onChange={onChangeAmount}/>
              <TokenSymbolText>
                {tokenData.symbol}
              </TokenSymbolText>
              <DenomIcon src='/images/denom_uet.png' />
            </AmountHorizontalWrapper>
          </AmountWrapper>
          <ArrowDivier>
            <ArrowIcon src='/images/ic-gr-arrow.png' />
          </ArrowDivier>
          <AmountWrapper>
            <AmountHorizontalWrapper>
              <AmountTopText1>To</AmountTopText1>
              <AmountTopText2>{`Balance : `}<span>{convertCurrent(balance)}</span></AmountTopText2>
            </AmountHorizontalWrapper>

            <AmountHorizontalWrapper style={{ height: '46px', padding: '0 12px', justifyContent: 'flex-end', background: '#44444f', borderRadius: '6px'}}>
              {balanceExchange(convertNumber(amount))}
              <TokenSymbolText>FCT</TokenSymbolText>
              <DenomIcon src='/images/denom_firma.jpg' />
            </AmountHorizontalWrapper>
          </AmountWrapper>
          <InfoText>{`1 ${tokenData.symbol} = 0.001 FCT`}</InfoText>
          <SwapButton isActive={isSwapActive} onClick={onClickSwap}>SWAP</SwapButton>
        </AmountContainer>
      </SwapContainer>
    </Step2Wrapper>
  );
};

export default React.memo(Step2);
