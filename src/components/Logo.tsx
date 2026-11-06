import svgLogo from '@/assets/logo.webp';
import {ReactElement} from "react";

function Logo(): ReactElement {
    return <img width={130} height={130} src={svgLogo.src} alt={"Airball Cup Logo"} className={"w-32 h-32 object-contain"}/>;
}

export default Logo;