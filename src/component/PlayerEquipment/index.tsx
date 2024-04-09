function PlayerEquipment() {
  return (
    <section className="inline-flex items-start justify-start flex-col gap-8 bg-[#363636] p-8 rounded-md">
      <p className="text-white font-bold">Equipamentos</p>

      <div className="flex items-start justify-start flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            {/* <img src="src/assets/Brass_Helmet.gif" alt="" /> */}
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Brass_Helmet.gif" alt="" />
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Backpack.gif" alt="" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Dagger.gif" alt="" />
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Leather_Armor.gif" alt="" />
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Wooden_Shield.gif" alt="" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            {/* <img src="src/assets/Dagger.gif" alt="" /> */}
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Leather_Boots.gif" alt="" />
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            {/* <img src="src/assets/Wooden_Shield.gif" alt="" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlayerEquipment;
