import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Home.css'
import logo from '../icon.png'

function Home() {
  const history = useHistory()
  const [username, setusername] = useState('')
  async function finduser(e) {
    e.preventDefault()
    let values = username.split(' ')
    if (values.length > 1) {
      document.querySelector('.error').style.display = 'block'
    } else {
      history.push(`/user/${username}`)
    }
  }
  return (
    <div className='home'>
      <img src={logo} alt='githubicon' />
      <h3 className='error'>Username should be a single word</h3>
      <form onSubmit={finduser}>
        <label for='username'>Find Your Github Profile</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Home
