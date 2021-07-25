import { useContext, useState } from 'react'

import {Form, Row, Col, Button} from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext'
import {mask} from 'remask'

import styles from './styles.module.scss'


export default function SignUn(){

    const[email, setEmail] = useState<string>()
    const[password, setPassword] = useState<string>()
    const[userName, setUserName] = useState<string>()
    const[cpf, setCpf] = useState<string | undefined>()
    const[cnpj, setCnpj] = useState<string | undefined>()
    const[city, setCity] = useState<string>()
    const[street, setStreet] = useState<string>()
    const[district, setDistrict] = useState<string>()
    const[state, setState] = useState<string>()
    const[zipcode, setZipcode] = useState<string>()
    const[phone, setPhone] = useState<string>()

    const[company, isCompany] = useState<boolean>(false)

    const {signUpWithApi} = useContext(AuthContext);

    function handleSignUp(event){
        event.preventDefault()

        signUpWithApi({
            password:password,
            email:email,
            username:userName,
            cpf:cpf,
            cnpj:cnpj,
            city:city,
            street:street,
            district:district,
            state:state,
            zipcode:zipcode,
            phone:phone,
        })
    }


    function handleInstitutionalPerson(){
        isCompany(!company); 
        if (company){
            setCpf(undefined);
        }else{
            setCnpj(undefined);
        } 
    }


    return(
        <div className={styles.container}>
            <Form onSubmit={(event)=>handleSignUp(event)}>
                
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} 
                    onChange={text=>setEmail(text.target.value)} 
                    type="email" placeholder="name@example.com" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control value={userName} 
                    onChange={text=>setUserName(text.target.value)} 
                    type="name" placeholder="Nome completo" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control value={password} 
                    onChange={text=>setPassword(mask(text.target.value,['SSSSSSSSSSSSSSSSSSSS']))} 
                    type="password" placeholder="Entre com uma senha (max 20 caracteres)." 
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Label>É pessoa juridica?</Form.Label>
                        <Form.Check checked={company} onChange={()=>handleInstitutionalPerson()} type="checkbox" label="Sim" />
                    </Col>

                    <Col>
                        {company? (
                            <>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control value={cnpj} 
                                onChange={text=>setCnpj(mask(text.target.value,['99.999.999/9999-99']))} 
                                type="cnpj" autoComplete='cnpj' placeholder="Entre com seu CNPJ." />

                            </>
                        ):(
                            <>
                                <Form.Label>CPF</Form.Label>
                                <Form.Control value={cpf} 
                                onChange={text=>setCpf(mask(text.target.value,['999.999.999-99']))} 
                                type="cpf" autoComplete='cpf' placeholder="Entre com seu CPF."
                                />
                            </>
                        )}
                        
                    </Col>
                </Row>
                <Form.Group>
                    
                <Row>
                    <Col>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control value={city} 
                        onChange={text=>setCity(text.target.value)} 
                        type="city" placeholder="Entre com sua Cidade." />
                    </Col>
                    
                    <Col>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control value={state} 
                        onChange={text=>setState(mask(text.target.value,['AA']))} 
                        type="state" placeholder="Entre com seu Estado (ex RJ)." 
                        />
                    </Col>
                </Row>
                    
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control value={district} 
                    onChange={text=>setDistrict(text.target.value)} 
                    type="district" placeholder="Entre com seu Bairro." />

                    <Form.Label>Rua e Numero</Form.Label>
                    <Form.Control value={street} 
                    onChange={text=>setStreet(text.target.value)} 
                    type="street" placeholder="Entre com rua e numero" />

                    <Form.Label>CEP</Form.Label>
                    <Form.Control value={zipcode} 
                    onChange={text=>setZipcode(mask(text.target.value,['99999-999']))} 
                    type="zipcode" placeholder="Entre com seu CEP." />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control value={phone} 
                    onChange={text=>setPhone(mask(text.target.value,['(99) 99999-9999']))} 
                    type="phone" placeholder="Entre com seu o telefone." />
                </Form.Group>

                <br/>

                <Button variant="primary" type="submit">Enviar</Button>
                
            </Form>
        </div>
    )
}
