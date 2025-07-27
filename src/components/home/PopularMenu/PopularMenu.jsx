import React from "react";
import useMenu from "../../../hooks/useMenu";
import SectionHead from "../../header/sectionHead/SectionHead";
import CardPopular from "./CardPopular";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  // const [popular, setPopular] = useState([]);

  // useEffect(() => {
  //   axios.get("./menu.json").then(({ data }) => {
  //     let popularFilter = data.filter((item) => item.category === "popular");
  //     setPopular(popularFilter);
  //   });
  // }, []);

  return (
    <section className="container">
      <SectionHead heading="FROM OUR MENU" subHeading="---Check it out---" />
      <div className="grid md:grid-cols-2 gap-5">
        {popular.map((popularItem) => (
          <CardPopular key={popularItem._id} popularItem={popularItem} />
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
