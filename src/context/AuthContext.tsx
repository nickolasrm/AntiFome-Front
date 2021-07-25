import React, { useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";
import { api_account, api_cities, api_donations, api_institutions, api_login, api_packages, api_register } from '../services/api';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

type authContextData ={
    token: string | undefined;
    signInWithApi:(email:string, password:string)=>Promise<void>;
    signUpWithApi:(informations:signUpTypes)=>Promise<void>;
    setToken:(token:string | undefined)=>void;
    getAccountInformation:()=>Promise<any>;
    createDonation:(content:item)=>Promise<void>;
    getInstitutions:(state:string, city?:string)=>Promise<any>;
    getAllDonations:()=>Promise<any>;
    getWaitDonation:(id:string)=>Promise<any>;
    getCities:(state:string)=>Promise<any>;
    handleInstitutionsFiltered:({}) => void;
    state:string;
    handleSetState: (value: string) => void;
    city: string;
    handleSetCity: (value: string) => void;
}

export const AuthContext = createContext({} as authContextData);

type authProviderProps = {
    children: ReactNode;
    
}

type signUpTypes ={
    password:string;
    email:string;
    username:string;
    cpf?:string;
    cnpj?:string;
    city:string;
    street:string;
    district:string;
    state:string;
    zipcode:string;
    phone:string;
}

type item ={
    name:string;
    quantity:number;
    priority:number;
}

type userDonationType ={
    institutionId:string;
    itens: item[];
}



export function AuthProvider({children}:authProviderProps){
    const [token, setToken] = useState<string | undefined>();
    const [userDonations, setUserDonations] = useState();
    const [institutionsFiltered, setInstitutionsFiltered] = useState()
    const [state, setState] = useState<string>(' - - ')
    const [city, setCity] = useState<string>(' - - ')
    
    const router = useRouter();


    useEffect(()=>{
        setToken(Cookies.get('token'))
    },[])

    //Contexto de login
    async function signInWithApi(email:string, password:string){
        try{
            const data = await api_login.post('', 
                {
                    "password":password,
                    "email":email,

                }).finally()
    
                setToken(data.data.token)
                Cookies.set('token', token)

        }catch(e){
            alert(`Email ou senha incorretos!`)
        }
    }

    //Contexto de registro
    async function signUpWithApi(informations:signUpTypes){
        try{
            if (informations.cpf){
                console.log(informations)
                await api_register.post('', {
                    "password": informations.password,
                    "email": informations.email, 
                    "username": informations.username,
                    "cpf": informations.cpf,
                    "city":informations.city,
                    "street":informations.street,
                    "neighborhood":informations.district,
                    "state":informations.state,
                    "zip":informations.zipcode,
                    "phone":informations.phone
                })

            }else{
            
                await api_register.post('',{
                    "password": informations.password,
                    "email": informations.email, 
                    "username": informations.username,
                    "cnpj": informations.cnpj,
                    "city": informations.city,
                    "street": informations.street,
                    "neighborhood": informations.district,
                    "state": informations.state,
                    "zip": informations.zipcode,
                    "phone": informations.phone
                    
                })
            }
            router.push("/platform")
        }catch(e){
            console.log(e)
        }    
    }


    async function getAccountInformation() { 
        try{
            const data = await api_account.get('',
                {
                    headers:{
                        "Authorization":`${token}`
                    }
                })

                return data; // Dados do usuário completo{username, password, cpfCnpj/cpf ...}
        }catch(e){
            console.log(e)
        }
    }

  


//////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Cria uma doação
    async function createDonation(content:item){
        try{
            await api_donations.post('',{
                "description":content.name,
                "quantity":content.quantity,
                "priority":content.priority
            },{
                headers:{
                    "Authorization":`${token}`
                }
            })

        }catch{
        }
    }

    async function getAllDonations(){ //Exibe todas doações necessárias para a empresa com CNPJ
        try{
            const data = await api_donations.get('/all', {
                headers:{
                    "Authorization":`${token}`
                }
            })
            return data;
        }catch(e){
            console.log(e)
        }
    }

    async function getInstitutions(state:string, city?:string) { //busca por 
        try{
            if(city){
                const data = await api_institutions.get(``,
                 {
                    params:{
                        "state":state,
                        "city":city
                    }}
                 )

                return data;
            }
            else{
                const data = await api_institutions.get(``,
                    {
                        params:{
                            "state":state
                        }
                    }
                )
                return data;
            }
        }catch(e){
            console.log(e)
        }
    }


    async function getWaitDonation(id:string){ //Exibe todas doação pendente de uma empresa
        try{
            const data = await api_donations.get(`/waiting_donator?id=${id}`, {
            })
            return data;

        }catch(e){
            console.log(e)
        }
    }

    async function getCities(state:string) { 
        
        try{
            const data = await api_cities.get('',
                {
                    params:{
                        "state":state
                    }
                }
            )

            return data; // Dados do usuário completo{username, password, cpfCnpj/cpf ...}
        }catch(e){
            console.log(e)
        }
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////



    //Retorna as doações que um usuario ja fez.
    async function getUserDonations() { 
        const data = await api_packages.get('',
            {
                headers:{
                    "Authorization":`${token}`
                }
            })

            return data;


    }

    async function setUserDonation(content:userDonationType) { //Coloca um pacote.
        await api_packages.post('',{
                institution:content.institutionId, 
                content: content.itens
        },
            {
                headers:{
                    "Authorization":`${token}`
                }
            }
        )
    }

    function handleInstitutionsFiltered(value) {
        setInstitutionsFiltered(value)
    }

    function handleSetState(value: string) {
        setState(value)
    }

    function handleSetCity(value: string) {
        setCity(value)
    }



return(
    <AuthContext.Provider value={{
        token,
        setToken,
        signInWithApi,
        signUpWithApi,
        getAccountInformation,
        createDonation,
        getInstitutions,
        getAllDonations,
        getWaitDonation,
        handleInstitutionsFiltered,
        getCities,
        state,
        handleSetState,
        city,
        handleSetCity,
        
    }}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}