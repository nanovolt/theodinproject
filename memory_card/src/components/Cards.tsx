import "./cards.css";
import { Image } from "../types/card-types";
import { useRandomImages } from "../hooks/useRandomImages";
import { Card } from "./Card";

type CardProps = {
  imageArray: Image[];
  setImageArray: React.Dispatch<React.SetStateAction<Image[]>>;
  handleCardClick: (id: string) => void;
};

export default function Cards({
  imageArray,
  setImageArray,
  handleCardClick,
}: CardProps) {
  // const setter = (arr: Image[]) => setImageArray(arr);
  const { isLoading, isError, errorMessage } = useRandomImages(setImageArray);

  // setImageArray(images);
  // console.log(images);

  // if (!response) {
  //   return <div>Loading...</div>;
  // } else if (response.errors) {
  //   return (
  //     <div>
  //       <div>{response.errors[0]}</div>
  //       <div>PS: Make sure to set your access token!</div>
  //     </div>
  //   );
  // } else {

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cards">
      <ul className="image-list">
        {/* <li className="card" onClick={() => handleCardClick(0)}></li>
        <li className="card" onClick={() => handleCardClick(1)}></li>
        <li className="card" onClick={() => handleCardClick(2)}></li>
        <li className="card" onClick={() => handleCardClick(3)}></li>
        <li className="card" onClick={() => handleCardClick(4)}></li> */}

        {imageArray.map((image: Image) => (
          <li
            key={image.id}
            className="card"
            onClick={() => handleCardClick(image.id)}>
            <Card image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
}
