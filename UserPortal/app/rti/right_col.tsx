import Authorities from "./Authorities";
import TracKRequest from "./TracKRequest";
import ComplainceReturn from "./ComplainceReturn";

const right_col = () => {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Authorities />
      <TracKRequest />
      <ComplainceReturn />
    </div>
  );
};

export default right_col;
























