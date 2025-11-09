
import { useEffect, useState } from "react";

export default function useDetailsById(id) {
    const [data, setData] = useState(null);

    const fetchDetails = async () => {

        if (!id){
            return
        }

        const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
        const json = await response.json();
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log(json);
        setData(json);
    };

    useEffect(() => {
         fetchDetails();
    }, [id]);

    return {data};

}

