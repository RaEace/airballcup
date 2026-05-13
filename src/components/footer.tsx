import {FunctionComponent} from "react";
import {cn} from "@/lib/utils.ts";
import {buttonVariants} from "@/components/ui/button-variants";
import {ArrowRight} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import airballCupLogo from "@/assets/logo.svg";

const links = (registrationLink: string) => [
    {title: "s'inscrire", href: registrationLink, target: undefined},
    {title: "instagram", href: "https://www.instagram.com/airballcup", target: "_blank"},
    {title: "nous contacter", href: "mailto:feedesevents@gmail.com", target: undefined},
] as const;

const Footer: FunctionComponent<{registrationLink: string}> = ({registrationLink}) => {
    return (
        <footer className={"w-full bg-gray-950 md:h-[533px] h-[573px] grid sm:grid-rows-1 sm:grid-cols-2 grid-rows-2 grid-cols-1 gap-4"}>
            <div className={"size-full flex flex-col items-center justify-center"}>
                <Avatar className={"size-[208px] bg-primary-500 p-4"}>
                    <AvatarImage src={airballCupLogo.src} alt={"Airball Cup Logo"}/>
                    <AvatarFallback>Logo AirballCup</AvatarFallback>
                </Avatar>
            </div>
            <nav className={"flex flex-col items-center justify-center"}>
                {links(registrationLink).map(({title, href, target}) => (
                    <a
                        key={title}
                        target={target}
                        href={href}
                        className={cn(buttonVariants({variant: "link"}), "group font-display font-bold text-title-m md:mr-10 mr-6")}
                    >
                        <ArrowRight
                            color={"#E51C21"}
                            className={"smooth mr-2 mb-1 sm:size-10 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out transform translate-x-2"}
                        />
                        {title}
                    </a>
                ))}
            </nav>
        </footer>
    );
};

export default Footer;
