import Link from 'next/link';
import { Button } from 'react-bootstrap';

import styles from './styles.module.scss'

export default function AboutUs(){
    return(
        <div className={styles.body}>
            <h2>
                Sobre nós
            </h2>
            
            <p>
            Sendo assim, pensamos e achamos um jeito de causar impacto sem precisar buscar protagonismo em lutas já consolidadas. Não é sobre o que o app pode fazer, mas o que milhares de pessoas já fazem todos os anos. Fortificar movimentos sociais, ONGs, grupos e iniciativas de combate a fome, vai ser muito mais expressivo do que buscar a tão sonhada ideia mirabolante, que as vezes é pura ficção.
            <p>Nós acreditamos que o melhor insight contra fome é a mão na massa. Por isso a plataforma que criamos permite a conexão entre doadores e receptores. Sendo uma solução logística e de contato, que muitas vezes é o mais difícil. Imagine um mercadinho local, que quer e pode ajudar com a doação de alguns alimentos e uma ONG disposta a ir buscá-los, pois precisa deles. Como no mundo real elas se conectariam? Pois é, agora é possível. Baixe o app Anti-fome e saiba como.</p>
            </p>

            <br/>

            <div>
                <Link href='/signin'>
                    <Button>Entrar</Button>
                </Link>
                &ensp;
                <Link href='/signup'>
                    <Button>Criar Conta</Button>
                </Link>
                &ensp;
                <Link href='/platform'>
                    <Button>Plataforma</Button>
                </Link>
            </div>
        </div>

    )
}