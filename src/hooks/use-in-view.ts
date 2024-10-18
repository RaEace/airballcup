import {useEffect, useState} from "react";

function useInView(ids: string[]) {
    const [inView, setInView] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInView(entry.target.id);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: "0px 0px -100px 0px"
        });

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            ids.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    return inView;
}

export default useInView;