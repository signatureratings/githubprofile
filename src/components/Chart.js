import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CanvasJSReact from '../functions/canvasjs.react'
import '../styles/Chat.css'
import star from '../star_black_24dp.svg'

var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

function Chart({ langData, repoData }) {
  //top languages chart
  const [langChartError, setlangError] = useState(false)
  const [starChartError, setstateChartError] = useState(false)
  const [thirdChartError, setthirdChartError] = useState(false)

  //top languages data
  var data = []
  langData.forEach((val) => {
    data.push({ label: val.label, y: val.value })
  })
  if (data.length <= 0) setlangError(true)

  //most starred data
  const LIMIT = 5
  const sortProperty = 'stargazers_count'
  const mostStarredRepos = repoData
    .filter((repo) => !repo.fork)
    .sort((a, b) => b[sortProperty] - a[sortProperty])
    .slice(0, LIMIT)
  const stardata = []
  mostStarredRepos.forEach((val) => {
    stardata.push({ x: val.name, y: val.stargazers_count })
  })
  console.log(stardata)
  if (stardata.length <= 0) setstateChartError(true)

  //stars per language data
  const filteredRepos = repoData.filter(
    (repo) => !repo.fork && repo.stargazers_count > 0
  )
  const uniqueLangs = new Set(filteredRepos.map((repo) => repo.language))
  const labels = Array.from(uniqueLangs.values()).filter((l) => l)
  const Data = labels.map((lang) => {
    const repos = filteredRepos.filter((repo) => repo.language === lang)
    const starsArr = repos.map((r) => r.stargazers_count)
    const starSum = starsArr.reduce((a, b) => a + b, 0)
    return starSum
  })
  const starlangdata = []
  for (let i = 0; i < labels.length; i++) {
    starlangdata.push({ label: labels[i], y: Data[i] })
  }
  if (starlangdata.length <= 0) setthirdChartError(true)

  //top languages chart
  const langoptions = {
    animationEnabled: true,
    // exportEnabled: true,
    /*title: {
      text: 'Top Languages',
    } */
    data: [
      {
        type: 'pie',
        dataPoints: data,
      },
    ],
  }

  const starchart = stardata.map((number) => (
    <span className='starchart'>
      <li>{number.x}</li>
      <li>
        <img src={star} alt='star' style={{ color: 'gold' }} />
        {number.y}
      </li>
    </span>
  ))

  //stars per lang chart
  const starslangoptions = {
    animationEnabled: true,
    // exportEnabled: true,
    /*  title: {
      text: 'Stars Per Languages',
    },*/
    data: [
      {
        type: 'pie',
        dataPoints: starlangdata,
      },
    ],
  }

  return (
    <section className='charts'>
      <div className='charts__'>
        <div className='chart'>
          <header>
            <h2 className='design'>Top Languages</h2>
          </header>
          <div className='chart-container'>
            {langChartError && <p>Nothing to see here!</p>}
            <CanvasJSChart options={langoptions} />
          </div>
        </div>
        <div className='chart'>
          <header>
            <h2 className='design'>Most Starred</h2>
          </header>
          <div className='chart-container'>
            <div>
              <ul className='list'>{starchart}</ul>
            </div>
            {starChartError && <p>Nothing to see here!</p>}
          </div>
        </div>
        <div className='chart'>
          <header>
            <h2 className='design'>Stars per Language</h2>
          </header>
          <div className='chart-container'>
            {thirdChartError && <p>Nothing to see here!</p>}
            <CanvasJSChart options={starslangoptions} />
          </div>
        </div>
      </div>
    </section>
  )
}

Chart.propTypes = {
  langData: PropTypes.array.isRequired,
  repoData: PropTypes.array.isRequired,
}

export default Chart
