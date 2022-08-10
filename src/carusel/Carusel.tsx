import React from 'react';
import Carousel from 'better-react-carousel';
import axios from 'axios';
import { Item } from './item';

export type TItem = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  ref: React.RefObject<JSX.Element>;
};

const { log } = console;

export const NewCarousel: React.FC = () => {
  const [alums, setAlbums] = React.useState<TItem[] | null>(null);

  React.useEffect(() => {
    axios
      .get('https://api.imgflip.com/get_memes')
      .then((response) => response.data.data.memes)
      .then((json) => {
        setAlbums(json);
      });
  }, []);

  return (
    <>
      <Carousel cols={1} rows={1} gap={1} loop>
        {alums &&
          alums.map((item) => (
            <Carousel.Item key={item.id}>
              <Item item={item} />
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};
