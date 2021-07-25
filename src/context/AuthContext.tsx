import React, { useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";
import { api_donations, api_login, api_packages, api_register } from '../services/api';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

type authContextData ={
    token: string | undefined;
    signInWithApi:(email:string, password:string)=>Promise<void>;
    signUpWithApi:(informations:signUpTypes)=>Promise<void>;
    setToken:(token:string | undefined)=>void;
    
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
}

type UserDonationType ={
    institutionId:string;
    itens: item[];
}

type userDonationsTypes ={
    packageId:string;
    content:item[];
}

export function AuthProvider({children}:authProviderProps){
    const [token, setToken] = useState<string | undefined>();
    const [userDonations, setUserDonations] = useState();
    
    
    const router = useRouter();


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
                Cookies.set('token', token)
                router.push("/platform")

        }catch(e){
            alert(`Email ou senha incorretos!`)
        }
    }


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

    async function getUserDonations() { //Retorna as doações que um usuario ja fez.
        const data = await api_packages.get('',
            {
                headers:{
                    "Authorization":`bearer ${token}`
                }
            }
        )

        return (data.data)


    }

    async function setUserDonation(content:UserDonationType) { //Coloca um pacote.
        await api_packages.post('',{
                institution:content.institutionId, 
                content: content.itens
        },
            {
                headers:{
                    "Authorization":`bearer ${token}`
                }
            }
        )
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