import Image from "next/image";
import { LogoImage } from "@repo/ui/assets";
import { cn } from "@repo/ui/utils";

export const Logo = ({ iconOnly = false }: { iconOnly?: boolean }) => {
  return (
    <div className="ui-flex ui-items-center">
      <Image className="ui-w-7 ui-h-7" src={LogoImage} alt="Logo icon" />
      <span
        className={cn(
          "ui-pl-2 ui-text-2xl ui-text-gray-900",
          iconOnly && "ui-hidden",
        )}
      >
        Lokalz
      </span>
    </div>
  );
};
