import { shallowMount } from '@vue/test-utils'
import router from '~/routes'
import store from '~/store'
import Header from '~/components/Header'

describe('components/Header.vue', ()=>{

  let wrapper 

  beforeEach( async ()=>{

    window.scrollTo = jest.fn()

    router.push('/movie/tt1234567')

    await router.isReady()

    wrapper = shallowMount(Header,{
      global:{
        plugins: [
          router,
          store
        ]
      }
    })

  })

  test('# 경로 정규표현식 없음 검증',()=>{
    const regexp = undefined
    expect( wrapper.vm.isMatch(regexp) ).toBe(false)
  })

  test('# 경로 정규표현식 일치 검증', ()=>{
    const regexp = /^\/movie/
    expect( wrapper.vm.isMatch(regexp) ).toBe(true)
  })

  test('# 경로 정규표현식 불일치 검증', ()=>{
    const regexp = /^\/sangw/
    expect( wrapper.vm.isMatch(regexp) ).toBe(false)
  })

})