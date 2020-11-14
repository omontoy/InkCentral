export function Artist ({ name, alias, location, email, phone }) {
  return (
    <div className="artist">
      <h2>{name}</h2>
      <h4>{alias}</h4>
      <p>{location}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
  )
}