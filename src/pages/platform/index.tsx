import { useState } from 'react'

export default function Platform(){
    const[user, setUser] = useState<string>()
    const[password, setPassword] = useState<string>()

    function handleSignin(){

    }

    async function()

    return(
        <form onSubmit={()=>{}}>


        </form>
    )
}

export async function getServerSideProps(context) {
    return {
      props: {}, // Will be passed to the page component as props
    }
  }