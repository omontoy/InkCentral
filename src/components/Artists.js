import { Artist } from './Artist';

export function Artists ({ artists }) {
  return (
    <section className="artists">
      {!!artists && 
         artists.length > 0 && 
         artists.map(({ name, alias, location, email, phone }) => {
           return (
             <Artist
               name={name}
               alias={alias}
               location={location}
               email={email}
               phone={phone}
             />
           )
      })}
    </section>
  )
}