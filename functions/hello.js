exports.handler = async function( event, context) {
  return {
    statusCode : 200,
    body : JSON.stringify({
      name: 'Hello world !',
      age: 85,
      email: 'email@gmail.com'
    })
  }
}