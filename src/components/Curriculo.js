import { useEffect, useState } from "react";
import styles from "./Curriculo.module.css";
import { FaGithub, FaLinkedin} from "react-icons/fa";
import { PiBagFill,PiStudentFill} from "react-icons/pi";
import {GiDiploma} from "react-icons/gi";
import { FaPersonCircleCheck } from "react-icons/fa6";

function Curriculo() {
  const [dados, setDados] = useState("");
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/curriculo.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar o curriculo");
        }
        return res.json();
      })
      .then((data) => {
        setDados(data);
      })

      .catch((err) => {
        console.error(err);
        setErro(err.message);
      });
  }, []);

  if (erro) return <p>{erro}</p>;
  if (!dados) return <p>Carregando curriculo</p>;

  return (
    <div className={styles.conteudo}>
      <div className={styles.cabeçalho}>
        <img src={`${process.env.PUBLIC_URL}/felipe-perfil.jpg`} alt="Felipe Rodrigues" />
        <h1 className={styles.meu_nome}> {dados.nome}</h1>
        <p>{dados.endereco}</p>
        <p>{dados.email}</p>
        <ul className={styles.lista_redes} >
          <li>
            <a href={dados.linkedin}><FaGithub size={30}/></a>
          </li>
          <li>
            <a href={dados.github}><FaLinkedin size={30}/></a>
          </li>
        </ul>
      </div>

      <section className={styles.meu_historico}>
        <div className={styles.experiencias}>
          <p  className={styles.resumo}>{dados.resumo}</p>
          <h2 className={styles.subtitulo}>  <PiStudentFill className={styles.icone} size={30}/> Experiência</h2>
          {dados.experiencias.map((exp, index) => (
            <div key={index}>
              <h3 className={styles.subtitulo_local}>
                {exp.cargo} - {exp.empresa}
              </h3>
              <p className={styles.subtitulo}>{exp.periodo}</p>
              <p>{exp.atividades}</p>
            </div>
          ))}
        </div>
        <div className={styles.formacao}>
          <h2 className={styles.subtitulo}> <PiBagFill className={styles.icone} size={30}/> Formação</h2>
          {dados.formacao.map((form, index) => (
            <div key={index}>
              <h3 className={styles.subtitulo}> - {form.curso} </h3>
              <p className={styles.subtitulo_local}>
                {form.instituicao} - {form.periodo}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.habilidades}>
          <h3 className={styles.subtitulo}><FaPersonCircleCheck className={styles.icone} size={30}/> Habilidades</h3>
          <ul className={styles.habilidades_lista}>
            {dados.habilidades.map((hab, index) => (
              <li key={index}>{hab}</li>
            ))}
          </ul>
        </div>

        <div className={styles.certificacoes}>
          <h3 className={styles.subtitulo}> <GiDiploma className={styles.icone} size={30}/> Certificações</h3>
          <ul className={styles.certificacoes_lista}>
          {dados.certificacoes.map((cert, index) => (
              <li key={index}> {cert}</li>
          ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Curriculo;
