import React from "react";
import {
  IconTiktokHomeSolid,
  IconTiktokHomeOutlined,
  IconTiktokFriendsSolid,
  IconTiktokFriendsOutlined,
  IconTiktokInboxSolid,
  IconTiktokInboxOutlined,
  IconTiktokPost,
  IconTiktokProfileSolid,
  IconTiktokProfileOutlined,
} from "@/components/assets/icons";

type TiktokNavbarType = {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export const TiktokNavbar: React.FC<TiktokNavbarType> = ({ selected, setSelected }) => {
  return (
    <div className={`sticky bottom-0 w-full px-8 pt-2 pb-8 ${selected === 0 ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-950'} flex items-center justify-between z-0`}>
      <div className="flex flex-col items-center hover:cursor-pointer" onClick={() => setSelected(0)}>
        {selected === 0 ? <IconTiktokHomeSolid /> : <IconTiktokHomeOutlined className="text-stone-400" />}
        <p className={`text-xs ${selected === 0 ? "" : "text-stone-400"}`}>Home</p>
      </div>
      <div className="flex flex-col items-center">
        {selected === 1 ? <IconTiktokFriendsSolid /> : <IconTiktokFriendsOutlined className="text-stone-400" />}
        <p className={`text-xs ${selected === 1 ? "" : "text-stone-400"}`}>Friends</p>
      </div>
      <div>
        <IconTiktokPost />
      </div>
      <div className="flex flex-col items-center">
        {selected === 2 ? <IconTiktokInboxSolid /> : <IconTiktokInboxOutlined className="text-stone-400" />}
        <p className={`text-xs ${selected === 2 ? "" : "text-stone-400"}`}>Inbox</p>
      </div>
      <div className="flex flex-col items-center hover:cursor-pointer" onClick={() => setSelected(3)}>
        {selected === 3 ? <IconTiktokProfileSolid /> : <IconTiktokProfileOutlined className="text-stone-400" />}
        <p className={`text-xs ${selected === 3 ? "" : "text-stone-400"}`}>Profile</p>
      </div>
    </div>
  );
};
