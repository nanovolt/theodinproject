import {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import "./cards.css";
import { createApi } from "unsplash-js";

type Props = {
  children?: ReactNode;
  arr: any[];
  setArr: (arg: any[]) => void;
};

type Image = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

const api = createApi({
  accessKey: "ZvjPrpnGU2n1I4MzP23YQqXIeRzCHQbOwCMcHHFpjH8",
});

function Card({ image }: { image: Image }) {
  const { user, urls } = image;

  return (
    <div className="image-box">
      <img className="img" alt="" src={urls.regular} />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
        rel="noreferrer">
        {user.name}
      </a>
    </div>
  );
}

export default function Cards({ children, arr, setArr }: Props) {
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    api.photos
      .getRandom({ query: "car", count: 10 })
      .then((result) => {
        setResponse(result);
        console.log(result);
        console.log("response", result.response);
        if (result.response) {
          setArr(result.response as any);
        }
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  // console.log(images);

  if (!response) {
    return <div>Loading...</div>;
  } else if (response.errors) {
    return (
      <div>
        <div>{response.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <ul className="image-list">
        {arr.map((image: Image) => (
          <li key={image.id} className="card">
            <Card image={image} />
          </li>
        ))}
      </ul>
    );
  }
}
