const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {

  console.log( event )

  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      console.log( data.Error )
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    console.log( data )
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.log( error )
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}