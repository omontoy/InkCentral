import Card from 'react-bootstrap/Card'

export function Comment({ note, from, date }) {
  return (
    <Card>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{note}</p>
          <footer className="blockquote-footer">{from}</footer>
          <footer className="blockquote-footer">{date}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  )
}