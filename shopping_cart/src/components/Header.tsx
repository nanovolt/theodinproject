// import { Link } from "react-router-dom";
// import styles from "./Header.module.scss";
// import { CartButton } from "./CartButton";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// import classNames from "classnames";
// import { useContext } from "react";
// import { DarkModeContext } from "../context/DarkModeContext";

// type Props = {
//   handleDarkModeToggle: () => void;
// };

// export function Header({ handleDarkModeToggle }: Props) {
//   const { mode } = useContext(DarkModeContext);

//   const cn = classNames("fa-2x", styles.toggleIcon);
//   return (
//     <div className={styles.wrapper}>
//       <header>
//         <nav className={styles.nav}>
//           <ul>
//             <li>
//               <Link to="/theodinproject/shopping_cart">Home</Link>
//             </li>
//             <li>
//               <Link to="/theodinproject/shopping_cart/shop/all">Shop</Link>
//             </li>
//             <li>
//               <Link to="/theodinproject/shopping_cart/about">About</Link>
//             </li>
//           </ul>
//         </nav>
//         <CartButton />

//         <button
//           onClick={handleDarkModeToggle}
//           className={styles.darkModeToggle}
//           data-testid="darkModeToggle">
//           {mode === "light" ? (
//             <FontAwesomeIcon icon={faMoon} className={cn} />
//           ) : (
//             <FontAwesomeIcon icon={faSun} className={cn} />
//           )}
//         </button>
//       </header>
//     </div>
//   );
// }

export function a() {}
