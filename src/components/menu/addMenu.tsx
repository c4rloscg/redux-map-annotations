import React, { FC, useCallback, useMemo } from "react";
import Menu from "./menu";
import { AnnotationType, MenuListPlacement } from "../../types";
import { getAnnotationOptions } from "../../helpers";
import MenuItem from "./menuItem";
import AddIcon from "../icons/add";
import useToggle from "../../hooks/useToggle";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleAdding } from "../../redux/annotations_reducer";
import AnnotationTypeLabel from "./annotationTypeLabel";

interface Props {}

const AddMenu: FC<Props> = () => {
  const [isOpen, handleOpen, handleClose] = useToggle();
  const options = useMemo(getAnnotationOptions, []);
  const dispatch = useAppDispatch();
  const adding = useAppSelector((s) => s.annotations.adding);

  const handleOptionClick = useCallback((value: string) => {
    dispatch(toggleAdding(value as AnnotationType));
    handleClose();
  }, []);

  return (
    <Menu
      className="relative"
      Icon={adding ? undefined : AddIcon}
      label={adding ? `Adding - ${adding}` : "Add new"}
      listPlacement={MenuListPlacement.Bottom}
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      isActive={!!adding}
    >
      {options.map(({ label, value }) => (
        <MenuItem
          key={`add-menu-item-${value}`}
          value={value}
          label={
            <AnnotationTypeLabel type={value as AnnotationType} label={label} />
          }
          onClick={handleOptionClick}
        />
      ))}
    </Menu>
  );
};

export default AddMenu;
