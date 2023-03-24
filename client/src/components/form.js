import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

export const Form = ()=>{

    const initialvalue = {
        id:0,
        name:'',
        country:'',
        age:0,
        SchoolID:0,
        schoolName:'',
        schoolAddress:'',
        chair:'',
        ac:'',
        food:0
    }
    const [update, setupdate] = useState(initialvalue);
    const handlechange = (e) => {
    setupdate({ ...update, [e.target.name]: e.target.value });
    console.log(update);

  };


  const saveupdate = async () => {
  

 

    await axios({
      method: "post",
      url: `http://localhost:8000/setstudent`,
     
      data: update,
    }).then((res) => {
      console.log(res);
    });
  };




    return(
    <div>




           
            <div className="" style={{marging:"100px"}}>
              <div
                className=""
                style={{ backgroundColor: "rgb(243, 241, 241)" ,display:"flex" , justifyContent: "space-between"}}
              >
                <div className="">
                  <h4 className="text-right">form</h4>
                </div>
                <div className="">
                  <div className="">
                    <label className="">id</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="number"
                      name="id"
                      className="form-control"
                      placeholder="first name"
                    ></input>
                  </div>
                  <div className="">
                    <label className="">name</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="name"
                      className="form-control"
                    
                      placeholder="name"
                    ></input>
                  </div>
                </div>
                
                  <div className="">
                    <label className="">country</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="country"
                      className="form-control"
                      placeholder="country"
                    ></input>
                  </div>
                  <div className="">
                    <label className="labels UP_labels">age</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="number"
                      name="age"
                      className="form-control"
                
                      placeholder="age"
                    ></input>
                  </div>
                  <div className="">
                    <label className="labels UP_labels">SchoolID</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="SchoolID"
                      className="form-control"
                
                      placeholder="school id"
                    ></input>
                  </div>
                  {/* <div className="">
                    <label className="labels UP_labels">schoolName</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="schoolName"
                      className="form-control"
                
                      placeholder="Schoolname"
                    ></input>
                  </div>
                  <div className="">
                    <label className="labels UP_labels">schoolAddress</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="schoolAddress"
                      className="form-control"
                
                      placeholder="schoolAddress"
                    ></input>
                  </div> */}
                  <div className="">
                    <label className="labels UP_labels">chair</label>
                    <select
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="chair"
                      className="form-control"
                      placeholder="select branch"
                    >
                      <option value="Good">Good</option>
                      <option value="Bad">Bad</option>
                      
                    </select>
                  </div>
                  <div className="">
                    <label className="labels UP_labels">ac</label>
                    <select
                      onChange={(e) => handlechange(e)}
                      type="text"
                      name="ac"
                      className="form-control"
                      placeholder="select branch"
                    >
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                      
                    </select>
                  </div>
                 
                  <div className="">
                    <label className="labels UP_labels">food</label>
                    <input
                      onChange={(e) => handlechange(e)}
                      type="number"
                      name="food"
                      className="form-control"
                      
                      placeholder="food rating"
                    ></input>
                  </div>
                  
                
              </div>
            </div>


            <button
                  onClick={() => {
                    saveupdate();
                  }}
                 
                  type="button"
                >
                  Save Profile
                </button>

            </div>












)}

