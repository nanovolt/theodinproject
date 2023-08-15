// import { useParams } from "react-router-dom";
// import { useProducts } from "./Shop";
// import { Card } from "./Card";
// import styles from "./Products.module.scss";

// function makeReadableCategoryName(category: string) {
//   const first = category.split("-")[0][0].toUpperCase();
//   const rest = category.split("-").slice(1);

//   // console.log("first:", first);
//   // console.log("rest:", rest);
//   // console.log("result:", first + category.split("-")[0].slice(1) + " " + rest);

//   if (rest.length === 0) {
//     return first + category.split("-")[0].slice(1);
//   }
//   return first + category.split("-")[0].slice(1) + " " + rest;
// }

// export function Products() {
//   const { category } = useParams();
//   const { all, mensClothing, womensClothing, jewelery, electronics } =
//     useProducts();

//   // console.log(all);
//   // console.log(mensClothing);
//   // console.log(womensClothing);
//   // console.log(jewelery);
//   // console.log(electronics);

//   let categoryName;
//   let data;
//   if (category) {
//     categoryName = makeReadableCategoryName(category);

//     // console.log("categoryName:", categoryName);
//     // console.log("is Men's clothing", categoryName === "Men's clothing");
//     // console.log("is Women's clothing", categoryName === "Women's clothing");
//     // console.log("is Jewelery", categoryName === "Jewelery");
//     // console.log("is Electronics", categoryName === "Electronics");

//     switch (categoryName) {
//       case "All":
//         data = all;
//         break;
//       case "Men's clothing":
//         data = mensClothing;
//         break;
//       case "Women's clothing":
//         data = womensClothing;
//         break;
//       case "Jewelery":
//         data = jewelery;
//         break;
//       case "Electronics":
//         data = electronics;
//         break;
//       default:
//         break;
//     }
//     // if (categoryName === "Men's clothing") {
//     //   data = mensClothing;
//     // } else if (categoryName === "Women's clothing") {
//     //   data = womensClothing;
//     // } else if (categoryName === "Jewelery") {
//     //   data = jewelery;
//     //   console.log("jew");
//     // } else {
//     //   data = electronics;
//     // }

//     // data = categoryName === "Men's clothing" ? mensClothing : null;
//     // data = categoryName === "Women's clothing" ? womensClothing : null;
//     // data = categoryName === "Jewelery" ? jewelery : null;
//     // data = categoryName === "Electronics" ? electronics : null;

//     // console.log(data);
//   } else {
//     data = all;
//   }

//   return (
//     <section className={styles.products}>
//       <h2>{category ? categoryName : "All"}</h2>
//       {/* <div>{category ? categoryName : "All"}</div> */}

//       <div className={styles.cards}>
//         {data &&
//           data?.map((item) => {
//             // console.log(item);
//             return (
//               <Card
//                 key={item.id}
//                 id={item.id}
//                 title={item.title}
//                 price={item.price}
//                 image={item.image}
//               />
//             );
//           })}
//       </div>
//     </section>
//   );
// }

export function a() {}
