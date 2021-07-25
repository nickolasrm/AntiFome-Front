import OngCard from '../Card';

export default function CardsContainer() {
  return (
    <body>
       <OngCard items={[{name:'banana', quantity:20}]} priority={2} name='Trafico caridoso'/>
    </body>
  )
}