import React, { useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";
import { api_login, api_register } from '../services/api';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

type authContextData ={
    token: string | undefined;
    signInWithApi:(email:string, password:string)=>Promise<void>;
    signUpWithApi:(informations:signInTypes)=>Promise<void>;
    setToken:(token:string | undefined)=>void;
    
}

export const AuthContext = createContext({} as authContextData);

type authProviderProps = {
    children: ReactNode;
    
}

type signInTypes ={
    user:string;
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
    const [token, setToken] = useState<string | undefined>();
    
    const router = useRouter();

    useEffect(()=>{
        Cookies.set('token', token)
    },[token])

    useEffect(()=>{
        setToken(Cookies.get('token'))
    },[])

    async function signInWithApi(email:string, password:string){
        try{
            const data = await api_login.post('', 
                {
                    "password":password,
                    "email":email,

                }).finally()
    
                setToken(data.data.token)
                router.push("/platform")

        }catch(e){
            alert(`Email ou senha incorretos!`)
        }
    }

    async function signUpWithApi(informations:signInTypes){
        try{
            if (informations.cpf){
                const response = await api_register.post('', {
                    "user": informations.user,
                    "password": informations.password,
                    "email": informations.email, 
                    "username": informations.username,
                    "cpf": informations.cpf,
                    "city":informations.city,
                    "street":informations.street,
                    "district":informations.district,
                    "state":informations.state,
                    "zipcode":informations.zipcode,
                    "phone":informations.phone
                })

            }else{
                const response = await api_register.post('',{
                    "user": informations.user,
                    "password": informations.password,
                    "email": informations.email, 
                    "username": informations.username,
                    "cnpj": informations.cnpj,
                    "city": informations.city,
                    "road": informations.street,
                    "district": informations.district,
                    "state": informations.state,
                    "zipcode": informations.zipcode,
                    "phone": informations.phone
                }).finally()
            }
        }catch(e){
            console.log(e)
        }
            
    }


return(
    <AuthContext.Provider value={{
        token,
        setToken,
        signInWithApi,
        signUpWithApi,
        
        
    }}>
        {children}
    </AuthContext.Provider>
    )
}