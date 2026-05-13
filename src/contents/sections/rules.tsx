import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import Details from "@/components/details.tsx";
import pongBall from "@/assets/icons/ping-pong-ball.png";
import {Rule} from "@/payload-types.ts";
import {RichText} from "@payloadcms/richtext-lexical/react";

const Rules: FunctionComponent<{rules: Rule[]}> = ({rules}) => {
    return (
        <article
            id={"rules"}
            className={"smooth md:grid md:grid-cols-2 md:grid-rows-1 relative font-display w-full min-h-full bg-gray-900 uppercase flex flex-col items-center justify-start px-4 pt-[11rem] gap-6"}
        >
            <AnimatedText/>
            <div className={"w-full h-full mb-12 md:pt-10 flex flex-col items-center md:items-center justify-center md:justify-start gap-2"}>
                <Badge className={"font-text lg:text-tag-l text-tag-m font-bold md:self-start md:ml-[25%] mb-1"}>
                    <p>🍺 Comment Jouer ?</p>
                </Badge>
                <h2 className={"smooth md:text-left text-center whitespace-nowrap font-display font-bold lg:text-display-l md:text-display-s text-title-s md:w-1/2 md:mt-4"}>
                    Règles du <br/><span className={"text-secondary-500"}>tournoi</span>
                </h2>
            </div>
            <div className={"w-full flex flex-col gap-4 md:w-2/3 self-start md:pt-14 headings_style"}>
                {rules.map((rule) => (
                    rule.content ? (
                        <Details title={rule.title} key={rule.title}>
                            <RichText data={rule.content}/>
                        </Details>
                    ) : null
                ))}
            </div>
        </article>
    );
};

const AnimatedText: FunctionComponent = () => {
    const itemsParts = ["Paris", "Fun", "Beer Pong", "Tournoi"];
    const repeated = Array.from({length: 8}, () => itemsParts).flat();
    const doubled = [...repeated, ...repeated];

    return (
        <div className={"whitespace-nowrap absolute -top-4 w-[110%] h-20 bg-secondary-500 -rotate-2 flex items-center overflow-hidden"}>
            <div className={"flex w-max animate-marquee-left"}>
                {doubled.map((item, index) => (
                    <span
                        key={index}
                        className={"smooth font-display lg:text-title-l md:text-title-m text-title-s font-bold flex items-center gap-1 mr-4"}
                        aria-hidden={index >= repeated.length ? "true" : undefined}
                    >
                        {item}
                        <img className={"mb-2 size-5"} src={pongBall.src} alt={""}/>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Rules;
