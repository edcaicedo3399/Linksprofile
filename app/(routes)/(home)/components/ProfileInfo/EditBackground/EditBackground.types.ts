import { Dispatch, SetStateAction } from "react";

export type EditBackgroundProps = {
  onReload: Dispatch<SetStateAction<boolean>>;
};
