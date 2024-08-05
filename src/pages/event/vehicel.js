import CustomTable from "@common/table/custom-table";
import { useDispatch, useSelector } from "react-redux";
import { convertISOToDateTime } from "@utils/format-date";
import CustomHeaderEvent from "@components/event/custom-header-event";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Tag } from "antd";
import colors from "@constants/colors";
import { useEffect, useRef, useState } from "react";
import CreateVehicle from "@components/event/vehicle/create-vehicle";
import CustomDrawer from "@common/drawer/custom-drawer";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import PATH from "@constants/path";
import { selectPlateData, selectPlateTotalRecord } from "@redux/slice/vehicle-slice";
import { useSearchParams } from "react-router-dom";
import TYPE_ACTION from "@constants/action";
import { imagesSibar } from "@common/images/image";
const Vehicle = () => {
  const data = [];
  const dispatch = useDispatch();
  const [isShowCreate, setIsShowCreate] = useState(false)
  const [loading, setLoading] = useState(false);
  const vehicleData = useSelector(selectPlateData);
  const totalVehicleAll = useSelector(selectPlateTotalRecord);

  let [searchParams] = useSearchParams();
  let number_plate = searchParams.get("number_plate");
  let page_idx = searchParams.get("page_idx");
  let page_size = searchParams.get("page_size");
  let brand = searchParams.get("brand");
  let color = searchParams.get("color");
  let body_style = searchParams.get("body_style");
  let order_by = searchParams.get("order_by");

  const filterRefVehicle = useRef({
    number_plate: null,
    color: null,
    brand: null,
    body_style: null,
    page_idx: 1,
    page_size: 10,
    exact: false,
    profile_ids: null,
    start_time: null,
    end_time: null,
  });

  // load data
  const loadPlateData = () => {
    setLoading(true);
    const callBack = (data) => {
      setLoading(false);
    };
    dispatch({
      type: TYPE_ACTION.VEHICLE.GET_VEHICLE,
      payload: { body: filterRefVehicle.current, callBack },
    });
  };
  useEffect(() => {
    filterRefVehicle.current.page_idx = page_idx ? page_idx : 1;
    filterRefVehicle.current.order_by = order_by ? order_by : null;
    loadPlateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-restricted-globals
  }, [location.pathname]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "ẢNH",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "BSX",
      dataIndex: "license",
      key: "license",
    },
    {
      title: "MÀU SẮC",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "NHÃN HIỆU",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "LOẠI",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "TẦN SUẤT",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "action",
      key: "action",
    },
  ];
  // eslint-disable-next-line no-lone-blocks
  {
    Array.isArray(vehicleData) &&
    vehicleData.map((dataIndex, index) => {
        data.push({
          stt: dataIndex.id,
          license: dataIndex.number_plate,
          color: dataIndex.color,
          brand: dataIndex.brand,
          type: dataIndex.body_style,
          frequency: dataIndex.count,
          image: (
            <div
              className="h-[100px] w-full flex justify-center items-center"
              style={{ border: `1px solid ${colors.borderColor}` }}
            >
              <img
                src={imagesSibar.logo}
                style={{ width: "auto", height: 95 }}
                alt="img"
              />
            </div>
          ),
          action: (
            <div className="flex items-center justify-center space-x-3">
              <IoEyeSharp className="text-[22px] cursor-pointer" onClick={()=>{
                dispatch(handleOnChangeKey(`${PATH.EVENT}/${PATH.VIEW_VEHICLE}`))
              }}/>
              <RiEditBoxFill className="text-[22px]" />
              <MdDelete className="text-[22px]" />
            </div>
          ),
        });
      });
  }
  return (
    <div className="px-2">
      <CustomHeaderEvent
        isShowCreate={true}
        handlCreate={() => {
          setIsShowCreate(true)
        }}
      />
      <CustomDrawer open={isShowCreate} onClose={()=>setIsShowCreate(false)} children={<CreateVehicle onClose={()=>setIsShowCreate(false)}/>}/>
      <CustomTable
        data={data}
        columns={columns}
        showTotal={true}
        total={totalVehicleAll}
        pagination={true}
        showCheckBox={true}
        bordered={false}
        onRowClick={() => {}}
        onChange={(page_idx,page_size)=>{
          filterRefVehicle.current.page_idx = page_idx;
          filterRefVehicle.current.page_size = page_size;
          loadPlateData();
        }}
      />
    </div>
  );
};
export default Vehicle;
