import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 text-center flex items-center">
      <div className="bg-slate-500 opacity-30 absolute left-0 right-0 top-0 bottom-0"></div>
      <div className="w-full m-auto">
        <FontAwesomeIcon icon={faCircleNotch} size="2xl" spin />
      </div>
    </div>
  );
}
