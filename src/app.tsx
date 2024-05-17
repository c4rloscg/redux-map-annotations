import "./styles/app.css";
import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import Map from "./components/map/map";
import AddMenu from "./components/menu/addMenu";
import FilterMenu from "./components/menu/filterMenu";

function App() {
  return (
    <Provider store={store}>
      <div className="relative">
        <Map />
        <div className="absolute top-4 left-4 flex gap-2">
          <AddMenu />
          <FilterMenu />
        </div>
      </div>
    </Provider>
  );
}

export default App;
