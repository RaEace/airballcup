import { FunctionComponent } from "react";
import airballCupLogo from "@/assets/Logo.png";
import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import ArrowButton from "@/components/arrow-button.tsx";

const Header: FunctionComponent = () => {
  const links = [
    ["#about", "Notre histoire"],
    ["#participate", "Comment participer"],
    ["#cost", "Tarifs et récomponses"],
    ["#champions", "Gallerie des champions"],
  ];

  function BurgerMenu() {
    return (
      <Sheet>
        <SheetTrigger>
          <button className={"bg-white rounded-full p-2"}>
            <AlignJustify color={"#0C0C0F"} />
          </button>
        </SheetTrigger>
        <SheetContent className={"z-[200] bg-gray-900"}>
          <SheetHeader>
            <SheetTitle
              className={"font-display uppercase text-2xl text-white"}
            >
              Menu
            </SheetTitle>
          </SheetHeader>
          <SheetDescription
            className={"h-full flex flex-col items-center gap-3 mt-10"}
          >
            <ArrowButton className={"ml-4 p-6"} variant={"invertedPrimary"}>
              <a href="register">Je m'inscris</a>
            </ArrowButton>
            {links.map(([href, title]) => (
              <SheetClose asChild>
                <Button variant={"link"} asChild>
                  <a href={href} className={"text-xl"}>
                    {title}
                  </a>
                </Button>
              </SheetClose>
            ))}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <header
      className={
        "absolute top-0 font-display uppercase z-[100] px-6 flex items-center justify-between w-full h-[104px] bg-transparent"
      }
    >
      <a href="/">
        <img src={airballCupLogo} alt="logo airball cup" />
      </a>

      <div className={"hidden lg:block"}>
        {links.map(([href, title]) => (
          <Button variant={"link"} asChild key={href}>
            <a href={href} className={"text-xl"}>
              {title}
            </a>
          </Button>
        ))}
        <ArrowButton className={"ml-4 p-6"} variant={"invertedPrimary"}>
          Je m'inscris
        </ArrowButton>
      </div>
      <div className={"lg:hidden"}>
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
