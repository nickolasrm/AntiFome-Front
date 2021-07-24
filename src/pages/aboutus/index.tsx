import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function AboutUs(){
    return(
        <div className='body'>
            <h1>
                Sobre nós
            </h1>
            <h2>Somos um time de Homo sapiens sapiens em busca de eliminar todas as injustiça do mundo através de uma aplicação</h2>

            <div>
                <Link href='/signin'>
                    <Button>Entrar</Button>
                </Link>

                <Link href='/signup'>
                    <Button>Criar Conta</Button>
                </Link>
            </div>
        </div>

    )
}