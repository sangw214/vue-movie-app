import axios from 'axios'
import movieStore from '~/store/movie'
import _cloneDeep from 'lodash/cloneDeep'

describe('store/movie.js',()=>{

  let store 

  beforeEach(() => {

    store = _cloneDeep( movieStore )

    store.state = store.state()

    store.commit = ( name, payload ) => {
      store.mutations[ name ]( store.state, payload )
    }

    store.dispatch = ( name, payload ) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      return store.actions[ name ]( context, payload )
    }

  })

  test('# store movie 데이터 초기화',()=>{

    store.commit('updateState',{
      movies: [{imdbID:'1'}],
      message: 'Hello world',
      loading: true
    })

    store.commit('resetMovies')

    expect( store.state.movies ).toEqual([])
    expect( store.state.message ).toBe('Search for the movie title !')
    expect( store.state.loading ).toBe(false)

  })

  test('# 영화 데이터 조회 기능 검증', async ()=>{

    const res = {
      data:{
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }

    axios.post = jest.fn().mockResolvedValue( res )

    await store.dispatch('searchMovies')
    expect( store.state.movies).toEqual( res.data.Search )

  })

  test('# 영화 데이터 조회 오류 검증', async ()=>{
    const errorMessage = 'Network Error.'
    axios.post = jest.fn().mockRejectedValue(new Error( errorMessage ))
    await store.dispatch('searchMovies')
    expect( store.state.message ).toBe( errorMessage )
  })

  test('# 영회 데이터 중복 처리 검증', async ()=>{

    const res = {
      data:{
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }                    
        ]
      }
    }

    axios.post = jest.fn().mockResolvedValue( res )

    await store.dispatch('searchMovies')
    expect( store.state.movies.length ).toBe( 1 )

  })

  test('# 단일영화 상세 정보 조회 검증', async ()=>{

    const res = {
      data:{
        imdbID: '1',
        Title: 'Hello',
        Poster: 'hello.jpg',
        Year: '2021'
      }
    }

    axios.post = jest.fn().mockResolvedValue( res )
    await store.dispatch('searchMovieWithId')
    expect( store.state.theMovie).toEqual( res.data )

  })

})