import Image from "next/image";
import { RiPhoneFill, RiMailFill, RiDiscordFill } from "react-icons/ri";

const UserCard = ({ user }) => {
  return (
    <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-5">
      <div className="flex flex-col justify-center items-center">
        <Image
          className="w-8 h-8 rounded-full"
          src={user.image}
          width="50"
          height="50"
          alt="User"
        />
        <h2 className="text-lg text-gray-800 mt-2 mb-0">{user.name}</h2>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
          {user.role}
        </p>
      </div>
      {/* <div className="flex flex-row">
        <RiPhoneFill size={"1.25em"} />
        <p className="text-xs ml-1">{user.discord}</p>
      </div>
      <div className="flex flex-row">
        <RiMailFill size={"1.25em"} />
        <p className="text-xs ml-1">{user.discord}</p>
      </div>
      <div className="flex flex-row">
        <RiDiscordFill size={"1.25em"} />
        <p className="text-xs ml-1">{user.discord}</p>
      </div> */}
    </div>
  );
};

export default UserCard;
