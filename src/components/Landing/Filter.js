import React, { useEffect, useState } from "react";
import categories from "../../resources/categories";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function ScrollableTabsButtonAuto({ setQuery }) {
  const newCategories = ["all", ...categories];
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (newCategories[value] === "all") setQuery({});
    else setQuery({ category: newCategories[value] });
    // eslint-disable-next-line
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          //   variant="scrollable"
          //   scrollButtons="auto"
          centered
        >
          {newCategories.map((category, index) => {
            return <Tab label={category} key={category} />;
          })}
        </Tabs>
      </AppBar>
    </div>
  );
}
