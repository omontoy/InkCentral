import { Artist } from './Artist';
import '../App.css';

export function Artists ({ artists }) {
  return (
    <section className="cardsAlign">
      {!!artists && 
         artists.length > 0 && 
         artists.map(({ id, name, alias, location, email, phone, image }) => {
           return (
             <Artist
               key={id} 
               name={name}
               alias={alias}
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