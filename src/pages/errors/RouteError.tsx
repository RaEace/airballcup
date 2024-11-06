import {FormattedMessage} from "react-intl";
import {useNavigate, useRouteError} from "react-router-dom";
import notFound from "@/assets/404.gif";
import {Button} from "@/components/ui/button.tsx";
import {Home} from "lucide-react";

interface RouteError {
  data: string;
  error: {
    columnNumber: number;
    fileName: string;
    lineNumber: number;
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

const RouteError = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div id="error-page" className={"px-20 py-40 text-center w-full h-full flex flex-col items-center justify-center gap-4"}>
      <h1 className={"font-display font-bold lg:text-display-l text-display-s"}>
        <FormattedMessage id="errorPageTitle" />
      </h1>
      <p className={"font-text lg:text-title-l md:text-title-m text-title-s"}>
        <FormattedMessage id="errorPageMessage" />
      </p>
      <p>
        {error.status} {error.statusText}
      </p>
      <img src={notFound} alt={"404 NOT FOUND"}/>
      <Button name={"back-home"} role={"link"} onClick={() => {
          navigate("/");
      }} size={"lg"} variant={"primary"}><Home className={"size-4"} /></Button>
    </div>
  );
};

export default RouteError;
