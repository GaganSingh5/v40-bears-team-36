import React, { useContext } from 'react';
import CategoryCard from './CategoryCard'
import "./categoryCard.scss";

const QuestionCategories = [
  {
    categoryName: "Linux",
    categoryValue: "Linux",
    categoryClass: "devicon-linux-plain",
  },
  {
    categoryName: "SQL",
    categoryValue: "SQL",
    categoryClass: "devicon-mysql-plain",
  },

];

const colors = ["1", "2", "3", "4", "5"];
function Category() {
  return (
    <section className="category--conatiner container">
      <div className="row d-flex justify-content-center mb-2">
        <h3 className='category__header text-center'>Choose a Category</h3>
      </div>
      <div className="row">
        {QuestionCategories.map(
          ({ categoryName, categoryValue, categoryClass },index) => {
            return (
              <CategoryCard
                bgColor={colors[index] ? colors[index] : "8e90f1"}
                setCategory={categoryValue}
                key={categoryValue}
                header={categoryName}
                value={categoryValue}
                iconClass={categoryClass}
              />
            );
          }
        )}
        <h3 className="category__soon text-center py-4">More categories coming soon!!</h3>
      </div>
    </section>
  );
}

export default Category
