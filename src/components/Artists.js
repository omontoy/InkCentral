import { Artist } from './Artist';

import '../App.css';

export function Artists ({ artists }) {
  
  return (
    <section className="cardsAlign">
      {!!artists && 
         artists.length > 0 && 
         artists.map(({ _id, name, nickname, location, email, phone, image }) => {
           return (
             <Artist
               key={_id} 
               id={_id}
               name={name}
               nickname={nickname}
               location={location}
               email={email}
               phone={phone}
               image={image}
             />
           )
      })}
    </section>
  )
}