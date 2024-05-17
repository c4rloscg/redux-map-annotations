import { ReactNode, useCallback } from "react";
import cx from "classix";

interface Props<T extends string> {
  label: ReactNode;
  /** Whether the option should show a checkbox. */
  toggle?: boolean;
  icon?: ReactNode;
  value: T;
  /** Whether the option is selected. */
  selected?: boolean;
  onClick: (value: T) => void;
}

const MenuItem = <T extends string>({
  onClick,
  toggle,
  label,
  value,
  selected,
}: Props<T>) => {
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <div
      className={cx(
        "flex",
        "select-none",
        "text-md",
        "gap-1",
        "px-4",
        "py-2",
        "hover:bg-gray-100",
        "cursor-pointer",
        "transition",
        selected && "bg-gray-50"
      )}
      onClick={handleClick}
    >
      {toggle && (
        <input
          checked={selected}
          type="checkbox"
          value=""
          className={cx(
            "w-4",
            "h-4",
            "my-auto",
            "pointer-events-none",
            "text-blue-600",
            "bg-gray-100",
            "border-gray-300",
            "rounded"
          )}
        />
      )}
      <label className="ml-2 my-auto pointer-events-none font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default MenuItem;
