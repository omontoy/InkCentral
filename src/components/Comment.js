import Card from 'react-bootstrap/Card'
import { dateOfComment } from '../utils/dates'

export function Comment({ note, from, date }) {

  const dateComment = dateOfComment(date)

  return (
    <Card>
      <Card.Body>
        <Card.Title>{note}</Card.Title>
        { from.name ? (
          <Card.Text>{from.name}</Card.Text>
        ) : (
            <Card.Text>{from.email}</Card.Text>
          )
        }
        <Card.Text>
          {dateComment[0]} {dateComment[1]} {dateComment[2]}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}