// import styles from "./CartItem.module.scss";
// import { CartItemType } from "../types/types";
// import { Button } from "./Button";
// import { Product } from "./Shop";

// export default function CartItem({
//   item,
//   addCartItem,
//   removeCartItem,
//   deleteCartItem,
// }: {
//   item: CartItemType;
//   addCartItem: (item: CartItemType) => void;
//   removeCartItem: (item: CartItemType) => void;
//   deleteCartItem: (item: CartItemType) => void;
// }) {
//   return (
//     <div key={item.id} className={styles.item}>
//       <div className={styles.imageBox}>
//         <img className={styles.image} src={item.image} alt="" />
//       </div>
//       <div className={styles.title}>{item.title}</div>
//       <div className={styles.price}>
//         <div>Price</div>
//         <div>$ {item.price}</div>
//       </div>
//       <div className={styles.total}>
//         <div>Total</div>
//         <div>$ {item.total}</div>
//       </div>
//       <div className={styles.controls}>
//         <Button
//           disabled={item.amount <= 1}
//           onClick={() => {
//             removeCartItem(item);
//           }}>
//           -
//         </Button>
//         <div className={styles.amount}>{item.amount}</div>
//         <Button
//           disabled={item.amount >= 10}
//           onClick={() => {
//             addCartItem(item);
//           }}>
//           +
//         </Button>
//       </div>

//       <div className={styles.delete}>
//         <Button
//           style={{ backgroundColor: "#fb2d2d" }}
//           onClick={() => deleteCartItem(item)}>
//           Delete X
//         </Button>
//       </div>
//     </div>
//   );
// }

export function a() {}
