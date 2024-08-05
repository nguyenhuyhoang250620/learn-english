import PATH from "@constants/path";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import colors from "@constants/colors";
const ActionRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  const formattedDate = format(new Date(), "EEEE, dd-MM-yyyy", { locale: vi });
  return (
    <div className="absolute right-[16px] top-[-12px] flex items-center space-x-3">
      <p>{formattedDate}</p>
      <div className="w-[90px] flex justify-center"><p>{ctime}</p></div>
      <div style={{borderLeft:`1px solid ${colors.textBase}`}} className="pl-3">
        <FaHome
          className="text-[22px] cursor-pointer"
          onClick={() => {
            dispatch(handleOnChangeKey("home"));
            navigate(`/${PATH.MANAGERMENT}/${PATH.HOME}`);
          }}
        />
      </div>
    </div>
  );
};
export default ActionRight;
