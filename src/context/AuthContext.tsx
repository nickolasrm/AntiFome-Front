import React, { useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";
import { api_account, api_donations, api_login, api_packages, api_register } from '../services/api';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router'

type authContextData ={
    token: string | undefined;
    signInWithApi:(email:string, password:string)=>Promise<void>;
    signUpWithApi:(informations:signUpTypes)=>Promise<void>;
    setToken:(token:string | undefined)=>void;
    getAccountInformation:()=>Promise<any>;
    createDonation:(content:item)=>{};
    
    
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
    user:string,
    name:string;
    quantity:number;
}

type userDonationType ={
    institutionId:string;
    itens: item[];
}



export function AuthProvider({children}:authProviderProps){
    const [token, setToken] = useState<string | undefined>();
    const [userDonations, setUserDonations] = useState();
    
    
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
        console.log(token)
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
                user:content.user,
                description:content.name,
                quantity:content.quantity
            },{
                headers:{
                    "Authorization":`${token}`
                }
            })

        }catch{
        }
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////


    async function getAllDonations(){
        try{
            await api_donations.get('/all', {
                headers:{
                    "Authorization":`${token}`
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    async function getDonation(id:string){
        try{
            await api_donations.get(`?id=${id}`, {

                headers:{
                    "Authorization":`${token}`
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    async function getWaitDonation(){
        const data = await api_donations.get('/waiting_donator', {
            headers:{
                "Authorization":`${token}`
            }
        })
    }

    






  
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




return(
    <AuthContext.Provider value={{
        token,
        setToken,
        signInWithApi,
        signUpWithApi,
        getAccountInformation,
        createDonation
        
        
    }}>
        {children}
    </AuthContext.Provider>
    )
}