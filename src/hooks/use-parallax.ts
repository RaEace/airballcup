import {useEffect, useState} from 'react';

function useParallax(offsetMultiplier: number): number {
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setOffset(scrollY * offsetMultiplier);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [offsetMultiplier]);

    return offset;
}

export default useParallax;
