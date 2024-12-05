import notFound from "@/assets/404.gif";
import {Button} from "@/components/ui/button.tsx";
import {Home} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RouteError = () => {
  return (
    <div id="error-page" className={"px-20 py-40 text-center w-full h-full flex flex-col items-center justify-center gap-4"}>
      <h1 className={"font-display font-bold lg:text-display-l text-display-s"}>
        404
      </h1>
      <p className={"font-text lg:text-title-l md:text-title-m text-title-s"}>
        Ouups, la page que vous cherchez n'existe pas
      </p>
      <Image src={notFound.src} alt={"404 NOT FOUND"} width={200} height={200} />
      <Button name={"back-home"} role={"link"} size={"lg"} variant={"primary"} asChild>
          <Link href={"/"}>
              <Home className={"size-4"} />
          </Link>
      </Button>
    </div>
  );
};

export default RouteError;
