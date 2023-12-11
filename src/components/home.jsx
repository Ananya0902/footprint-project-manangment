import React from 'react';
import '../styles/home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (<>
  
    <div className="homeclass" id="home">
      <main>
        <h1>WELCOME TO FOOTPRINT</h1>
        <p>A project management website...</p>
        <Link to="/learn">
          <button>learn more</button>
        </Link>
      </main>
    </div>
    <div className="homeclass1" id="about">
      <h2>About Us</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, tenetur porro! Odit recusandae sapiente ut, fuga temporibus veritatis nesciunt? Quam minus amet doloribus perspiciatis magnam, magni excepturi voluptatem iure molestiae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, cum impedit quasi recusandae perferendis numquam, commodi cumque alias omnis molestias aliquam odio dolorum ad illo laboriosam doloremque unde deserunt. Architecto.</p>
    </div>
    </>
  );
}

export default Home;
