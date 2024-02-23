"use client";

import axios from "axios";
import { useState } from "react";
import "./app.css";
import Link from "next/link";

export default function App(){
    let abc = "123"

    const [searchInfo, setSearchInfo] = useState({
        search: "",
        poopoo: 123123
    });

    const [foundInfo, setFoundInfo] = useState({
        allInfo: [],
        titles: [""],
        ids: [""]
    })

    function textChange(e){
        setSearchInfo({
            ...searchInfo,
            search: e.target.value
        });
    }

    

    async function textSubmit(e){
        console.log(searchInfo.search);
        const baseUrl = 'https://api.mangadex.org';
        await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: {
                title: searchInfo.search
        }
        }).then((response) => {
            //getting all of the titles, adding them together into a list
            let allInfo = response.data.data;
            let titles = [];
            let ids = [];
            for(let i = 0; i < allInfo.length; i++){
                titles.push(allInfo[i].attributes.title.en);
                ids.push(allInfo[i].id);
            }
            setFoundInfo({
                ...foundInfo,
                "allInfo":response.data.data,
                "titles":titles,
                "ids":ids
            });
            console.log(titles);
            console.log(response.data.data);
        });
    }

    let titleObjects = []
    for(let i = 0; i < foundInfo.titles.length; i++){
        titleObjects.push(
        <div key={i}>
            <Link href= {"/manga/" + foundInfo.ids[i]}>
            {foundInfo.titles[i]}
            </Link>
        </div>);
    }
    return(
        <div>
            <h1>{abc}</h1>

            <input 
            type = "text" 
            placeholder="Enter name"
            onChange={textChange}
            onSubmit={textSubmit} />

            <button onClick = {textSubmit}>submit</button>
            <div className="allTitles">{titleObjects}</div>
        </div>
    );
}