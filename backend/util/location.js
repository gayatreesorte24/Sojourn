const axios = require('axios')
const HttpError = require('../models/http-error')
 
const API_KEY = 'Ai1sJ04aFWbGvrj5fAVnChLqYASb2fFf'
 
const getCoordsForAddress = async address => {
  const response = await axios.get(`
    http://open.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${encodeURIComponent(address)}
  `)
 
  const data = response.data
 
  if (!data || data.info.statuscode !== 0) {
    const error = HttpError('Could not find location for the specified address.', 422)
    return error
  }
 
  const coordinates = data.results[0].locations[0].latLng
 
  return coordinates
}
 
module.exports = getCoordsForAddress