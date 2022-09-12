import HeroView from "./HeroView";
import QuestionView from "./QuestionView";
import CategoryView from "./CategoryView";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "../index.css";
import React, { useState } from "react";
export const CategoryContext = React.createContext<any>({ value: undefined, setValue: () => {} })
const ViewRouter = () => {
  const [value, setValue] = useState(undefined);
  return (
    <CategoryContext.Provider value={{value, setValue}}>
      <CSSTransition classNames="alert" timeout={2000}>
        <Router>
          <Routes>
            <Route path="/" element={<HeroView />} />
            <Route path="/questions/:category" element={<QuestionView />} />
            <Route path="/categories" element={<CategoryView  />} />
          </Routes>
        </Router>
      </CSSTransition>
    </CategoryContext.Provider>
  );
};

export default ViewRouter;
