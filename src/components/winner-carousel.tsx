import {FunctionComponent} from "react";
import placeholder from "@/assets/photos/arthur-et-romain.png";

const PRIMARY = "#E51C21";
const ROOT_ID = "winner-carousel";

/**
 * Pure-CSS carousel built on DaisyUI's scroll-snap pattern.
 * - Prev/Next: <a href="#winner-N"> anchor links inside each slide (no JS scroll needed)
 * - Active dot:  CSS :has(:target) — highlights the dot whose slide is the URL target
 */
const WinnerCarousel: FunctionComponent<{images: string[]}> = ({images}) => {
    const srcs = images.length > 0 ? images : [placeholder.src];
    const n = srcs.length;

    // Scoped CSS — no client JS needed.
    // :has(:target) resets all dots when any slide is targeted, then re-highlights the right one.
    // The default rule (no :has) shows the first dot active on initial load.
    const css = [
        // Offset anchor scroll by the header height so the carousel doesn't slide under it
        `[id^="winner-"] { scroll-margin-top: 104px; }`,
        `#${ROOT_ID} nav a { background-color: rgba(255,255,255,0.3); }`,
        `#${ROOT_ID} nav a:first-child { background-color: ${PRIMARY}; }`,
        `#${ROOT_ID}:has(:target) nav a { background-color: rgba(255,255,255,0.3); }`,
        ...srcs.map((_, i) =>
            `#${ROOT_ID}:has(#winner-${i}:target) nav a:nth-child(${i + 1}) { background-color: ${PRIMARY}; }`
        ),
    ].join(" ");

    return (
        <section id={ROOT_ID} className={"w-full"} aria-label={"Galerie des vainqueurs"}>
            {/* Scoped style — React 19 hoists <style> tags automatically */}
            <style>{css}</style>

            <div className={"carousel w-full rounded-xl"}>
                {srcs.map((src, i) => (
                    <div
                        key={i}
                        id={`winner-${i}`}
                        className={"carousel-item relative w-full flex-col items-center justify-center"}
                    >
                        {/* Image wrapper is the positioning root for the buttons */}
                        <div className={"relative w-full flex justify-center"}>
                            <img
                                className={"block w-auto h-auto max-w-full max-h-[55vh] rounded-xl"}
                                src={src}
                                alt={`Vainqueur ${i + 1}`}
                                loading={i === 0 ? "eager" : "lazy"}
                            />
                            {n > 1 && (
                                <div className={"absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between"}>
                                    <a
                                        href={`#winner-${(i - 1 + n) % n}`}
                                        aria-label={"Image précédente"}
                                        className={"flex items-center justify-center size-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-sm leading-none"}
                                    >
                                        ❮
                                    </a>
                                    <a
                                        href={`#winner-${(i + 1) % n}`}
                                        aria-label={"Image suivante"}
                                        className={"flex items-center justify-center size-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-sm leading-none"}
                                    >
                                        ❯
                                    </a>
                                </div>
                            )}
                        </div>

                        <p className={"text-white text-center mt-2 font-text text-text-m"}>
                            {i + 1}/{n}
                        </p>
                    </div>
                ))}
            </div>

            {n > 1 && (
                <nav className={"flex justify-center gap-3 mt-4"} aria-label={"Sélecteur de vainqueur"}>
                    {srcs.map((_, i) => (
                        <a
                            key={i}
                            href={`#winner-${i}`}
                            aria-label={`Vainqueur ${i + 1}`}
                            className={"size-3 rounded-full transition-colors hover:opacity-80"}
                        />
                    ))}
                </nav>
            )}
        </section>
    );
};

export default WinnerCarousel;
