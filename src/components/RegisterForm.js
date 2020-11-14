export function RegisterForm({
  name,
  alias,
  email,
  usrType,
  phone,
  location,
  password,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="App">    
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={name}
          required
        /><br></br>
        <label htmlFor="alias">Alias</label>
        <input
          type="text"
          id="alias"
          name="alias"
          onChange={handleChange}
          value={alias}
        /><br></br>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        /><br></br>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        /><br></br>
        <label htmlFor="user">User</label>
        <input 
          type="radio" 
          id="user" 
          name="user" 
          onChange={handleChange}
          value={usrType}
        /><br></br>
        <label htmlFor="artist">Artist</label>
        <input 
          type="radio" 
          id="artist" 
          name="user" 
          onChange={handleChange}
          value={usrType}
        /><br></br>
        <label htmlFor="phone">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone"
          pattern="[0-9]{10}"
          placeholder="10 digits"
          onChange={handleChange}
          value={phone}
        /><br></br>
        <label htmlFor="location">Location</label>
        <input 
          type="text" 
          id="location" 
          name="location" 
          onChange={handleChange}
          value={location}
        /><br></br>
        <button>Register</button>
      </form>
    </div>
  )
}