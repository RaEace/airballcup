import { FormattedMessage } from "react-intl";
import InformativeTag from "../../components/informativeTag/InformativeTag";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <InformativeTag
        text="Prochain tournoi: 4 septembre"
        icon="../../assets/logo/dot.png"
      />
      <h1>
        <FormattedMessage id="homeTitle" />
      </h1>
      <button className="entry-button">JE M'INSCRIS</button>
    </div>
  );
};

export default Home;
