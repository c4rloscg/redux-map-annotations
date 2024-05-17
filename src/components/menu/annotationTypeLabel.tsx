import React, { FC, ReactNode } from "react";
import { IMAGES_BY_ANNOTATION_TYPE } from "../../constants";
import { AnnotationType } from "../../types";

interface Props {
  label: ReactNode;
  type: AnnotationType;
}

const AnnotationTypeLabel: FC<Props> = ({ type, label }) => {
  const url = IMAGES_BY_ANNOTATION_TYPE[type];
  return (
    <div className="flex gap-2">
      {url && <img className="brightness-100 w-4 h-4 m-auto" src={url} />}
      {label}
    </div>
  );
};

export default AnnotationTypeLabel;
