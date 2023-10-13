/*
> 시나리오
  검색(메인) 페이지로 접근
  영화 제목 'jobs'로, 표시 개수를 30개로 변경
  'Apply' 버튼 클릭
  영화 목록 30개 출력 확인
  영화 목록에서 '' 영화 아이템 선택
  영화 상세 정보 페이지 이동
*/

describe('jobs 영화 검색',()=>{
  const _title = 'American Jobs'
  it('검색 페이지 접근',()=>{
    cy.visit('/')
    cy.get('header .nav-link.active')
      .contains('Search')
  })
  it('영화 검색',()=>{
    cy.get('input.form-control')
      .type('jobs')
    cy.get('select.form-select:nth-child(2)')
      .select('30')
    cy.get('button.btn')
      .contains('Apply')
      .click()
    cy.wait(2000)
    cy.get('.movie')
      .should('have.length', 30)
  })
  it('영화 아이템 선택',()=>{
    cy.get('.movie .title')
      .contains( _title )
      .click()
  })
  it('영화 상세 정보 확인',()=>{
    cy.url('https://willowy-axolotl-805348.netlify.app/#/movie/tt0461008')
      .should('include','/movie/tt0461008')
    cy.wait(2000)
    cy.get('header .nav-link.active')
      .contains('Movie')
    cy.get('.title')
      .contains( _title )
  })
})