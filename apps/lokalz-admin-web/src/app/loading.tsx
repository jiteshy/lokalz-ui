import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="bg-slate-500 opacity-30 absolute left-0 right-0 top-0 bottom-0 flex items-center">
      <FontAwesomeIcon icon={faCircleNotch} spin />
    </div>
  );
}
