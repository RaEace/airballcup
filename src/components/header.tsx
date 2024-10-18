import {FunctionComponent, HTMLAttributeAnchorTarget} from "react";
import airballCupLogo from "@/assets/logo.svg";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import {AlignJustifyIcon, ArrowRight} from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {cn, CURRENT_SIGNUP_URL, handleScrollToSection} from "@/lib/utils.ts";

const Header: FunctionComponent = () => {
    const links: [string, string, HTMLAttributeAnchorTarget | undefined][] = [
        ["#about", "Notre histoire", undefined],
        ["#participate", "Comment participer", undefined],
        ["#cost", "Tarifs et récomponses", undefined],
        ["#champions", "Gallerie des champions", undefined],
        ["https://www.instagram.com/airballcup", "Instagram", "_blank"]
    ];

    function InnerBurgerMenu() {
        return <Sheet>
            <SheetTrigger>
                <Button variant={"outline"} size={"icon"}>
                    <AlignJustifyIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent side={"full"} className={"z-[101] bg-gray-950"}>
                <SheetTitle>
                    <SheetClose>
                        <Button variant={"link"} asChild>
                            <a href="/"><img src={airballCupLogo} alt="AirballCup Logo"/></a>
                        </Button>
                    </SheetClose>
                </SheetTitle>
                <SheetDescription className={"mt-10"}>
                    <nav className={"flex flex-col items-start"}>
                        {links.map(([href, title, target]) => (
                            <SheetClose key={href}>
                                <a target={target} className={
                                    cn(buttonVariants({variant: "link"}), "group font-display font-bold text-title-m")
                                }
                                   href={href}>
                                    <ArrowRight
                                        color={"#E51C21"}
                                        className={"smooth mr-2 mb-1 sm:size-10 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out transform translate-x-2"}
                                    />
                                    {title}
                                </a>
                            </SheetClose>
                        ))}
                    </nav>
                </SheetDescription>
                <SheetFooter className={"mt-10"}>
                    <ArrowButton
                        role={"link"}
                        onClick={() => { window.open(CURRENT_SIGNUP_URL) }}
                        size={"sm"}
                        iconPlacement={"right"}
                        className={"w-48 mr-4 py-6 px-8 ml-16"}
                        variant={"primary"}
                    >
                        Je m'inscris
                    </ArrowButton>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    }

    return <header
        className={"absolute backdrop-blur-[2px] font-display uppercase z-[100] px-6 flex items-center justify-between w-full h-[104px] bg-transparent"}>
        <a href="/">
            <img src={airballCupLogo} alt="logo airball cup"/>
        </a>

        <div className={"hidden lg:flex lg:items-center"}>
            {links.map(([href, title, target], index) => (
                <a
                   key={index}
                   onClick={target === undefined ? handleScrollToSection : undefined}
                   className={
                    cn(buttonVariants({ variant: "link" }), "xl:text-button-m lg:text-[10px]")
                   }
                   target={target}
                   href={href}>
                    {title}
                </a>
            ))}
            <Button role={"link"} onClick={() => { window.open(CURRENT_SIGNUP_URL) }} size={"sm"} variant={"invertedPrimary"}>
                Je m'inscris <ArrowRight className={"ml-2 mb-1 size-6"}/>
            </Button>
        </div>
        <div className={"lg:hidden"}>
            <InnerBurgerMenu/>
        </div>
    </header>
}

export default Header;