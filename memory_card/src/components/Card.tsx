import { Image } from "../types/card-types";

export function Card({ image }: { image: Image }) {
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
