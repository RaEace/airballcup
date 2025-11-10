"use client";

import {type FunctionComponent, type HTMLAttributeAnchorTarget, useEffect, useState,} from "react";
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
    SheetTrigger,
} from "@/components/ui/sheet.tsx";
import {cn, handleScrollToSection} from "@/lib/utils.ts";
import useInView from "@/hooks/use-in-view.ts";
import {usePathname} from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx";
import Link from "next/link";
import type {Season} from "@/payload-types.ts";

interface NavLink {
    href: string;
    title: string;
    target?: HTMLAttributeAnchorTarget;
    isNested?: boolean;
}

const Header: FunctionComponent<{
    signupUrl: string;
    availableRankings?: Season[];
    isLoggedIn?: boolean;
}> = ({
          signupUrl: CURRENT_SIGNUP_URL,
          availableRankings = [],
      }) => {
    const [showStickyBtn, setShowStickyBtn] = useState<boolean>(false);
    const [isRankingsLoading, setIsRankingsLoading] = useState<boolean>(false);
    const pathname = usePathname();
    const slug = pathname === "/" ? "" : "/";

    const links: NavLink[] = [
        {href: slug + "#about", title: "Notre histoire", target: "_self", isNested: true},
        {href: slug + "#participate", title: "Comment participer", target: "_self", isNested: true},
        {href: slug + "#cost", title: "Tarifs et récompenses", target: "_self", isNested: true},
        {href: slug + "#champions", title: "Galerie des champions", target: "_self", isNested: true},
        {href: "https://www.instagram.com/airballcup", title: "Instagram", target: "_blank", isNested: false},
    ];

    const navigationMenuLinks = links.filter(link => link.isNested);
    const otherLinks = links.filter(link => !link.isNested);

    const hiddenSections = ["cta", "tournament-info", "participate", null];
    const sectionsToObserve = [
        "cta",
        "about",
        "participate",
        "cost",
        "champions",
        "rules",
        "gallery",
        "tournament-info",
    ];
    const inView = useInView(sectionsToObserve);

    useEffect(() => {
        if (hiddenSections.includes(inView)) {
            setShowStickyBtn(false);
        } else {
            setShowStickyBtn(true);
        }
    }, [inView]);

    useEffect(() => {
        if (availableRankings.length === 0) {
            setIsRankingsLoading(true);
        } else {
            setIsRankingsLoading(false);
        }
    }, [availableRankings]);

    function InnerBurgerMenu() {
        return (
            <Sheet>
                <SheetTrigger>
                    <div
                        role={"button"}
                        className={cn(buttonVariants({variant: "outline", size: "icon"}))}
                    >
                        <AlignJustifyIcon/>
                    </div>
                </SheetTrigger>
                <SheetContent side={"full"} className={"z-[101] bg-gray-950"}>
                    <SheetTitle>
                        <SheetClose>
                            <a className={cn(buttonVariants({variant: "link"}))} href="/">
                                <img
                                    src={airballCupLogo.src || "/placeholder.svg"}
                                    alt="AirballCup Logo"
                                />
                            </a>
                        </SheetClose>
                    </SheetTitle>
                    <SheetDescription className={"mt-10"}>
                        <div role={"navigation"} className={"flex flex-col items-start"}>
                            {links.map((link) => (
                                <SheetClose key={link.href}>
                                    <Link
                                        prefetch
                                        title={link.title}
                                        target={link.target}
                                        className={cn(
                                            buttonVariants({variant: "link"}),
                                            "group font-display font-bold text-title-m"
                                        )}
                                        href={link.href}
                                    >
                                        <ArrowRight
                                            color={"#E51C21"}
                                            className={
                                                "smooth mr-2 mb-1 sm:size-10 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out transform translate-x-2"
                                            }
                                        />
                                        {link.title}
                                    </Link>
                                </SheetClose>
                            ))}

                            {isRankingsLoading ? (
                                <div
                                    className={cn(
                                        buttonVariants({variant: "link"}),
                                        "font-display font-bold text-title-m"
                                    )}
                                >
                                    Chargement...
                                </div>
                            ) : (
                                availableRankings.length > 0 &&
                                availableRankings.map((season) => (
                                    <SheetClose key={season.id}>
                                        <Link
                                            prefetch
                                            title={`Classement ${season.name}`}
                                            className={cn(
                                                buttonVariants({variant: "link"}),
                                                "group font-display font-bold text-title-m"
                                            )}
                                            href={`/rankings/${season.id}`}
                                        >
                                            <ArrowRight
                                                color={"#E51C21"}
                                                className={
                                                    "smooth mr-2 mb-1 sm:size-10 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out transform translate-x-2"
                                                }
                                            />
                                            Classement {season.name}
                                        </Link>
                                    </SheetClose>
                                ))
                            )}
                        </div>
                    </SheetDescription>
                    <SheetFooter className={"mt-10"}>
                        <Link href={CURRENT_SIGNUP_URL}>
                            <ArrowButton
                                name={"register-header"}
                                role={"link"}
                                size={"sm"}
                                iconPlacement={"right"}
                                className={"w-48 mr-4 py-6 px-8 ml-16"}
                                variant={"primary"}
                            >
                                Je m'inscris
                            </ArrowButton>
                        </Link>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <header
            className={
                "absolute backdrop-blur-[2px] font-display uppercase z-[100] px-6 flex items-center justify-between w-full h-[104px] bg-transparent"
            }
        >
            <Link prefetch title={"back-home-link"} href="/">
                <img
                    src={airballCupLogo.src || "/placeholder.svg"}
                    alt="logo airball cup"
                />
            </Link>

            <div className={"hidden lg:flex lg:items-center"}>
                <Navbar
                    availableRankings={availableRankings}
                    nestedLinks={navigationMenuLinks}
                    links={otherLinks}
                    isRankingsLoading={isRankingsLoading}
                />
                <Link href={CURRENT_SIGNUP_URL} target={"_blank"}>
                    <Button
                        name={"register-header-main"}
                        role={"link"}
                        size={"sm"}
                        variant={"invertedPrimary"}
                    >
                        Je m'inscris <ArrowRight className={"ml-2 mb-1 size-6"}/>
                    </Button>
                </Link>
            </div>
            <div className={"lg:hidden flex items-center justify-center space-x-4"}>
                <Link href={CURRENT_SIGNUP_URL} target={"_blank"}>
                    <Button
                        role={"link"}
                        name={
                            "register-header-mobile-" +
                            (showStickyBtn ? "visible" : "invisible")
                        }
                        size={"sm"}
                        variant={"primary"}
                        disabled={!showStickyBtn}
                        className={cn(
                            "smooth transition",
                            {"invisible animate-easeOut": !showStickyBtn},
                            {"animate-easeIn": showStickyBtn}
                        )}
                    >
                        Je m'inscris
                    </Button>
                </Link>
                <InnerBurgerMenu/>
            </div>
        </header>
    );
};

function Navbar({
                    nestedLinks,
                    links,
                    availableRankings,
                    isRankingsLoading,
                }: {
    nestedLinks: NavLink[];
    links: NavLink[];
    availableRankings?: Season[];
    isRankingsLoading?: boolean;
}) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={cn(
                            buttonVariants({variant: "link"}),
                            "lg:text-button-m"
                        )}
                    >
                        Découvrir AirballCup
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul
                            className={`w-[400px] grid grid-rows-${nestedLinks.length} grid-cols-1`}
                        >
                            {nestedLinks.map((link) => (
                                <li key={link.href}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            prefetch
                                            className={cn(buttonVariants({variant: "link"}))}
                                            title={link.title}
                                            target={link.target}
                                            href={link.href}
                                        >
                                            {link.title}
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={cn(
                            buttonVariants({variant: "link"}),
                            "lg:text-button-m"
                        )}
                        disabled={isRankingsLoading}
                    >
                        {isRankingsLoading ? "Chargement..." : "Classement"}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {availableRankings && availableRankings.length > 0 ? (
                            <ul
                                className={`w-[400px] grid grid-rows-${availableRankings.length} grid-cols-1`}
                            >
                                {availableRankings.map((season) => (
                                    <li key={season.id}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                prefetch
                                                className={cn(buttonVariants({variant: "link"}))}
                                                title={`Classement ${season.name}`}
                                                href={`/rankings/${season.id}`}
                                            >
                                                Classement {season.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="w-[400px] p-4 text-center">
                                {isRankingsLoading
                                    ? "Chargement des classements..."
                                    : "Aucun classement disponible"}
                            </div>
                        )}
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {links.map((link) => (
                    <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink asChild>
                            <Link
                                prefetch
                                title={link.title}
                                onClick={
                                    link.target === undefined ? handleScrollToSection : undefined
                                }
                                className={cn(
                                    buttonVariants({variant: "link"}),
                                    "xl:text-button-m lg:text-[10px]"
                                )}
                                target={link.target}
                                href={link.href}
                            >
                                {link.title}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Header;