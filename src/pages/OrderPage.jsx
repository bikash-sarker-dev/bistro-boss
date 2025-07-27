import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ourOrderImg from "../assets/shop/banner2.jpg";
import Cover from "../components/cover/Cover";
import TabOrder from "../components/OurOder/TabOrder";
import useMenu from "../hooks/useMenu";

const OrderPage = () => {
  const category = ["salad", "pizza", "soups", "dessert", "drinks"];
  const cateParams = useParams();

  const initialIndex = category.indexOf(cateParams.category);

  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Cover
        title="OUR SHOP"
        subTitle="Would you like to try a dish?"
        coverImg={ourOrderImg}
      />
      <div className="container">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>soups</Tab>
            <Tab>dessert</Tab>
            <Tab>drinks</Tab>
          </TabList>
          <TabPanel>
            <TabOrder items={salad} />
          </TabPanel>
          <TabPanel>
            <TabOrder items={pizza} />
          </TabPanel>
          <TabPanel>
            <TabOrder items={soups} />
          </TabPanel>
          <TabPanel>
            <TabOrder items={dessert} />
          </TabPanel>
          <TabPanel>
            <TabOrder items={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderPage;
