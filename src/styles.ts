import styled, { keyframes } from 'styled-components';
import { Metropolis } from './constants/theme';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1c1c24;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.8rem;
`;

export const LoadingWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #000000bf;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const LoginWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #000000df;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const LoginTextWrapper = styled.div`
  diplay: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  align-items: center;
  & > div {
    text-align: center;
    font-size: 4.8rem;
    color: #eee;
    margin-top: 30px;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
  }
`;

export const LoginText = styled.div<{ active: boolean }>`
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const TicketWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #000000df;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => (props.active ? `` : `display:none`)}
`;

export const ContentsContainer = styled.div<{ currentStep: number }>`
  width: 100%;
  height: 100%;
  flex: 1 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > div {
    display: none;
    flex: 1;
  }
  & > div:nth-child(${(props) => props.currentStep + 1}) {
    display: flex;
  }
`;

export const Logo = styled.div`
  width: 56px;
  height: 57px;
  background-image: url('/images/white_logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TitleText = styled.div`
  font-family: ${Metropolis} !important;
  font-weight: bold;
  font-size: 4rem;
  text-align: center;
  letter-spacing: -0.76px;
  white-space: pre-line;
  color: #eee;
  margin-top: 12px;
`;

export const SubText = styled.div`
  font-family: ${Metropolis} !important;
  font-size: 2.2rem;
  letter-spacing: -0.4px;
  color: #aaa;
  margin-top: 6px;
  margin-bottom: 10px;
`;

export const Button = styled.div<{ isActive: boolean }>`
  font-family: ${Metropolis} !important;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 54px;
  min-width: 238px;
  padding: 0 10px;
  background-color: ${(props) => (props.isActive ? '#3550de' : '#44444f')};
  border-radius: 0.4rem;
  color: white;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

export const QRWrapper = styled.div`
  width: auto;
  padding: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 22px;
`;

const Step = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Step1Wrapper = styled(Step)``;
export const Step2Wrapper = styled(Step)``;
export const Step3Wrapper = styled(Step)``;
export const Step4Wrapper = styled(Step)``;
export const Step5Wrapper = styled(Step)``;

export const RequestQRWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const RequestQRTimer = styled.div`
  font-size: 1.6rem;
  color: white;
  margin-top: 15px;
`;
