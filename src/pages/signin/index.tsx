import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

import { useRouter } from 'next/router'

export default function SignIn(){
    const[user, setUser] = useState<string>()
    const[password, setPassword] = useState<string>()

    const router = useRouter();

    function handleSignin(event){
        event.preventDefault()
        router.push('/platform');
    }

    return(
        <Form onSubmit={(event)=>handleSignin(event)}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={user} type="email" placeholder="Entre com email" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control value={password} type="password" placeholder="Digite sua senha" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}