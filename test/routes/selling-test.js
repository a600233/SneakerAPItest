let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
//let datastore = require('mongodb://a600233:cs748596123@ds119692.mlab.com:19692/heroku_kcg1tlsl')
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Donations', function (){
    // TODO
   /* beforeEach(function(){  
        while(datastore.length > 0) {
            datastore.pop();
        }  
        datastore.push( 
            {brand: 'Nike', series: 'React Element 87', name: 'Undercover Light Beige Chalk', size: 41,article_number:'BQ2718-200',selling_price:280,account_name:'JIE_Bao'}
        );
        datastore.push( 
            {brand: 'Nike', series: 'Air Jordan 1 Retro High', name: 'Game Royal', size: 42,article_number:'555088-403',selling_price:395,account_name:'JIE_Bao'}
        );
    });*/
    describe('GET /selling',  () => {
        it('should return all the selling in an array', function(done) {
            chai.request(server)
              .get('/selling')
             .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body.length).to.equal(8);	
    let result = _.map(res.body, (selling) => {
        return { size: selling.size,
            selling_price: selling.selling_price } 
        });
    expect(result).to.include( { size: 41, selling_price: 280  } );
    expect(result).to.include( { size: 42, selling_price: 395  } );
    done();
});
        });
    });
	
});