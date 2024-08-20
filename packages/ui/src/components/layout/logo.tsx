import Image from "next/image";
import { LogoImage } from "@repo/ui/assets";
import { cn } from "@repo/ui/utils";

export const Logo = ({ iconOnly = false }: { iconOnly?: boolean }) => {
  return (
    <div className="flex items-center">
      <Image className="w-7 h-7" src={LogoImage} alt="Logo icon" />
      <span className={cn("pl-2 text-2xl text-gray-900", iconOnly && "hidden")}>
        Lokalz
      </span>
    </div>
  );
};
