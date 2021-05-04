import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GhPolyglot from 'gh-polyglot'
import UserData from './UserData'
import Repos from './Repos'
import Chart from './Chart'
import Error from './Error'
import '../styles/user.css'

function User() {
  const { username } = useParams()
  const [error, seterror] = useState({ active: false, type: 200, message: '' })
  const [userdata, setuserdata] = useState(null)
  const [langdata, setlangdata] = useState(null)
  const [repdata, setrepdata] = useState(null)
  const [ratelimit, setratelimit] = useState(null)
  const getUserData = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.status === 404) {
          return seterror({
            active: true,
            type: 404,
            message: 'cannot find the user',
          })
        }
        if (response.status === 403) {
          return seterror({
            active: true,
            type: 403,
            message: 'Forbidden Error',
          })
        }
        return response.json()
      })
      .then((json) => {
        setuserdata(json)
        console.log(json)
      })
      .catch((err) => {
        seterror({ active: true, type: 400, message: 'server error' })
        console.log('Error:', err)
      })
  }

  const getLangData = () => {
    const me = new GhPolyglot(`${username}`)
    me.userStats((err, stats) => {
      if (err) {
        console.error('Error:', err)
        seterror({
          active: true,
          type: 400,
          message: 'there is no good profile for this user',
        })
      }
      setlangdata(stats)
      console.log(stats)
    })
  }

  const getRepoData = () => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((response) => {
        if (response.status === 404) {
          return seterror({
            active: true,
            type: 404,
            message: 'Data is not available',
          })
        }
        if (response.status === 403) {
          return seterror({
            active: true,
            type: 403,
            message: 'Data is not available',
          })
        }
        return response.json()
      })
      .then((json) => {
        setrepdata(json)
        console.log(json)
      })
      .catch((error) => {
        seterror({
          active: true,
          type: 500,
          message: 'Error occured in our server',
        })
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    fetch(`https://api.github.com/rate_limit`)
      .then((response) => response.json())
      .then((json) => {
        setratelimit(json.resources.core)
        if (json.resources.core.remaining < 1) {
          seterror({
            active: true,
            type: 403,
            message: 'you rate limit exceeded',
          })
        }
      })
  }, [])

  /**
 *    useEffect(() => {
    fetch(`https://api.github.com/rate_limit`)
      .then(response => response.json())
      .then(json => {
        setRateLimit(json.resources.core);
        if (json.resources.core.remaining < 1) {
          setError({ active: true, type: 403 });
        }
      });
 */

  useEffect(() => {
    getLangData()
    getUserData()
    getRepoData()
  }, [])

  return (
    <>
      <main>
        {error && error.active ? (
          <Error message={error.message} />
        ) : (
          <>
            {userdata && <UserData userdata={userdata} rateLimit={ratelimit} />}
            {langdata && repdata && (
              <Chart langData={langdata} repoData={repdata} />
            )}
            {repdata && <Repos repoData={repdata} />}
          </>
        )}
      </main>
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ paddingRight: '10px' }}>Built by </span>
        <span>
          <a
            href='https://www.instagram.com/balu_sairam'
            rel='noreferrer'
            alt=''
            target='_blank'
          >
            Sairam Balu
          </a>
        </span>
      </footer>
    </>
  )
}

export default User

/**
 * {error && error.active ? (
          <h2>{error.type}</h2>
        ) : (
          <h2>GitHub Profile</h2>
        )}

 */
