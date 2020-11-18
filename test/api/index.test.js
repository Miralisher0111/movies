const chai=require('chai')
const chaihttp=require('chai-http')
const server=require('../../app')
const should=chai.should();

chai.use(chaihttp)

describe('Index page testing',()=>{
    it('with method GET',(done)=>{
        chai
        .request(server)
        .get('/authenticate')
        .end((err,res)=>{
            if(err){
                throw err
            }
            res.should.have.status(200);
            done()
        })
    })
})