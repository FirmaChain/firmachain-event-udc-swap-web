import styled from 'styled-components';

export const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  height: auto;
`;

export const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalInner = styled.div<{ width: string }>`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #292932;
  border-radius: 12px;
  width: ${(props) => (props.width ? props.width : '300px')};
  max-width: 500px;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  color: white;
`;
