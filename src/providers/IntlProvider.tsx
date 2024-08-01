import { useStoreState } from "easy-peasy";
import { PropsWithChildren } from "react";
import { StoreModel } from "../store/type";
import { IntlProvider } from "react-intl";
import messages from "../intl/messages";

function getLocaleMessage(locale: string) {
  if (messages[locale]) {
    return messages[locale];
  } else return messages.fr;
}

const IntlStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const locale = useStoreState((state: StoreModel) => state.locale);
  const localeMessages = getLocaleMessage(locale);

  return (
    <IntlProvider locale={locale} messages={localeMessages}>
      {children}
    </IntlProvider>
  );
};

export default IntlStoreProvider;
