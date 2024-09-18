import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const ScreenContainer: React.FC<Props> = (props) => {
  return (
    <div className=" relative text-center shadow py-2 text-gray-600 bg-slate-50 bg-opacity-50">
      {props.children}
    </div>
  );
};
