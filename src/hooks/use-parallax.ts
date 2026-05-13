import {useEffect, useState} from 'react';

function useParallax(offsetMultiplier: number): number {
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setOffset(window.scrollY * offsetMultiplier);
            });
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, [offsetMultiplier]);

    return offset;
}

export default useParallax;
