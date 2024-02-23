"use client";

import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";

export default function MangaOverview({params}){

    const [chapters, setChapters] = useState([]);

    useEffect(function(){
        const baseUrl = 'https://api.mangadex.org';
        axios({
            method: 'GET',
            url: baseUrl + "/manga/" + params.mangaId + "/feed"
        }).then((res) => {
            console.log(res.data);
        });
    });
    return(
    <div>
        {params.mangaId}

    </div>
    );
}