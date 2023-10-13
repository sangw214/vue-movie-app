import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/routes/Movie'

describe('routes/Movie.vue',()=>{

  let wrapper

  beforeEach( async ()=>{

    window.scrollTo = jest.fn()

    router.push('/movie/tt1234567')

    await router.isReady()

    wrapper = shallowMount(Movie,{
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })

  })

  test('# 최초 URL 파라미터 검증 ',()=>{
    expect(wrapper.vm.$route.params.id).toBe('tt1234567')
  })

  test('# 이미지 크기 변경 검증', ()=>{
    const url = 'https://google.com/sample_image_SX300.jpg'
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain( 'SX700' )
    expect(wrapper.vm.requestDiffSizeImage(url,900)).toContain( 'SX900' )
  })

  test('# 비정상 이미지 주소 검증', ()=>{
    expect(wrapper.vm.requestDiffSizeImage('')).toBe( '' )
    expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe( '' )
  })

})