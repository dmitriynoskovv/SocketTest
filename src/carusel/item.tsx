import { Box } from '@mui/material';
import React from 'react';
import { TItem } from './Carusel';
import AspectRatio from '@mui/joy/AspectRatio';
import { LazyComponent } from './LazyComponent';

export const Item: React.FC<{ item: TItem }> = ({ item }) => {
  // const [img, setImg] = React.useState<string | null>(null);

  const [visible, setVisible] = React.useState(false);
  const onVisible = React.useCallback(() => setVisible(true), []);

  // React.useEffect(() => {
  //   fetch(item.url).then((response) => {
  //     response.blob().then((blobResponse) => {
  //       setImg(URL.createObjectURL(blobResponse));
  //     });
  //   });
  // }, [item.url]);
  return (
    <LazyComponent onVisible={onVisible}>
      <div style={{ contentVisibility: 'auto' }}>
        <Box
          sx={{
            maxWidth: 300,
            display: 'block',
            overflow: 'hidden',
          }}
        >
          <AspectRatio ratio="4/3">
            <figure>
              <img src={visible ? item.url : ''} alt={item.name} />
            </figure>
          </AspectRatio>
        </Box>
      </div>
    </LazyComponent>
  );
};
