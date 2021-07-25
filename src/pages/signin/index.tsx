import { useContext, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext'

export default function SignIn(){
    const[user, setUser] = useState<string>()
    const[password, setPassword] = useState<string>()
    const[logged, isLogged] = useState<string>()

    const {signInWithApi} = useContext(AuthContext);



    function handleSignin(event){
        event.preventDefault();
        signInWithApi(user, password)
    }


    return(
        <Form onSubmit={(event)=>handleSignin(event)}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={user} onChange={text=>{setUser(text.target.value)}} type="email" placeholder="Entre com email" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control value={password} onChange={text=>{setPassword(text.target.value)}} type="password" placeholder="Digite sua senha" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}