import svgLogo from '@/assets/logo.svg';
import {ReactElement} from "react";

function Logo(): ReactElement {
    return <img width={130} height={130} src={svgLogo.src} alt={"Airball Cup Logo"} className={"w-32 h-32"}/>;
}

export default Logo;