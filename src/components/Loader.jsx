import { SpinnerInfinity } from "spinners-react";

const Loader = () => {
  return (
    <div className="fixed z-10 inset-0 glass grid place-items-center">
      <SpinnerInfinity
        color="dodgerblue"
        thickness={120}
        size={80}
      />
    </div>
  );
};

export default Loader;
