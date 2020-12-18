import Card from 'react-bootstrap/Card'
import { dateOfComment } from '../utils/dates'

export function Comment({ note, from, date }) {
 
  const dateComment = dateOfComment(date)

  return (
    <Card>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{note}</p>

          {from.name? (
            <footer className="blockquote-footer">
              {from.name}
            </footer>
          ):(
            <footer className="blockquote-footer">
              {from.email}
          </footer>
          )}
        
          <footer className="blockquote-footer">
            {dateComment[0]} {dateComment[1]} {dateComment[2]}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  )
}