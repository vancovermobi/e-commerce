import { BounceLoader } from "react-spinners";
import { RotatingLines } from  'react-loader-spinner'

export default function Spinner({ width, visible }) {
  return (
    // <BounceLoader color='#1E3A8A' speedMultiplier={2} />
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width={ width ?? "46" }
      visible={ visible ?? true }
    />
  );
}
