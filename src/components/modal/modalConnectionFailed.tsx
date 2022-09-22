import React from "react";
import styled from "styled-components";
import { Button, ModalContainer, SubText, TitleText } from "../../styles";
import Modal from "./modal";

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalConnectionFailed = ({visible, onClose}: IProps) => {
  return (
    <Modal onClose={onClose} visible={visible} width={'90%'} maskClosable={true}>
      <ModalContainer>
        <TitleText style={{fontSize: '2.7rem', fontWeight: 'bold'}}>CONNECT FAILED</TitleText>
        <Box>
          <SubText>Connection with wallet failed.</SubText>
        </Box>
        <Button isActive={true} onClick={onClose}>OK</Button>
      </ModalContainer>
    </Modal>
  )
}

export default ModalConnectionFailed;