'use client';

import Image from 'next/image';
import { useState } from 'react';

type CamperImageProps = {
  readonly src: string | undefined;
  readonly alt: string;
  readonly sizes: string;
};

const CamperImage = ({ src, alt, sizes }: CamperImageProps) => {
  const [imgScr, setImgScr] = useState<string>(
    src || '/img/default_camper.webp',
  );

  return (
    <Image
      src={imgScr}
      alt={alt}
      fill
      sizes={sizes}
      loading="eager"
      onError={() => setImgScr('/img/default_camper.webp')}
    />
  );
};

export default CamperImage;
