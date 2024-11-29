"use client";

import {FunctionComponent, HTMLAttributeAnchorTarget, useEffect, useState} from "react";
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
import useInView from "@/hooks/use-in-view.ts";
import {usePathname} from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";
import Link from "next/link";

const Header: FunctionComponent = () => {
    const [showStickyBtn, setShowStickyBtn] = useState<boolean>(false);
    const pathname = usePathname();
    const slug = pathname === "/" ? "" : "/";
    const links: [string, string, HTMLAttributeAnchorTarget | undefined][] = [
        [slug + "#about", "Notre histoire", "_self"],
        [slug + "#participate", "Comment participer", "_self"],
        [slug + "#cost", "Tarifs et récompenses", "_self"],
        [slug + "#champions", "Gallerie des champions", "_self"],
        //--end of nested links--//
        ["/rankings", "Classement", "_self"],
        ["https://www.instagram.com/airballcup", "Instagram", "_blank"]
    ];
    const END_OF_NESTED_LINKS_INDEX = 3;
    const navigationMenuLinks = links.slice(0, END_OF_NESTED_LINKS_INDEX+1);
    const hiddenSections = ["cta", "tournament-info", "participate", null];
    const sectionsToObserve = ["cta", "about", "participate", "cost", "champions", "rules", "gallery", "tournament-info"];
    const inView = useInView(sectionsToObserve);

    useEffect(() => {
        console.log(inView)
        if (hiddenSections.includes(inView)) {
            setShowStickyBtn(false);
        } else {
            setShowStickyBtn(true);
        }
    }, [inView]);

    function InnerBurgerMenu() {
        return <Sheet>
            <SheetTrigger>
                <div role={"button"} className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
                    <AlignJustifyIcon/>
                </div>
            </SheetTrigger>
            <SheetContent side={"full"} className={"z-[101] bg-gray-950"}>
                <SheetTitle>
                    <SheetClose>
                        <a className={cn(buttonVariants({ variant: "link" }))} href="/">
                            <img src={airballCupLogo.src} alt="AirballCup Logo"/>
                        </a>
                    </SheetClose>
                </SheetTitle>
                <SheetDescription className={"mt-10"}>
                    <div role={"navigation"} className={"flex flex-col items-start"}>
                        {links.map(([href, title, target]) => (
                            <SheetClose key={href}>
                                <Link prefetch title={title} target={target} className={
                                    cn(buttonVariants({variant: "link"}), "group font-display font-bold text-title-m")
                                }
                                   href={String(href)}>
                                    <ArrowRight
                                        color={"#E51C21"}
                                        className={"smooth mr-2 mb-1 sm:size-10 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out transform translate-x-2"}
                                    />
                                    {title}
                                </Link>
                            </SheetClose>
                        ))}
                    </div>
                </SheetDescription>
                <SheetFooter className={"mt-10"}>
                    <ArrowButton
                        name={"register-header"}
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
        <Link prefetch title={"back-home-link"} href="/">
            <img src={airballCupLogo.src} alt="logo airball cup"/>
        </Link>

        <div className={"hidden lg:flex lg:items-center"}>
            <Navbar nestedLinks={navigationMenuLinks} links={links.slice(END_OF_NESTED_LINKS_INDEX+1)}/>
            <Button name={"register-header-main"} role={"link"} onClick={() => {
                window.open(CURRENT_SIGNUP_URL)
            }} size={"sm"} variant={"invertedPrimary"}>
                Je m'inscris <ArrowRight className={"ml-2 mb-1 size-6"}/>
            </Button>
        </div>
        <div className={"lg:hidden flex items-center justify-center space-x-4"}>
            <Button
                role={"link"}
                name={"register-header-mobile-"+(showStickyBtn ? "visible" : "invisible")}
                onClick={() => { window.open(CURRENT_SIGNUP_URL) }}
                size={"sm"}
                variant={"primary"}
                disabled={!showStickyBtn}
                className={cn("smooth transition", {"invisible animate-easeOut": !showStickyBtn}, {"animate-easeIn": showStickyBtn})}
            >
                Je m'inscris
            </Button>
            <InnerBurgerMenu/>
        </div>
    </header>
}

function Navbar({nestedLinks,links}: {
    nestedLinks: [string, string, HTMLAttributeAnchorTarget | undefined][];
    links: [string, string, HTMLAttributeAnchorTarget | undefined][];
}) {
    return <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className={
                    cn(buttonVariants({variant: "link"}), "lg:text-button-m")
                }>Découvrir AirballCup</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className={`w-[400px] grid grid-rows-${nestedLinks.length} grid-cols-1`}>
                        {nestedLinks.map(([href, title, target]) => (
                            <li key={href}>
                                <NavigationMenuLink asChild>
                                    <Link prefetch className={cn(buttonVariants({ variant: "link" }))} title={title} target={target} href={href}>
                                        {title}
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            {links.map(([href, title, target], index) => (
                <NavigationMenuItem key={href}>
                    <NavigationMenuLink asChild>
                        <Link prefetch
                            title={title}
                            key={index}
                            onClick={target === undefined ? handleScrollToSection : undefined}
                            className={
                                cn(buttonVariants({variant: "link"}), "xl:text-button-m lg:text-[10px]")
                            }
                            target={target}
                            href={String(href)}>
                            {title}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>;
}

export default Header;