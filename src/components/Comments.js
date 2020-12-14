import { Comment } from './Comment'

export function Comments({ notes }) {
  return (
    <section>
      {!!notes && 
         notes.length > 0 && 
         notes.map(({ _id, note, clientAuthor, createdAt }) => {
           return (
             <Comment
               key={_id} 
               note={note}
               from={clientAuthor}
               date={createdAt}               
             />
           )
      })}
    </section>
  )
}