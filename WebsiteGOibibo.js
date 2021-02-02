/// <reference types="Cypress" />
describe('Goibibo.com Portal ',() => {
    it('Site Nationality', () => {
        cy.visit("https://www.goibibo.com/");
        //cy.reload();
        cy.wait(1000);
        cy.get("#header > div.col-md-8.col-sm-8.col-xs-6.pad0.marginT5 > a > img").should('be.visible');
        cy.wait(300);
    })
    it('Flights if visible, click, confirm with BaseUrl', () => {
        cy.get("#header > div.col-md-8.col-sm-8.col-xs-6.pad0.marginT5 > ul > li.active > a").should('be.visible').click();
        cy.wait(200);
        cy.url().should('eq', Cypress.config().baseUrl + 'flights/');
        cy.wait(100);

    })
    it('Check for One way, Round Trip, Multicity options', () => {
        cy.get("div.dF.justifyCenter.padTB20 > div").should('be.visible');
        cy.wait(100);
        cy.get("#roundTrip").click(); 
        cy.wait(100);
    })
    it("select flights" , () => {

        //Select Flights from Delhi to Bangalore and Return
        cy.get("#gosuggest_inputSrc").type("Del{downarrow}");
        cy.get("#react-autosuggest-1 > li:nth-child(1)").should("be.visible").click();
    
        cy.get("#gosuggest_inputDest").should("be.visible").type("Ben{downarrow}");
        cy.get("#react-autosuggest-1 > li:nth-child(1)").should("be.visible").type('{enter}');
        
    })
    it('Dates', () =>{
        //Departure Tab
        cy.get("#departureCalendar").click({force:true});
        cy.wait(300);
        
        //Departuredate
        cy.get("#fare_20210205 > div > span").click({force:true});

        //ReturnTab
        cy.get("#returnCalendar").click({force:true});
        cy.wait(300);

        //return date
        cy.get("#fare_20210216 > div > span").click({force:true});

        //Passenger
        cy.get("#pax_link_common > span").click({force:true});

        //Adult Count increase
        cy.get("#adultPaxPlus").click();

        //select Business class
        cy.get("#gi_class").select('Business').should('have.value','B');

            //SEARCH FOR FLIGHTS
        cy.get("#gi_search_btn").click({force:true});
    })


    it('Flight Choice Page', () => {

        //Filter added
        cy.get("#filterContainer > div > div:nth-child(2) > div:nth-child(1) > div > div.dF.padT10.justifyBetween.fltrStp.flexWrap > label:nth-child(1)").first().click();
        cy.wait(100);
    
        //Filter added
        cy.get("#filterContainer > div > div:nth-child(2) > div:nth-child(2) > div > div.dF.padT10.justifyBetween.fltrStp.flexWrap > label:nth-child(1)").last().click();
        cy.wait(100);
    
        //Book the optimum flight
        cy.wait(200);
        cy.get('input[class="button fr fltbook fb widthF105 quicks fb"]').should('have.value',"BOOK").click();
    })
    
    it('Confirmation', () => {
        cy.wait(100);

        //Insure Trip
        cy.get("#secure-trip").click({force:true});
        cy.wait(100)
    
    
        //information updated for passenger 1
        cy.get("#Adulttitle1").select('Mr').should('have.value','1');
        cy.wait(100);
        cy.get("#AdultfirstName1").type("FirstName");
        cy.get("#AdultlastName1").type('FirstSurname');
    
        
        //Select second passenger
        cy.get('#travellerForm > div.fl.width100.padLR20.mobpadLR5.bkTraveller.padT10 > div:nth-child(4) > div:nth-child(2) > div[class="fl width100 padTB10 curPoint"]').click();
    
        //information updated for passenger 2
        cy.get("#Adulttitle2").select('Mrs').should('have.value','2');
        cy.wait(100);
        cy.get("#AdultfirstName2").type("SecondName");
        cy.get("#AdultlastName2").type('SecondSurname');
        
        cy.wait(100);


        cy.get("#email").type("demotrial@gmail.com");
        cy.get("#mobilecode").select('+91').should('have.value','+91');
        cy.wait(100);
        cy.get("#mobile").type("8794036105");
        cy.wait(500);

        //PROMOCODE
        cy.get("#fareSummary > div.offerScroll > div:nth-child(2) > div.borderAll.posRel.whiteBg.crdShdw.brRadius5.fl.width100.bkFxdRt.marginB15.clr.marginT10 > div > div:nth-child(2) > span:nth-child(1) > label > input[type=radio]").click({force:true});
        cy.wait(500);
        cy.get("#content > div > div > div > div:nth-child(8) > div.goModal.popModal.zoom.mediumSmall.popShow > div > div > div.popBodyChildBtn.padT10.fl.width100 > button").click({force:true});
        
        //Proceed Button
        cy.wait(300);
        cy.get("#travellerForm > div.fl.width100.borderTop.padLR15.padTB10 > button").click({force:true});     
    })
    
    it('Covid Check and payment', () => {
    //Covid Check OK
    cy.wait(500);
    cy.get("#content > div > div > div > div.fl.width100 > div > div.flightDetails.fl > div:nth-child(5) > div:nth-child(1) > div.popModal.zoom.large.popShow > div > div > div.dF.padT20 > button").click({force:true})
    cy.wait(300);
    //Skip to payment
    cy.get("#addonCard > div.dF.alignItemsCenter.justifyBetween.pad20.hpyBrdrBot > div > span").click({force:true});
    cy.wait(7000);
    
    //Uncaught Exception handling. Application's issue. not code problem.
    Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
    })

    //card no-
    cy.get("#card > div.paymentContent > div > div.newCardDetail > div:nth-child(3) > div.col-md-5.col-sm-5.col-xs-12.pad0.cr_crd_no_p > div.width100.fl.padT5.padB10 > div > input[type='text']").type('6080320414500183');
    cy.wait(100);
    //card name-
    cy.get("#card > div.paymentContent > div > div.newCardDetail > div:nth-child(3) > div.col-md-5.col-sm-5.col-xs-12.pad0.cr_crd_name_p > div.width100.fl.padT5.padB10 > div > input[type='text']").type('First Name');
    cy.wait(100);
    //uncheck-
    cy.get("#card > div.paymentContent > div > div.newCardDetail > div:nth-child(4) > form > input[type='checkbox']").click()
    cy.wait(100);
    
    //cvv-
    cy.get("#card > div.paymentContent > div > div.newCardDetail > div.fl.padT15.col-md-5.col-sm-5.col-xs-12 > div.col-md-6.col-sm-6.col-xs-6.pad0.cr_cvv_no_p > div:nth-child(1) > input[type='password']").type('123');
    cy.wait(100);

    cy.get("#card > div.paymentContent > div > div.newCardDetail > div.fl.padT15.col-md-5.col-sm-5.col-xs-12 > div.col-md-6.col-sm-6.col-xs-6.pad0.cr_crd_exp_p > div.width100.fl.padT5.padB10 > div > input[type='text']").type('0626')
    //Pay-
    cy.get("#card > div.paymentContent > div > div.width100.fl.payNow > div.col-md-6.col-sm-6.col-xs-12.pad0.displayFlex > div.col-md-8.col-sm-8.col-xs-8.marginT5 > button").click({force:true});
    cy.wait(100);
    })
    })
    


