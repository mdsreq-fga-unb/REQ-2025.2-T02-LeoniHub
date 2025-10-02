import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Integrantes = [
  {
    title: 'Enzo Fernandes',
    imageUrl:  '/img/enzoFoto.png',
  },
  {
    title: 'André Ricardo Meyer',
    imageUrl:  '/img/andreFoto.png',
  },
  {
    title: 'Diogo Oliveira Ferreira',
    imageUrl:  '/img/diogoFoto.png',
  },
  {
    title: 'Caio Vilas Boas',
    imageUrl:  '/img/caioFoto.png',
  },
  {
    title: 'Kauã Vale Leao',
    imageUrl:  '/img/kauaFoto.png',
  },
  {
    title: 'Vitor Gabriel',
    imageUrl:  'img/vitorFoto.png',
  },
];

function IntegrantesLayout({imageUrl, title}) {
  return (
    <div className={clsx('col col--2')}>
      <div className="text--center">
        <img
          className={styles.integrantesImg}
          src={useBaseUrl(imageUrl)}
          alt={title}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features} style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{marginBottom: '70px', marginTop:'30px'}}>
        <h1 style={{fontSize:'40px'}}>
          INTEGRANTES
        </h1>
      </div>

      <div className="container">
        <div className="row">
          {Integrantes.map((props, idx) => (
            <IntegrantesLayout key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
