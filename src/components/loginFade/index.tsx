import React, { useState, useEffect } from 'react';
import { LoginWrapper, LoginTextWrapper, LoginText } from '../../styles';

interface IProps {
  text1: string;
  text2: string;
  isActive: boolean;
}

const LoginFade = ({ text1, text2, isActive }: IProps) => {
  const [text1Active, setText1Active] = useState(false);
  const [text2Active, setText2Active] = useState(false);

  useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setText1Active(true);

        setTimeout(() => {
          setText2Active(true);
        }, 1000);
      }, 300);
    } else {
      setText1Active(false);
      setText1Active(false);
    }
  }, [isActive]);

  return (
    <LoginWrapper active={isActive}>
      <LoginTextWrapper>
        <LoginText active={text1Active}>{text1}</LoginText>
        <LoginText active={text2Active}>{text2}</LoginText>
      </LoginTextWrapper>
    </LoginWrapper>
  );
};

export default React.memo(LoginFade);
