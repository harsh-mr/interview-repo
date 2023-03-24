import express, { Router } from 'express';
import internal from 'stream';
// import mware from '../pagination.mjs';

const router = Router();



function mware (model){
    // middleware function
    return (req, res, next) => {
        // console.log(req);
        // console.log(req.data)
      const country = req.body.country;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let temp = [];
      console.log('con',country)
    var i,j;
      for(i =0;i<model.length;i++){
        var a ;
            if(model[i].country == country){
                a  = model[i];
                for ( j = 0; j < schools.length; j++) {
                    if(model[i].SchoolID == schools[j].SchoolID){
                        a.schoolName = schools[j].name;
                        a.schoolAddress = schools[j].address;
                        break;
                    }
                }
                for ( j = 0; j < reviews.length; j++) {
                    if(model[i].id == reviews[j].id){
                        a.chair = reviews[j].chair;
                        a.ac = reviews[j].ac;
                        a.food = reviews[j].food;
                        break;
                    }
                }
                temp.push(a);
            }
      }
      console.log('temp',temp)

      
  
      const results = {};
      if (endIndex < temp.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
  
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
      console.log(model)
      results.results = temp.slice(startIndex, endIndex);
  
      res.paginatedResults = results;
      next();
    };
  }

var students = [{
    id: 1,
    name: 'John',
    country: 'USA',
    age: 20,
    SchoolID: 1

},{
    id: 2,
    name: 'harsh',
    country: 'India',
    age: 20,
    SchoolID:2
}];

var reviews = [{
    id: 1,
    chair: 'good',
    ac: 'yes',
    food: 5
},{
    id: 2,
    chair: 'bad',
    ac: 'no',
    food: 2
}]


var schools = [{
    SchoolID: 1,
    name: 'MIT',
    address: 'USA',
},{
    SchoolID: 2,
    name: 'IIT',
    address: 'India',
}]


router.post('/studentByCountry',mware(students), (req, res) => {
    
    res.json({status: 200, message: 'Success', data: res.paginatedResults});
})



router.post('/getComparison', (req, res) => {
    try{

        let data1 ,data2;
        const { person1 ,person2} = req.body;
        let id1 = (person1);
        let id2 = (person2);
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == id1) {
                data1 = students[i];
                break;
            }
        }
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == id2) {
                data2 = students[i];
                break;
            }
        }
        for(var i =0;i<schools.length;i++){
            if(data1.SchoolID == schools[i].SchoolID){
                data1.schoolName = schools[i].name;
                data1.schoolAddress = schools[i].address;
                break;
            }
        }
        for(var i =0;i<schools.length;i++){
            if(data2.SchoolID == schools[i].SchoolID){
                data2.schoolName = schools[i].name;
                data2.schoolAddress = schools[i].address;
                break;
            }
        }
        for(var i =0;i<reviews.length;i++){
            if(data1.id == reviews[i].id){
                data1.chair = reviews[i].chair;
                data1.ac = reviews[i].ac;
                data1.food = reviews[i].food;
                break;
            }
        }
        for(var i =0;i<reviews.length;i++){
            if(data2.id == reviews[i].id){
                data2.chair = reviews[i].chair;
                data2.ac = reviews[i].ac;
                data2.food = reviews[i].food;
                break;
            }
        }
        let opinionDifferance = [];
        console.log('data1',data1);
        console.log('data2',data2);
        if(data1.SchoolID === data2.SchoolID){
            if(data1.chair !== data2.chair){
                opinionDifferance.push('chair');
            }
            if(data1.ac !== data2.ac){
                opinionDifferance.push('ac');
            }
            if(data1.food !== data2.food){
                opinionDifferance.push('food');
            }
            console.log('opinionDifferance',opinionDifferance);
            res.json({status:200,msg:"They are from same school but they have opinion differance ",opinionDifferance:opinionDifferance});
            return
        }
        
        
        console.log('opinionDifferance',opinionDifferance);
        res.json({status:200,msg:"They are from different school so cannot calculate opinion differance",opinionDifferance:opinionDifferance});
    }catch(error){
        res.json({status:500,error:error});
    }

})


router.post('/setstudent', (req, res) => {
    console.log('students',students);
    try{

        const { id ,name, country, age ,chair ,ac , food ,SchoolID} = req.body;
        let check =1;
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == id) {
                check =0;
                break;
            }
          
        }
        if(check ==1) {
            students.push({
                id: id,
                name: name,
                country: country,
                age: age,
                SchoolID: SchoolID
            });
        }

       check =1;
        for (var i = 0; i < reviews.length; i++) {
            
            if (reviews[i].id == id) {
                reviews[i].chair = chair;
                reviews[i].ac = ac;
                reviews[i].food = food;
                check =0;
                break;
            }
            
        }
        if(check ==1){
            reviews.push({
                id: id,
                chair: chair,
                ac: ac,
                food: food,
            });
        }
        
       res.json({status: 200, message: 'Success', data: students,reviews:reviews});
        
    }catch(err){
        console.log(err);
        res.json({status: 500, message: 'Internal Server Error'});
    }
        
    })
    
    
export default router;
