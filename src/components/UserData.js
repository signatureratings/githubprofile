import React from 'react'
import PropTypes from 'prop-types'
import '../styles/UserData.css'
import location from '../location.svg'
import calender from '../calender.svg'

function UserData({ userdata, rateLimit }) {
  return (
    <section className='userdata'>
      {rateLimit && (
        <div className='limit'>
          <div className='num'>{`${rateLimit.remaining} / ${rateLimit.limit}`}</div>
          <p>Requests Left</p>
        </div>
      )}
      <div className='container'>
        {userdata && (
          <>
            {userdata.avatar_url && (
              <div className='avatar'>
                <img
                  className='profile'
                  src={userdata.avatar_url}
                  alt='userprofile'
                />
              </div>
            )}
          </>
        )}
        {userdata.name && <h1>{userdata.name}</h1>}
        {userdata.login && (
          <h2>
            <a
              href={userdata.html_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              @{userdata.login}
            </a>
          </h2>
        )}
        <div className='info'>
          {userdata.company && (
            <span className='info__item'>{userdata.company}</span>
          )}
          {userdata.location && (
            <span className='info__item'>
              <img src={location} className='icons' alt='hello' />
              {userdata.location}
            </span>
          )}
          {userdata.created_at && (
            <span className='info__item'>
              <img src={calender} className='icons' alt='hello' />
              Joined{' '}
              {new Date(userdata.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
        <div className='stats'>
          <div className='stats__item'>
            <span className='num'>
              {userdata.public_repos.toLocaleString()}
            </span>
            <span className='num-label'>Repositories</span>
          </div>
          <div className='stats__item'>
            <span className='num'>{userdata.followers.toLocaleString()}</span>
            <span className='num-label'>Followers</span>
          </div>
          <div className='stats__item'>
            <span className='num'>{userdata.following.toLocaleString()}</span>
            <span className='num-label'>Following</span>
          </div>
        </div>
      </div>
    </section>
  )
}

UserData.prototype = {
  userdata: PropTypes.object,
}

export default UserData
