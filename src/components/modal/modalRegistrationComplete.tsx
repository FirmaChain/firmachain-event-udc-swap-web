import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { ModalContainer, TitleText } from '../../styles';
import { convertCurrent, createTextEllipsis } from '../../utils/common';
import { convertFCTStringFromUFCT } from "../../utils/firma";
import Modal from "./modal";


export const RegModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  border-radius: 0.4rem;
`;

export const ModalContentWrapper = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.5rem 1.5rem;
  border-radius: 0.4rem;
  gap: 1rem;
`;

export const HorizontalDivider = styled.div`
  width: calc(100% - 3rem);
  height: 1px;
  background-color: #33333a;
  margin: .1rem 0;
`

export const ModalTitleText = styled.div`
  color: white;
  font-size: 1.6rem;
  line-height: 2.5rem;
  color: #bbb;
  flex: 1;
`

export const BlockText = styled.div`
  color: #0a84ff;
  font-size: 1.8rem;
  line-height: 1.8rem;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 2;
`;

export const ValueText = styled.div`
  font-size: 1.8rem;
  text-align: right;
  font-weight: 400;
  line-height: 1.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  flex: 2;

  & > span {
    font-size: 1.5rem;
    color: #bbb;
    padding-left: .5rem;
  }
`;

export const TxLabelContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
`

export const LabelBox = styled.div`
  background-color: #292932;
  border-radius: .4rem;
  display: flex;
  align-items: center;
  padding: .2rem .5rem;
  gap: .5rem;
`

export const DenomIcon = styled.div<{ src: string }>`
  width: 1.3rem;
  height: 1.3rem;
  background-color: #999;
  border-radius: 1rem;
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;


export const SwapButton = styled.div<{ isActive: boolean }>`
  width: calc(100% - 2rem);
  height: 5rem;
  padding: 0 1rem;
  line-height: 5rem;
  background-color: ${(props) => (props.isActive ? '#3550de' : '#888')};
  border-radius: 0.4rem;
  text-align: center;
  color: white;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

interface ITokenState {
  denom: string;
  symbol: string;
}

interface IProps {
  visible: boolean;
  signData: any;
  tokenData: ITokenState;
  onClose: () => void;
}

const ModalRegistrationComplete = ({ visible, signData, tokenData, onClose }: IProps) => {
  const [height, setHeight] = useState('0');
  const [hash, setHash] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [amount, setAmount] = useState('0');

  useEffect(() => {
    if(visible){
      if(signData.rawData !== undefined){
        let rawData = JSON.parse(signData.rawData)
        setHeight(convertCurrent(rawData.height))
        setHash(rawData.transactionHash);
        let events = JSON.parse(rawData.rawLog)[0].events;
        let transfer = events.filter((val:any) => val.type === 'transfer');
        let attribues = transfer[0].attributes;
        for (let key in attribues) {
          let value = attribues[key].value;

          if(attribues[key].key === 'recipient') setRecipient(value);
          if(attribues[key].key === 'sender') setSender(value);
          if(attribues[key].key === 'amount'){
            let removedDenomValue = value.replace(tokenData.denom, '');
            setAmount(convertCurrent(convertFCTStringFromUFCT(removedDenomValue)));
          }
        }
      }
    }
  }, [visible, signData, tokenData])

  const onClickMoveToExplorer = (path: string, value: string) => {
    window.open(`${process.env.REACT_APP_EXPLORER_URL}/` + path + '/' + value);
  }

  return (
    <Modal onClose={onClose} visible={visible} width={'95%'} maskClosable={true}>
      <ModalContainer>
        <TitleText style={{fontSize: '3rem'}}>{'REGISTRATION\nCOMPLETED'}</TitleText>
        <RegModalContainer>
          <ModalContentWrapper>
            <ModalTitleText>Block</ModalTitleText>
            <BlockText onClick={() => onClickMoveToExplorer('blocks', height)}>{height}</BlockText>
          </ModalContentWrapper>
          <HorizontalDivider />
          <ModalContentWrapper>
            <ModalTitleText>Hash</ModalTitleText>
            <BlockText onClick={() => onClickMoveToExplorer('transactions', hash)}>{createTextEllipsis(hash, 8, 8)}</BlockText>
          </ModalContentWrapper>
          <HorizontalDivider />
          <ModalContentWrapper>
            <ModalTitleText>{'From > To'}</ModalTitleText>
            <TxLabelContainer>
              <LabelBox>
                <DenomIcon src='/images/ic_profile.png' />
                <ValueText style={{flex: 1, color: '#fff', fontSize: '1.5rem'}}>{createTextEllipsis(sender, 6, 5)}</ValueText>
              </LabelBox>
              <ValueText style={{justifyContent: 'center'}}>{'>'}</ValueText>
              <LabelBox>
                <DenomIcon src='/images/denom_firma.jpg' />
                <ValueText style={{flex: 1, color: '#fff', fontSize: '1.5rem'}}>{createTextEllipsis(recipient, 6, 5)}</ValueText>
              </LabelBox>
            </TxLabelContainer>
          </ModalContentWrapper>
          <HorizontalDivider />
          <ModalContentWrapper>
            <ModalTitleText>Amount</ModalTitleText>
            <ValueText>{amount}<span>{tokenData.symbol}</span></ValueText>
          </ModalContentWrapper>
          <HorizontalDivider />
          <ModalContentWrapper>
            <ModalTitleText>Fee</ModalTitleText>
            <ValueText>0.02<span>FCT</span></ValueText>
          </ModalContentWrapper>
          <HorizontalDivider />
          <ModalContentWrapper>
            <ModalTitleText>Result</ModalTitleText>
            <ValueText style={{color: '#3dd598'}}>Success</ValueText>
          </ModalContentWrapper>
        </RegModalContainer>
        <SwapButton isActive={true} onClick={onClose}>CONFIRM</SwapButton>
      </ModalContainer>
    </Modal>
  )
}

export default ModalRegistrationComplete;