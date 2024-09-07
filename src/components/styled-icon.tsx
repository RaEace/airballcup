import {FunctionComponent, ReactNode} from "react";

interface StyledIconProps {
    children: ReactNode;
}

const StyledIcon: FunctionComponent<StyledIconProps> = ({children}) => {
    return (<div className={"rounded-full bg-gray-900 border border-[#414147] p-4 flex items-center justify-center"}>
        { children }
    </div>);
}

export default StyledIcon;