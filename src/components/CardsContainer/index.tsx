import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import OngCard from '../Card';

export default function CardsContainer(rest) {
  const { state, city, getInstitutions } = useAuth()
  const [ONGS, setONGS] = useState([])

  useEffect(() => {
    async function handleInstitutions() {
      if( state !== ' - - ' ) {
        const response = await getInstitutions(state);

        setONGS(response.data)
      }
    }

    handleInstitutions();
  }, [state]);


  return (
    <ul {...rest}>
      {ONGS.map(ong => 
        <OngCard
          key={ong.id}
          street={ong.street}
          city={ong.city}
          neighborhood={ong.neighborhood}
          username={ong.username}
          phone={ong.phone}
          id={ong.id}
        />
      )}
      
    </ul>
  )
}