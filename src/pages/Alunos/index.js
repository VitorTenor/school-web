import React, { useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id) => {
    try {
      setIsLoading(true);
      e.target.parentElement.remove();
      await axios.delete(`/alunos/${id}`);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Necessario Login');
      } else {
        toast.error('Erro ao excluir');
      }
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno">Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'fotos[0].url', '') ? (
                <img src={aluno.fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            {isLoggedIn && (
              <div>
                <Link
                  onClick={handleDeleteAsk}
                  to={`/aluno/${aluno.id}/delete`}
                >
                  <FaWindowClose size={16} />
                </Link>
                <FaExclamation
                  onClick={(e) => handleDelete(e, aluno.id)}
                  size={16}
                  display="none"
                  cursor="pointer"
                />
              </div>
            )}
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
