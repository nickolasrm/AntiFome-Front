import React, { useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";
import { api_account, api_cities, api_donations, api_institutions, api_login, api_packages, api_register } from '../services/api';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

type authContextData ={
    token: string | undefined;
    signInWithApi:(email:string, password:string)=>Promise<void>;
    signUpWithApi:(informations:signUpTypes)=>Promise<void>;
    getAccountInformation:()=>Promise<any>;
    handleInstitutionsFiltered:({}) => void;
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

export function AuthProvider({children}:authProviderProps){
    const [token,setToken] = useState<string>(Cookies.get('token'));
    const [informations, setInformations] = useState<any[]>()

    const [userDonations, setUserDonations] = useState();
    const [institutionsFiltered, setInstitutionsFiltered] = useState()

    

    
    const router = useRouter();


    //Contexto de login
    async function signInWithApi(email:string, password:string){
        try{
            const data = await api_login.post('', 
                {
                    "password":password,
                    "email":email,

                })
                setToken(data.data.token)
                Cookies.set('token', token)

                const info = await getAccountInformation()

                Cookies.set('name', info.username)
                console.log(info)
                setInformations(info)
                router.push('/platform')

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
                return data.data; // Dados do usuário completo{username, password, cpfCnpj/cpf ...}
        }catch(e){
            console.log(e)
        }
    }

  

    function handleInstitutionsFiltered(value) {
        setInstitutionsFiltered(value)
    }




return(
    <AuthContext.Provider value={{
        signInWithApi,
        signUpWithApi,
        getAccountInformation,
        handleInstitutionsFiltered,
        token,
   
    }}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}