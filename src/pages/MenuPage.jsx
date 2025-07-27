import React from "react";
import menuImg from "../assets/menu/banner3.jpg";
import dessertImg from "../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../assets/menu/pizza-bg.jpg";
import saladImg from "../assets/menu/salad-bg.jpg";
import soupsImg from "../assets/menu/soup-bg.jpg";
import Cover from "../components/cover/Cover";
import SectionHead from "../components/header/sectionHead/SectionHead";
import MenuCategory from "../components/Menu/MenuCategory/MenuCategory";
import TopTitle from "../components/TapTitle/TopTitle";
import useMenu from "../hooks/useMenu";

const MenuPage = () => {
  const [menu] = useMenu();
  console.log("menu kaj krce nah", menu);
  const dessert = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soups");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <TopTitle title="Bistro Boss | Menu" />
      <Cover
        coverImg={menuImg}
        title={"OUR MENU"}
        subTitle="Would you like to try a dish?"
      />

      <SectionHead heading="TODAY'S OFFER" subHeading="---Don't miss---" />

      {/* <MenuCategory items={offered} title={"offered"} /> */}
      <MenuCategory
        items={dessert}
        title={"dessert"}
        description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        coverImg={dessertImg}
      />
      <MenuCategory
        items={pizza}
        title={"pizza"}
        description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        coverImg={pizzaImg}
      />
      <MenuCategory
        items={salad}
        title={"salads"}
        description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        coverImg={saladImg}
      />
      <MenuCategory
        items={soups}
        title={"soups"}
        description="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        coverImg={soupsImg}
      />
    </div>
  );
};

export default MenuPage;
