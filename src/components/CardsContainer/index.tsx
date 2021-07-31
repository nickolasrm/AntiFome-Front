import { useEffect, useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import OngCard from '../Card';

export default function CardsContainer(rest) {
  const {state, city} = usePlatform()
  const {getInstitutions} = usePlatform()

  const [ONGS, setONGS] = useState<any[] | undefined>()

  useEffect(() => {
    async function handleInstitutions() {
      if( state != 'Selecione um estado' ) {
        const response = await getInstitutions(state, city);
        const data = response?.data

        setONGS(data)
      }
      console.log(state)
    }
    handleInstitutions();
  }, [state, city]);


  return (
    <ul {...rest}>
      {ONGS?.map(ong => 
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