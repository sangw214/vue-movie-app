import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title !'

export default {
  // module 선언
  namespaced: true,
  // data
  state: ()=>({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  getters: {
    movieIds( state ) {
      return state.movies.map( m => m.imdbID )
    }
  },
  // methods 
  // mutations 통해서만 데이터 변경 가능
  mutations: {
    updateState( state, payload ){
      Object.keys( payload ).forEach( key =>{
        state[key] = payload[key]
      } )
    },
    resetMovies( state ) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    },
  },
  // 비동기 동작, 데이터 가공 가능
  actions: {
/*    
    searchMovies( context ){
      context.state
      context.getters
      context.commit
    },
*/
    async searchMovies( { state, commit }, payload ){ /* 구조분해할당 가능 */

      if( state.loading ) return

      commit('updateState', {
        message: '',
        movies: [],
        loading: true
      })

      try{

        const res = await _fecthMovie({ 
          ...payload, 
          page: 1 
        })
  
        const { Search, totalResults } = res.data
  
        commit('updateState', {
          movies: _uniqBy( Search, 'imdbID' ),
        })
  
        const totalcnt = parseInt( totalResults )
        const pageLength = Math.ceil( totalcnt / 10 )
  
        if( pageLength > 1 ){
          for( let page = 2 ; page <= pageLength ; page++ ){
            if( page > payload.number / 10 ){
              break
            }
            const res = await _fecthMovie( { 
              ...payload,
              page 
            } )
            const { Search } = res.data
            commit('updateState', {
              movies: _uniqBy( [...state.movies, ...Search], 'imdbID' )
            })
          }
        }

      }catch( message ){

        commit('updateState',{
          movies: [],
          message
        })

      }finally{

        commit('updateState',{
          loading: false
        })

      }

    },
    async searchMovieWithId( { commit, state } , payload ){

      if( state.loading ) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try{

        const res = await _fecthMovie( payload )

        console.log( res )

        commit('updateState', {
          theMovie: res.data
        })

      }catch( message ){

        commit('updateState', {
          theMovie: {}
        })

      }finally{

        commit('updateState', {
          loading: false
        })  

      }

    }
  },
}

function _fecthMovie( payload ){

  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise(( resolve, reject )=>{
    axios.get(url)
      .then( res => {
        if( res.data.Error ){
          reject( res.data.Error )
        }
        resolve( res )
      } )
      .catch( ({ message }) => {
        reject( message )
      } )
  })

}