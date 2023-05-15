require('dotenv').config()
const express = require('express')
const app = express()


// TODO: import the getCityInfo and getJobs functions from util.js

const appInfo = require('./util.js')


// TODO: Statically serve the public folder

app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city

// This endpoint should call getCityInfo and getJobs and 

// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city
    const cityInfo = await appInfo.getCityInfo(city)
    const jobs = await appInfo.getJobs(city)

    // trying to find city info and jobs together
    if (cityInfo && jobs) {
        res.status(200).json({ cityInfo, jobs })

        // trying to find city info but also handling no jobs
    } else if (cityInfo && !jobs) {
        res.status(200).json({ cityInfo: cityInfo, jobs: false })

        // trying to find jobs but also handling no city info
    } else if (!cityInfo && jobs) {
        res.status(200).json({ jobs: jobs, cityInfo: false })

        // handling failure on both ends
    } else {
        res.status(404).json({ error: 'Not found' })
    }
})

module.exports = app
