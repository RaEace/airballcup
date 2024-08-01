import { useStoreState } from "easy-peasy";
import { PropsWithChildren } from "react";
import { StoreModel } from "../store/type";
import { IntlProvider } from "react-intl";

const IntlStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const locale = useStoreState((state: StoreModel) => state.locale);

  return <IntlProvider locale={locale}>{children}</IntlProvider>;
};

export default IntlStoreProvider;
