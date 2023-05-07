import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleUserCreate = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    // console.log(user)


    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...users, data]
      setUsers(newUser);
      form.reset();
    })
  }

  return (
    <div>
      <h2>Database Management System</h2>
      <form onSubmit={handleUserCreate}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="submit" />
      </form>
      {
        users.map(user => <p key={user.id}>{user.id}. {user.name}: {user.email}</p>)
      }
    </div>
  )
}

export default App
