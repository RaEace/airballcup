import {PropsWithChildren} from "react";
import {IntlProvider} from "react-intl";
import messages from "../intl/messages";

function getLocaleMessage(locale: string) {
  if (messages[locale]) {
    return messages[locale];
  }

  return messages.fr;
}

const IntlStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const locale = "fr";
  const localeMessages = getLocaleMessage(locale);

  return (
    <IntlProvider locale={locale} messages={localeMessages}>
      {children}
    </IntlProvider>
  );
};

export default IntlStoreProvider;
