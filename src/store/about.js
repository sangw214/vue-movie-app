export default {
  namespaced: true,
  /* 데이터 불변성 유지를 위해 function 으로 감싸서 리턴 */
  state: () => ({
    name: 'sangw',
    email: 'hybridspirit@gmail.com',
    blog: 'https://google.com',
    phone: '+82-10-3311-2787',
    image: 'https://www.starbucks.co.kr/common/img/footer/recruit/icon_recruit01.png',
  })
}