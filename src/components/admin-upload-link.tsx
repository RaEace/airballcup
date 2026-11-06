"use client";

import Link from "next/link";
import {NavigationMenuLink} from "@/components/ui/navigation-menu.tsx";
import {buttonVariants} from "@/components/ui/button-variants";
import {cn} from "@/lib/utils.ts";
import {useIsAdmin} from "@/hooks/use-is-admin.ts";

// Affiche le lien d'import seulement pour l'admin connecté.
export default function AdminUploadLink() {
    const isAdmin = useIsAdmin();

    if (!isAdmin) return null;

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link prefetch className={cn(buttonVariants({variant: "link"}), "text-primary-500")}
                      href={"/rankings/upload"}>
                    Importer un classement
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
