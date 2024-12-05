import {useEffect, useState} from "react";

function useMediaQuery(query = "(max-width: 768px)") {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setIsMobile(mediaQuery.matches);

        const listener = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", listener);

        return () => mediaQuery.removeEventListener("change", listener);
    }, []);

    return isMobile;
}

export default useMediaQuery;