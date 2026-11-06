"use client";

import airballCupLogo from "@/assets/logo.webp";

const Fallback: React.FunctionComponent = () => {
  return (
      <div className={"flex min-h-svh justify-center items-center"}>
        <img className={"w-52 animate-bounce"} src={airballCupLogo.src} alt="Airball cup logo"/>
      </div>
  );
};

export default Fallback;
