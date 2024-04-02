import { ReactNode } from "react";

function MainContainer(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="flex-auto min-w-[72rem] h-screen pt-32 px-6 pb-6 overflow-auto bg-gray-300/60">
      {children}
    </div>
  );
}

export default MainContainer;
