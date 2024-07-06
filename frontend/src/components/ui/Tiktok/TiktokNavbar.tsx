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
};

export const TiktokNavbar: React.FC<TiktokNavbarType> = ({ selected }) => {
  return (
    <div className="w-full px-8 pt-2 pb-8 bg-neutral-950 flex items-center justify-between text-white">
      <div className="flex flex-col items-center">
        {selected === 0 ? <IconTiktokHomeSolid /> : <IconTiktokHomeOutlined className="text-stone-300" />}
        <p className={`text-xs ${selected === 0 ? "" : "text-stone-300"}`}>Home</p>
      </div>
      <div className="flex flex-col items-center">
        {selected === 1 ? <IconTiktokFriendsSolid /> : <IconTiktokFriendsOutlined className="text-stone-300" />}
        <p className={`text-xs ${selected === 1 ? "" : "text-stone-300"}`}>Friends</p>
      </div>
      <div>
        <IconTiktokPost />
      </div>
      <div className="flex flex-col items-center">
        {selected === 2 ? <IconTiktokInboxSolid /> : <IconTiktokInboxOutlined className="text-stone-300" />}
        <p className={`text-xs ${selected === 2 ? "" : "text-stone-300"}`}>Inbox</p>
      </div>
      <div className="flex flex-col items-center">
        {selected === 3 ? <IconTiktokProfileSolid /> : <IconTiktokProfileOutlined className="text-stone-300" />}
        <p className={`text-xs ${selected === 3 ? "" : "text-stone-300"}`}>Profile</p>
      </div>
    </div>
  );
};
