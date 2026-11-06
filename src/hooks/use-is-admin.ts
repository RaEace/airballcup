"use client";

import {useEffect, useState} from "react";

// Vrai si Payload renvoie un utilisateur connecté. Le contrôle d'accès réel reste côté serveur (server actions, /rankings/upload).
export function useIsAdmin(): boolean {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch("/api/users/me", {credentials: "include"})
            .then((res) => res.json())
            .then((data) => setIsAdmin(!!data?.user))
            .catch(() => {});
    }, []);

    return isAdmin;
}
