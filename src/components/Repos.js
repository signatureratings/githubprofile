import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../styles/Repos.css'
import star from '../star_black_24dp.svg'
import fork from '../code-branch-solid.svg'

const Repos = ({ repoData }) => {
  const [toprepos, settoprepos] = useState([])
  //const [sortType, setsortType] = useState('stars')
  // const [dropdownOpen, setDropdownOpen] = useState(false)
  //const sortTypes = ['stars', 'forks', 'size']

  const getTopRepos = () => {
    const LIMIT = 8
    const map = {
      stars: 'stargazers_count',
      forks: 'forks_count',
      size: 'size',
    }
    const sortProperty = map['stars']
    const sorted = repoData
      .filter((repo) => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT)

    settoprepos(sorted)
  }
  useEffect(() => {
    if (repoData.length) {
      getTopRepos()
    }
  }, [])

  /*const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const changeRepoSort = (sortType) => {
    setsortType(sortType)
    toggleDropdown()
  }*/

  return (
    <section className='repos'>
      <div className='repo'>
        <header>
          <h2 className='h2'>Top Repos</h2>
        </header>
        <div className='repo-list'>
          <ul>
            {toprepos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target='_blank'
                  className='repo__link'
                  rel='noopener noreferrer'
                >
                  <div className='repo__top'>
                    <div className='repo__name'>
                      <h3>{repo.name}</h3>
                    </div>
                    <p>{repo.description}</p>
                  </div>
                  <div className='repo__stats'>
                    <div className='repo__stats--left'>
                      <span>{repo.language}</span>
                      <span>
                        <img src={star} alt='star' />
                        {repo.stargazers_count.toLocaleString()}
                      </span>
                      <span>
                        <img
                          src={fork}
                          alt='fork'
                          style={{ height: '15px', width: '15px' }}
                        />
                        {repo.forks.toLocaleString()}
                      </span>
                    </div>
                    <div className='repo__stats--right'>
                      <span>{repo.size.toLocaleString()}KB</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

Repos.propTypes = {
  repoData: PropTypes.array.isRequired,
}

export default Repos

/*
 <div className='dropdown-wrapper'>
            <span className='label'>by</span>
            <div className='dropdownstyle'>
              <button className='dropdown__button'>
                <label>{sortType}</label>
              </button>
              <ul className='dropdown__list'>
                {sortTypes.map((type, i) => (
                  <li className='dropdown__list-item' key={i}>
                    <button onClick={() => changeRepoSort(type)}>{type}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
*/
