import { FormattedMessage } from "react-intl";
import { useRouteError } from "react-router-dom";

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

  return (
    <div id="error-page">
      <h1>
        <FormattedMessage id="errorPageTitle" />
      </h1>
      <p>
        <FormattedMessage id="errorPageMessage" />
      </p>
      <p>
        <i>{error.statusText || error.error.message}</i>
      </p>
    </div>
  );
};

export default RouteError;
