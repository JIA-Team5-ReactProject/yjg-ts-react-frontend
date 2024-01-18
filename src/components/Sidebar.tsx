function Sidebar() {
  return (
    <div className="bg-cyan-600/70 w-80 h-screen shadow-black/35 shadow-xl flex flex-col">
      <div className="border-2 border-cyan-700 mt-32 mx-4 flex p-4 h-32">
        <div className="bg-yellow-200 flex-1"></div>
        <p className="flex-1 text-center self-center text-white text-xl underline underline-offset-4">
          영양사 님
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
