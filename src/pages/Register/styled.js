import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Form = styled.p`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid ${colors.greyColor};
    padding: 0 10px;
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
      border: 1.2px solid ${colors.primaryColor};
    }
  }
`;
