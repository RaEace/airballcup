import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import airballCup from "@/assets/logo.svg";
import creators from "@/assets/photos/arthur-et-romain.png";
import history1 from "@/assets/photos/photo-1-history.png";
import history2 from "@/assets/photos/photo-2-history.png";
import history3 from "@/assets/photos/photo-3-history.png";
import history4 from "@/assets/photos/photo-4-history.png";
import FloatingPicture from "@/components/floating-picture.tsx";

const History: FunctionComponent = () => {
    return <article id={"about"} className={"w-full min-h-full bg-gray-900 flex flex-col items-center pt-20 gap-6"}>
        <div className={"relative sm:w-1/2 z-10 flex flex-col items-center justify-start gap-4"}>
            <FloatingPicture floatingDirection={"right"} className={"absolute -z-10 -left-20 w-40"} src={history1}
                             alt={"Joueur 1"}/>
            <FloatingPicture floatingDirection={"left"} className={"absolute -z-10 -right-40 w-60"} src={history2}
                             alt={"Joueur 2"}/>
            <FloatingPicture floatingDirection={"right"}
                             className={"sm:absolute sm:block hidden -z-10 -left-60 top-60 w-60"} src={history3}
                             alt={"Joueur 2"}/>
            <FloatingPicture floatingDirection={"left"}
                             className={"sm:absolute sm:block hidden -z-10 -right-60 top-80 w-80"} src={history4}
                             alt={"Joueur 2"}/>

            <div className={"bg-primary-500 rounded-full p-4 rotate-12"}>
                <img className={"size-[90px]"} src={airballCup} alt="airball cup logo"/>
            </div>
            <Badge className={"uppercase font-display"}>
                🍻 L’aventure air ball CUP
            </Badge>
            <h2 className={"font-display text-title-s-extrabold uppercase w-full text-center"}>
                Du beau Beer Pong <span className={"text-secondary-500"}>à Paris</span><br/>
                Par des passionnés de <span className={"text-secondary-500"}>Beer Pong</span>
            </h2>
        </div>
        <p className={"z-10 text-center font-text text-text-s-light px-6 sm:w-1/2 sm:px-auto tracking-wide"}>
            Nous rentrions d’un Erasmus endiablé dans le pays de la Full Moon, la Thaïlande. On y a vécu des choses
            qu’on ne vous racontera pas, mais on peut au moins vous raconter le Beer Pong. C’est une histoire qui se
            vit, qui se ressent désormais dans la Airball Cup, <b>le tournoi qu’on a créé à Paris</b>. <br/><br/>

            De retour à la capitale, on s'est rendu compte qu'aucun bar n'accueillait cette chalereuse ambiance, où Beer
            Pong et challenges battent leur plein. De là est née la Air Ball Cup, au plus grand plaisir d'une <b>jolie
            communauté de joueurs</b> qui deviennent petit à petit nos amis. Un vrai bonheur. <br/><br/>

            La Airball Cup, c’est une rencontre mensuelle qui se déroule au <b>bar Belushi’s Canal</b>, le partenaire
            qui nous
            accompagne depuis Septembre 2023. On a choisi ce lieu le long du canal Saint-Martin, avec ses néons colorés,
            son équipe internationale (adorable) et sa fréquentation de voyageurs. <br/><br/>

            Tout le monde est le bienvenu, c’est tout niveau. Allez, à très bientôt !

            Au fait, nous c’est <b>Arthur et Romain</b> ;)
        </p>
        <div className="relative z-10">
            <img
                className="block w-full shadow-2xl"
                src={creators}
                alt="Arthur et romain, les beaux créateurs d'Airball Cup"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
    </article>;
};


export default History;