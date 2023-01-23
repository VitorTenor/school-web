import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const AlunoContainer = styled.div`
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
  }

  div + div {
    border-top: 1px solid ${colors.primaryColor};
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  border: 1px solid ${colors.primaryDarkColor};
  border-radius: 30px;
  margin-top: 10px;
  width: 150px;
  text-align: center;
  display: block;
  padding: 5px 5px 5px 5px;
`;
