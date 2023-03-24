import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

export const Comparison = () => {
    const [person1,setPerson1] = useState('');
    const [person2,setPerson2] = useState('');
    const [diff,setDiff] = useState([]);
    const [msg,setMsg] = useState('');
    const calDiff = () => {
        axios({
            method: 'post',
            url: `http://localhost:8000/getComparison`,
            data:{
                person1:person1,
                person2:person2
            }
    }).then((res) => {
        console.log(res.data);
        setMsg(res.data.msg);
        setDiff(res.data.opinionDifferance);
    })
    }

    return(
        <div>

        <input type="text" onInput ={(e)=>setPerson1(e.target.value)} placeholder="Enter person1 name"/>
        <input type="text" onInput ={(e)=>setPerson2(e.target.value)} placeholder="Enter person1 name"/>
    
        <button onClick={calDiff}>Calculate Differance in opinion</button>
        

        <div>
            <h3>{msg} in</h3>
        </div>
        <div>
            {diff && diff.map((item,index) => {
                return(
                    <div>
                        <h2>{item}</h2>
                    </div>
                )
            })}
        </div>



        </div>
    )
}