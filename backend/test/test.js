var assert = require("chai").assert;
var app = require("../index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;
var pool = require("../ConnectionPooling.js");

var agent = require("chai").request.agent(app);

describe("HomeAway", function() {
  it("POST /Login", function() {
    this.timeout(50000);

    // return chai.request.agent(app)
    agent
      .post("/login")
      .send({
        Email: "abc@gmail.com",
        Password: "abc",
        Profile: "Buyer"
      })
      .then(function(res) {
        assert.equal(res.status, 200);
      });
  });

  // var chai = require('chai'), chaiHttp = require('chai-http');

  // chai.use(chaiHttp);

  // var expect = chai.expect;

  // it("Should check credentials and return status code", function(done){
  //     chai.request('http://127.0.0.1:3001')
  //     .post('/login')
  //     .send({ "username": "admin", "password" : "admin"})
  //     .end(function (err, res) {
  //         expect(res).to.have.status(200);
  //         done();
  //     });
  // })

  /*it('Post /Search', function () {


        agent.post('/search')
            .send({
                searchText: 'San Jose',
                startDate: '10-01-2018',
                endDate: '11-01-2018'
            })
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it('Post Property Details', function () {

        agent.post('/property-details')
            .send({
                PropertyId: "5"
            })
            .then(function (res) {
                expect(res).to.have.status(200);
            });

    });

    it('Get Trip Details', function () {

        agent.post('/trip-details')           
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });*/

  it("Get /Profile Details", function() {
    agent.get("/profile-details").then(function(res) {
      expect(res).to.have.status(200);
    });
  });
});
