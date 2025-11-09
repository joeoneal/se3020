import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function useMusicData()  {
    const [data, setData] = useState(null);
    const params = useLocalSearchParams()
    const term = params.term.toString()
    const termString = term.replaceAll(' ', '+')
    const filter = params.filter
    const filterString = filter.toString()

    const url = `https://itunes.apple.com/search?term=${termString}&media=music&entity=${filterString}&limit=25`

    const fetchMusicData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log(json);
        setData(json);
    };

    useEffect(() => {
         fetchMusicData();
    }, []);

    return {data};

}