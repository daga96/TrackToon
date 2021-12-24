import { useState } from 'react';

export const useInfiniteScroll = (start = 12, pace = 7) => {
    const [limit, setLimit]= useState(start);
    window.onscroll=()=> {
        if(
            window.innerHeight+document.documentElement.scrollTop >= document.documentElement.scrollTop+640)
            {
                setLimit(limit+pace);
            }
        };
        return limit;
    };
    