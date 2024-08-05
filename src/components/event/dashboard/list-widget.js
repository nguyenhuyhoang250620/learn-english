import CustomCard from "./custom-card";
import { useDispatch, useSelector } from "react-redux";
import { useRef,useEffect } from "react";
import { format } from 'date-fns';
import TYPE_ACTION from "@constants/action";
const ListWidget = () => {
  const dispatch = useDispatch();
  function getCurrentDate() {
    const today = new Date();
    return format(today, 'yyyy-MM-dd');
  }
  const filterRefDashboard = useRef({
    camera_ids: null,
    start_time: null,
    end_time: null,
  });

  useEffect(()=>{
  },[])
  return (
    <div className="w-[100%] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      <CustomCard title="Tổng số sự kiện" colorFrom="#89CE80" colorTo="#5DA955"  value={12}/>
      <CustomCard title="Tổng số người" colorFrom="#38AFFB" colorTo="#1D6DFA"  value={12}/>
      <CustomCard title="Tổng số phương tiện" colorFrom="#EEC44D" colorTo="#EA7A23"  value={200}/>
      <CustomCard title="Cảnh báo sự kiện" colorFrom="#FC807B" colorTo="#FB5958"  value={10}/>
    </div>
  );
};

export default ListWidget;
