import {FunctionComponent, MouseEventHandler} from "react";
import airballCupLogo from "@/assets/logo.svg";
import {AlignJustify} from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import {cn} from "@/lib/utils.ts";

const Header: FunctionComponent = () => {
    const links = [["#about", "Notre histoire"], ["#participate", "Comment participer"], ["#cost", "Tarifs et récomponses"], ["#champions", "Gallerie des champions"]];

    const handleScrollToSection: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();

        const target = event.currentTarget.getAttribute("href");
        if (!target) return;

        const targetId = target.substring(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        targetElement.scrollIntoView({ behavior: "smooth" });
    }

    function BurgerMenu() {
        return <Sheet>
            <SheetTrigger>
                <button className={"bg-white rounded-full p-2"}>
                    <AlignJustify color={"#0C0C0F"}/>
                </button>
            </SheetTrigger>
            <SheetContent className={"z-[200] bg-gray-900"}>
                <SheetHeader>
                    <SheetTitle className={"font-display uppercase text-2xl text-white"}>
                        Menu
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription className={"h-full flex flex-col items-center gap-3 mt-10"}>
                    <ArrowButton className={"ml-4 p-6"} variant={"invertedPrimary"}>
                        <a href="register">Je m'inscris</a>
                    </ArrowButton>
                    { links.map(([href, title]) => (
                        <SheetClose asChild>
                            <Button variant={"link"} asChild>
                                <a href={href} onClick={handleScrollToSection} className={"text-xl"}>
                                    {title}
                                </a>
                            </Button>
                        </SheetClose>
                    ))}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    }

    return <header
        className={"absolute top-0 font-display uppercase z-[100] px-6 flex items-center justify-between w-full h-[104px] bg-transparent"}>
        <a href="/">
            <img src={airballCupLogo} alt="logo airball cup"/>
        </a>

        <div className={"hidden lg:block"}>
            { links.map(([href, title]) => (
                <a href={href} onClick={handleScrollToSection}
                   className={cn(buttonVariants({variant: "link"}), "text-xl")}>
                    {title}
                </a>
            ))}
            <ArrowButton className={"ml-4 p-6"} variant={"invertedPrimary"}>
                Je m'inscris
            </ArrowButton>
        </div>
        <div className={"lg:hidden"}>
            <BurgerMenu/>
        </div>
    </header>
}

export default Header;