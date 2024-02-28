import { ReactNode } from "react";

function MainContainer(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="flex-auto h-screen pt-28 pr-6 pb-6 overflow-auto">
      {children}
    </div>
  );
}

export default MainContainer;
