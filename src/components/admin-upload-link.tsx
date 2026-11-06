"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {NavigationMenuLink} from "@/components/ui/navigation-menu.tsx";
import {buttonVariants} from "@/components/ui/button-variants";
import {cn} from "@/lib/utils.ts";

// Affiche le lien d'import seulement si Payload renvoie un utilisateur connecté.
// Le contrôle d'accès réel reste côté serveur (/rankings/upload et server actions).
export default function AdminUploadLink() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch("/api/users/me", {credentials: "include"})
            .then((res) => res.json())
            .then((data) => setIsAdmin(!!data?.user))
            .catch(() => setIsAdmin(false));
    }, []);

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
