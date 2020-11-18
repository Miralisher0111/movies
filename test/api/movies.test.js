const chai=require('chai')
const chaihttp=require('chai-http')
const server=require('../../app')
const should=chai.should()

chai.use(chaihttp)

describe('Get token',()=>{
    before((done)=>{
        chai
        .request(server)
        .post('/authenticate')
        .send({username:"Madina",password:"1999"})
        .end((err,res)=>{
            if(err){
                throw err
            }
            token=res.body.token
            done()
        })

    })
    describe("List all movies",()=>{
        it("with method get",(done)=>{
            chai
            .request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                if(err){
                    throw err
                }
                res.should.have.status(200);
                res.body.should.be.a("array");
                done()
            })
        })
    })

    describe('kino kiritish',()=>{
        it("token qo\'yish",(done)=>{
            
            const movie = {
                      title: "Gitler",
                      category: "war",
                      country: "USA",
                      year: "1997",
                      director_id: "5f63880e3cf43d1dc093ca7f",
                      imdb_score: 7,
                    };
                    chai
            .request(server)
            .post('/api/movies')
            .send(movie)
            .set("x-access-token",token)
            .end((err,res)=>{
                // if(err){
                //     throw err;
                // }
               
        res.should.have.be.a("object");
        res.body.should.have.property("title");
        res.body.should.have.property("category");
        res.body.should.have.property("country");
        res.body.should.have.property("year");
        res.body.should.have.property("director_id");
        res.body.should.have.property("imdb_score");
        movieId=res.body._id;
        
        done();
            });
        });
    });
    describe('kinoni id bilan ko\'ramiz',()=>{
        it('Get methodi bilan',(done)=>{
            chai
            .request(server)
            .get(`/api/movies/${movieId}`)
            .set('x-access-token',token)
            .end((err,res)=>{
                if(err){
                    throw err
                }
                res.should.have.be.a("object")
                res.body.should.have.property("title");
                res.body.should.have.property("category");
                res.body.should.have.property("country");
                res.body.should.have.property("year");
                res.body.should.have.property("director_id");
                res.body.should.have.property("imdb_score");
                res.body.should.have.property("_id").equal(movieId);
                done()
            })
        })
    })

    describe('update movies',()=>{
        it("update movie with method put",(done)=>{
            chai
            .request(server)
            .put(`/api/movies/${movieId}`)
            .send({title:"Madagaskar"})
            
            .set("x-access-token",token)
            .end((err,res)=>{
                if(err){
                    throw err
                }
                res.should.have.be.a("object")
                res.body.should.have.property("title");
                res.body.should.have.property("category");
                res.body.should.have.property("country");
                res.body.should.have.property("year");
                res.body.should.have.property("director_id");
                res.body.should.have.property("imdb_score");
                res.body.should.have.property("_id").equal(movieId);
                done();
            })
        })
    })
    describe("kinoni o'chiramiz",()=>{
        it("with method delete",(done)=>{
            chai
            .request(server)
            .delete(`/api/movies/${movieId}`)
            .set('x-access-token',token)
            .end((err,res)=>{
                if(err){
                throw err
                }
                res.should.have.be.a("object")
                done()
            })
        })
    })
    describe("top10 talik movie",()=>{
        it("with method get",(done)=>{
            chai
            .request(server)
            .get(`/api/movies/top/top10`)
            // .set('x-access-token',token)
            .end((err,res)=>{
                if(err){
                    throw err
                }
                res.should.have.be.a("object")
                done()
            })
        })
    })
    describe("startyear betwen endyear movies",()=>{
        it('with method get',(done)=>{
        chai
        .request(server)
        .get(`{/api/movies/between/${2008}/${2017}`)
        .set("x-acces-token",token)
        .end((err,res)=>{
            if(err){
                throw err
            }
            res.body.should.be.a("object")
            done();
        })
        })
    })
})