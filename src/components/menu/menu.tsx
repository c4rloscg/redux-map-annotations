import { FC, ReactNode, SVGProps } from "react";
import cx from "classix";
import { MenuListPlacement } from "../../types";

interface Props {
  label: ReactNode;
  listPlacement?: MenuListPlacement;
  children: ReactNode;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  isOpen: boolean;
  isActive?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const Menu: FC<Props> = ({
  label,
  Icon,
  listPlacement,
  children,
  isActive,
  className,
  isOpen,
  onClose,
  onOpen,
}) => {
  const hasTopPlacement = listPlacement === MenuListPlacement.Top;

  return (
    <>
      {isOpen && (
        <div
          className="bg-cyan-600 opacity-30 fixed top-0 left-0 w-full h-full z-10"
          onClick={onClose}
        />
      )}
      <div
        className={cx(
          "absolute",
          "flex",
          "flex-col",
          "text-md",
          "gap-2",
          "z-0",
          hasTopPlacement && "flex-col-reverse",
          isOpen && "z-20",
          className
        )}
      >
        <div
          className={cx(
            "font-semibold",
            "transition-shadow",
            "px-4",
            "py-1",
            "top-4",
            "left-4",
            "shadow-md",
            "hover:shadow-lg",
            "rounded-lg",
            "cursor-pointer",
            "select-none",
            hasTopPlacement && "ml-auto",
            hasTopPlacement && "mr-auto",
            !isActive && "bg-white",
            isActive && "bg-cyan-500 text-white"
          )}
          onClick={isOpen ? onClose : onOpen}
        >
          <div className="flex gap-2">
            {Icon && <Icon className="w-5 m-auto" />}
            <div className="my-auto">{label}</div>
          </div>
        </div>

        <div
          className={cx(
            "absolute",
            "top-10",
            "flex",
            "max-h-64",
            "w-44",
            "cursor-pointer",
            "flex-col",
            "overflow-y-auto",
            "bg-white",
            "shadow-lg",
            "rounded-lg",
            "transition-opacity",
            "empty:opacity-0"
          )}
        >
          {isOpen && children}
        </div>
      </div>
    </>
  );
};

export default Menu;
