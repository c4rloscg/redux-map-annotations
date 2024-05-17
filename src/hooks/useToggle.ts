import { useCallback, useState } from "react";

/**
 * Hook that provides common methods
 * for toggle states.
 * @param initialValue
 * @returns currentValue, onHandler, offHandler.
 */
const useToggle = (
  initialValue: boolean = false
): [boolean, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleOn = useCallback(() => {
    setValue(true);
  }, []);

  const handleOff = useCallback(() => {
    setValue(false);
  }, []);

  return [value, handleOn, handleOff];
};

export default useToggle;
