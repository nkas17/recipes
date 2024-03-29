import React from 'react';
import Header from '../components/common/Header';

function About() {
  return (
    <>
      <Header />
      <article className="py-2">
        <div className="jumbotron">
          <h2>about</h2>
          <hr />
          <p>
            this application will be very helpful for recipe management, planning meals and creating
            grocery lists. add, edit, delete recipes, create meal plans, create grocery lists based
            on meal plans, and create custom ingredient lists that can merge with meal grocery list
            to end with a full grocery list.
          </p>
          <p>
            written with care by <a href="http://nathanmweller.com/">nathan m weller</a>
          </p>
        </div>
      </article>
    </>
  );
}

export default About;
