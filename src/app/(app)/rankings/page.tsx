import {redirect} from "next/navigation";

export default async function Page() {
    redirect(`/rankings/${new Date().getFullYear()}`);
}