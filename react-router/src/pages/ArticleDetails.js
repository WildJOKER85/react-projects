import { useParams } from "react-router-dom";

const ArticleDetails = () => {
   const params = useParams();

   return (
      <div>
         <h1>Article Details</h1>
         {params.articleId}
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sunt velit dignissimos deserunt tempora officiis quod
            optio labore et recusandae deleniti saepe dolores alias necessitatibus non facere quibusdam porro nesciunt accusantium
            natus, sequi perferendis eligendi ullam repellat. Ipsum eum, tempora architecto cupiditate tenetur, excepturi
            consequatur suscipit odit voluptatem, event anim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sunt velit dignissimos deserunt tempora officiis quod
            optio labore et recusandae deleniti saepe dolores alias necessitatibus non facere quibusdam porro nesciunt accusantium
            natus, sequi perferendis eligendi ullam repellat. Ipsum eum, tempora architecto cupiditate tenetur, excepturi
            consequatur suscipit odit voluptatem, event anim!
         </p>
      </div>
   );
};

export default ArticleDetails;
