var properties= require('../../../e2e-properties.js'),
    head = require("../head.js"),
    expectedData = require("../steps/expectedData.js");

var url = properties.url;


describe("Enter in google",function () {
    it("Url of google",function () {
        isAngularSite(false);
        browser.get(url);
        head.enteringDataintotheSearchField.sendKeys(expectedData.search);
        head.clickOnSearch.click();
    });
});