import { FC, SVGProps } from "react";

const AddIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg focusable="false" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
  </svg>
);

export default AddIcon;
