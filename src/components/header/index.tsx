import React from 'react';
import { HeaderContainer, Wrapper } from './styles';

interface IProps {
  signer: string;
}

const Header = ({ signer }: IProps) => {
  return (
    <HeaderContainer>
      <Wrapper>{signer}</Wrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
