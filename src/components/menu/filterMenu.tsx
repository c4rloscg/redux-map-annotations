import React, { FC, useCallback, useMemo } from "react";
import Menu from "./menu";
import { AnnotationType } from "../../types";
import { getAnnotationOptions } from "../../helpers";
import MenuItem from "./menuItem";
import { toggleFilter } from "../../redux/annotations_reducer";
import { useAppDispatch } from "../../hooks/redux";
import TuneIcon from "../icons/tune";
import useToggle from "../../hooks/useToggle";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../redux/store";
import { countsByAnnotationTypeSelector } from "../../redux/selectors";

const FilterMenu: FC<Props> = ({ selectedFilters, countsByAnnotationType }) => {
  const [isOpen, handleOpen, handleClose] = useToggle();
  const isActive = useMemo(
    () => Object.values(selectedFilters).some(Boolean),
    [selectedFilters]
  );

  const options = useMemo(getAnnotationOptions, []);
  const dispatch = useAppDispatch();

  const handleOptionClick = useCallback((value: string) => {
    dispatch(toggleFilter(value as AnnotationType));
  }, []);

  return (
    <Menu
      className="relative"
      Icon={TuneIcon}
      label="Filters"
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      isActive={isActive}
    >
      {options.map(({ label, value }) => {
        const annotationType = value as AnnotationType;
        return (
          <MenuItem
            key={`filter-menu-item-${value}`}
            label={`${label} (${countsByAnnotationType[annotationType]})`}
            value={value}
            onClick={handleOptionClick}
            selected={selectedFilters[annotationType]}
            toggle
          />
        );
      })}
    </Menu>
  );
};

const connector = connect((s: RootState) => ({
  selectedFilters: s.annotations.filters,
  countsByAnnotationType: countsByAnnotationTypeSelector(s),
}));

type StoreProps = ConnectedProps<typeof connector>;
type Props = StoreProps;

export default connector(FilterMenu);
