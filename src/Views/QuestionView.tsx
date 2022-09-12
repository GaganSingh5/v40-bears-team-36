// import Footer from "Components/Footer/Footer";
// import Nav from "Components/Navbar/Nav";
import QuizUI from "Components/QuizUI";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CategoryContext } from "./ViewRouter";

const QuestionView = () => {
  const {value} = useContext(CategoryContext)
  const location = useLocation();
  
  return (
    <>
      {/* <Nav /> */}
      <QuizUI category={location.pathname.split('/')[2]} />
      {/* <Footer /> */}
    </>
  );
};

export default QuestionView;
