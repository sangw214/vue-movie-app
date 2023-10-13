/*
메인 페이지 이동
about 내비게이션 버튼 클릭
movie 페이지 이동
header 사용자 로고 클릭
about 페이지 정보 확인 검증
*/


describe('About 페이지 이동',()=>{
  it('메인 페이지 이동',()=>{
    cy.visit( '/' )
    cy.get('header .nav-link.active')
      .contains('Search')
  })
  it('About 페이지 이동',()=>{
    cy.visit( '/' )
    cy.get('header .nav-link')
      .contains('About')
      .click()
    cy.url()
      .should('include','/about')
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains('About')
    cy.get('.name')
      .contains('sangw')
  })  
  it('영화 상세 페이지 이동',()=>{
    cy.get('header .nav-link')
      .contains('Movie')
      .click()
    cy.url()
      .should('include','/movie')
  })  
  it('About 페이지 이동',()=>{
    cy.get('header .user')
      .click()
    cy.url()
      .should('include','/about')
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains('About')
    cy.get('.name')
      .contains('sangw')
  })
})
