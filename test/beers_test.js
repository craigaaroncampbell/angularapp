var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = chai.expect;
var Beer = require(__dirname + '/../models/beer.js');
chai.use(chaiHttp);
process.env.MONGOLAB_URI = 'mongodb://localhost/beer_test';
require(__dirname + '/../server.js');

describe('beer_routes', function(){
  before(function(done){
  this.beerData = {name: 'test beer',brewery:'some brewery', style: 'cheap beer', notes: 'are you sure this is even beer?'};
  done();
  });
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });


  it('should GET you a menu of all the beers at a particular brewery', function(done){
    chai.request('localhost:3000')
    .get('/api/beers/some brewery')
    .send(this.beerData)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should be able to brew (create aka POST) a beer', function(done){

    chai.request('localhost:3000')
    .post('/api/beers')
    .send(this.beerData)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('test beer');
      expect(res.body.brewery).to.eql('some brewery');
      expect(res.body.style).to.eql('cheap beer');
      expect(res.body.notes).to.eql('are you sure this is even beer?');
      expect(res.body).to.have.property('_id'); //this comes from mongo so we know we are really getting a response back after posting mongo
      done();
    });
  });

  it('should be able to purchase (GET) all the beers', function(done){
    chai.request('localhost:3000')
    .get('/api/beers')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true); // mongo sends arrays back so if it is an array then it presumably came from mongo
      done();
    });
  });

  describe('when you taste some beers you', function(){
    beforeEach(function(done){
      (new Beer({name: 'test beer', style: 'malt liquor', notes: 'it comes in a 40 so you\'ll feel guilty about dumping so much out... but you will anyway'})).save(function(err, data){
        expect(err).to.eql(null);
        this.beer = data;
        done();
      }.bind(this));
    });

    it('should be able to drink a beer and modify (PUT) the info noted about it', function(done){
      chai.request('localhost:3000')
      .put('/api/beers/' + this.beer._id)
      .send({name: 'garbage', style: 'not even beer, really'})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('updated!');
        done();
      });
    });

    it('should be able to pour out (DELETE) crappy beer as needed', function(done){
      chai.request('localhost:3000')
      .delete('/api/beers/' + this.beer._id)
      .send({name: 'bad'})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('deleted!');
        done();
      });
    });
  });
});

describe('non_api_routes', function(){
  it('should display a the name speicified in the route in CAPS and send back that they like beer', function(){
    chai.request('localhost:3000')
    .get('/jim')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql("My name is JIM and I like me some beer.");
    });
  });
});

