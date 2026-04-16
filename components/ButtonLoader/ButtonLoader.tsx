import { RotatingLines } from 'react-loader-spinner';

type ButtonLoaderProps = {
  color?: string;
  size?: number;
};

const ButtonLoader = ({
  color = 'var(--color-text-primary)',
  size = 24,
}: ButtonLoaderProps) => {
  return (
    <RotatingLines
      visible={true}
      height={size}
      width={size}
      color={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export default ButtonLoader;
