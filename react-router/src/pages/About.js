import { Link } from "react-router-dom";

const About = () => {
   return (
      <section>
         <h1>About Page</h1>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sunt velit dignissimos deserunt tempora officiis quod
            optio labore et recusandae deleniti saepe dolores alias necessitatibus non facere quibusdam porro nesciunt accusantium
            natus, sequi perferendis eligendi ullam repellat. Ipsum eum, tempora architecto cupiditate tenetur, excepturi
            consequatur suscipit odit voluptatem, event anim!
         </p>
         <Link to='/contactUs'>Contact Us</Link>
      </section>
   );
};

export default About;
