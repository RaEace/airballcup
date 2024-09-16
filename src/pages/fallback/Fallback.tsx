import airballCupLogo from "@/assets/logo.svg";

const Fallback: React.FunctionComponent = () => {
  return (
      <div className={"flex h-screen justify-center items-center"}>
        <img className={"w-52 animate-bounce"} src={airballCupLogo} alt="Airball cup logo"/>
      </div>
  );
};

export default Fallback;
