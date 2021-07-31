import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";

import {api_cities, api_donations, api_institutions, api_packages} from '../services/api';
import { useAuth } from './AuthContext';


type platformContextData ={
    getCities:(state:string)=>Promise<any>;
    getAllUserPackage:()=>Promise<any>;
    getUserPackage:(packageId:string)=>Promise<any>;
    deleteUserPackage:(id:string)=>Promise<void>;
    deleteContentUserPackage:(id:string)=>Promise<void>;
    setUserPackage:(content:userPackageType)=>Promise<any>;
    getInstitutions:(state:string, city?:string)=>Promise<any>;
    getAllDonations:()=>Promise<any>;
    getWaitDonation:(id:string)=>Promise<any>;
    createDonation:(content:item)=>Promise<void>;
    setCities:(value:string[])=>void;
    cities:string[];
    state:string;
    city:string;
    pkgs:any[];
    setPkgs:(value:any[])=>void;
    setState:(value:string|undefined)=>void;
    setCity:(value:string|undefined)=>void;
}

export const PlatformContext = createContext({} as platformContextData);

type platformProviderProps = {
    children: ReactNode;

}

type item ={
    name:string;
    quantity:number;
    priority:number;
}

type pkgitem ={
    id:string; //id da doaçao
    quantity:number;

}

type userPackageType ={
    institution:string; //id da instituição
    itens: pkgitem[];
}

export function PlatformProvider({children}:platformProviderProps){
    const {token} = useAuth();
    const [cities, setCities] = useState<string[]>(); // array de cidades
    const[pkgs, setPkgs] = useState([]);

    const [state, setState] = useState<string | undefined>('Selecione um estado')//estado selecionado
    const [city, setCity] = useState<string | undefined>('Selecione uma cidade') //cidade selecionada

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
            return data.data;
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

                return data.data;
            }
            else{
                const data = await api_institutions.get(``,
                    {
                        params:{
                            "state":state
                        }
                    }
                )
                return data.data;
            }
        }catch(e){
            console.log(e)
        }
    }


    async function getWaitDonation(id:string){ //Exibe todas doação pendente de uma empresa
        try{
            const data = await api_donations.get(`/waiting_donator?id=${id}`, {
            })
            return data.data;

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
            return data.data; // Dados do usuário completo{username, password, cpfCnpj/cpf ...}
        }catch(e){
            console.log(e)
        }
    }

    async function setUserPackage(content:userPackageType) { //Coloca uma quantidade de um item e seu id no pacote.
        console.log(content)
        try{
        await api_packages.post('',{
                "institution":content.institution, 
                "content": content.itens
        },
            {
                headers:{
                    "Authorization":`${token}`
                }
            }
        )
        }catch(e){
            console.log(e)
        }
    }




    //Retorna as doações que um usuario ja fez.
    async function getAllUserPackage() { 
        try{
            const data = await api_packages.get('',
                {
                    headers:{
                        "Authorization":`${token}`
                    }
                })
            return data.data;
        }catch(e){
            console.log(e)
        }
    }


    async function getUserPackage(packedId:string) { //retorna um pedido de um usuário
        try{
            const data = await api_packages.get('/content',
                {
                    params:{
                        id:packedId
                    },
                    headers:{
                        "Authorization":`${token}`
                    }
                })
            return data.data;
        }catch(e){
            console.log(e)
        }
    }

    async function deleteUserPackage(id:string){ //Deleta itens do package via id
        try{
             await api_packages.delete('', {
                params:{
                    "id":id
                },
                headers:{
                    "Authorization":`${token}`
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    async function deleteContentUserPackage(id:string){ //Deleta itens co content da package via id
        console.log(id)
        try{
             await api_packages.delete('/content', {
                params:{
                    "id":id
                },
                headers:{
                    "Authorization":`${token}`
                }
            })
        }catch(e){
            console.log(e)
        }
    }

return(
    <PlatformContext.Provider value={{
        getCities,
        setUserPackage,
        getAllUserPackage,
        getUserPackage,
        deleteUserPackage,
        deleteContentUserPackage,
        cities,
        setCities,
        state,
        setState,
        setCity,
        city,
        pkgs,
        setPkgs,

        getInstitutions,
        getAllDonations,
        getWaitDonation,
        createDonation,
       
    }}>
        {children}
    </PlatformContext.Provider>
    )
}


export const usePlatform = () => {
    return useContext(PlatformContext)
}