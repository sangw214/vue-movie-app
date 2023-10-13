import { shallowMount } from '@vue/test-utils'
import Search from '~/components/Search'

describe('components/Search.vue', ()=>{
  let wrapper
  
  beforeEach(()=>{
    wrapper = shallowMount(Search)
  })

  test('# 연도 테스트', () => {
    const year = wrapper.vm.filters.find(  f => f.name === 'year' )
    const yearLength = ( new Date().getFullYear() ) - 1985 + 1
    expect( year.items.length ).toBe( yearLength )
  })

})