import style from "./Card.module.css";
import Link from "next/link";

type CardProps = {
    id: number;
    name: string;
    rating: number;
    genres: { name: string }[];
    background_image: string;
};

const Card = (props: CardProps) => {
  const { id, name, rating, genres, background_image } = props;
  
  return (
    <div className={style.card}>
      <div>
        <Link href={`/detail/${id}`}>
          <a>
            <img className={style.image} src={background_image} alt=""></img>
          </a>
        </Link>
      </div>
      <div>
        <h1 className={style.name}>{name}</h1>
        <h1 className={style.rating}>Rating: {rating}</h1>
        <p className={style.genres}>
          Genres: {genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Card;