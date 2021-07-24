import { useRouter } from 'next/router'
import { useState } from 'react'

import {Form, Button} from 'react-bootstrap'


export default function SignUn(){
    const[email, setEmail] = useState<string>()
    const[password, setPassword] = useState<string>()
    const[username, setUsername] = useState<string>()

    const[cpf, setCpf] = useState<string>()
    const[cpj, setCpj] = useState<string>()

    const[city, setCidade] = useState<string>()
    const[street, setRua] = useState<string>()
    const[district, setBairro] = useState<string>()
    const[state, setEstate] = useState<string>()
    const[zipcode, setZipcode] = useState<string>()

    const[Phone, setTelefone] = useState<string>()

    const router = useRouter()


    function handleSignUp(event){
        event.preventDefault()
        router.push('/platform');
    }


    return(
        <Form onSubmit={(event)=>handleSignUp(event)}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type="name" placeholder="Nome completo" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Entre com uma senha." />
            </Form.Group>

            <Form.Group>
                <Form.Label>CPF</Form.Label>
                <Form.Control type="cpf" autoComplete='cpf' placeholder="Entre com seu CPF." />
            </Form.Group>

            <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="city" placeholder="Entre com sua Cidade." />

                <Form.Label>Estado</Form.Label>
                <Form.Control type="state" placeholder="Entre com seu Estado." />

                <Form.Label>Bairro</Form.Label>
                <Form.Control type="district" placeholder="Entre com seu Bairro." />

                <Form.Label>Rua e Numero</Form.Label>
                <Form.Control type="street" placeholder="Entre com Rua e numero" />

                <Form.Label>CEP</Form.Label>
                <Form.Control type="zipcode" placeholder="Entre com seu CEP." />
            </Form.Group>

            <Form.Group>
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="phone" placeholder="Entre com seu o CPF." />
            </Form.Group>

            <Button variant="primary" type="submit">Enviar</Button>
        </Form>
    )
}
