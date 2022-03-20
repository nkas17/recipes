import React from 'react';
import Header from '../components/common/Header';

/**
 * List of meals
 */
function MealList() {
  return (
    <>
      <Header />
      <article className="py-2">
        <div className="jumbotron">
          <header className="row">
            <div className="col">
              <h2>meals</h2>
            </div>
          </header>
        </div>
      </article>
    </>
  );
}

export default MealList;
