import CustomTable from "@common/table/custom-table";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderEvent from "@components/event/custom-header-event";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import CustomDrawer from "@common/drawer/custom-drawer";
import { useEffect, useRef, useState } from "react";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import PATH from "@constants/path";
import CreatePerson from "@components/event/person/create-person";
import { useSearchParams } from "react-router-dom";
import TYPE_ACTION from "@constants/action";
import { selectProfileData, selectTotalProfileData } from "@redux/slice/person-slice";
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
    title: "TÊN ĐẦY ĐỦ",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "ĐỊNH DANH",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "GIỚI TÍNH",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "SỐ ĐIỆN THOẠI",
    dataIndex: "phone",
    key: "phone",
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
const Person = () => {
  const profileData = useSelector(selectProfileData);
  const totalProfileAll = useSelector(selectTotalProfileData);
  const [loading, setLoading] = useState(false);
  const filterRefPerson = useRef({
    soCmts: null,
    page_idx: 1,
    page_size: 10,
    order_by: null,
    camera_ids: null,
    profile_ids: null,
    start_time: null,
    end_time: null,
  });

  const loadDataProfile = async () => {
    setLoading(true);
    const callBack = () => {
      setLoading(false);
    };
    await dispatch({
      type: TYPE_ACTION.PROFILE.GET_PROFILE,
      payload: { body: filterRefPerson.current, callBack },
    });
  };
  let [searchParams] = useSearchParams();
  let soCmts = searchParams.get("soCmts");
  let page_idx = searchParams.get("page_idx");
  let page_size = searchParams.get("page_size");
  let order_by = searchParams.get("order_by");
  useEffect(() => {
    filterRefPerson.current.soCmts = soCmts ? soCmts : null;
    filterRefPerson.current.page_idx = page_idx ? page_idx : 1;
    filterRefPerson.current.order_by = order_by ? order_by : null;
    loadDataProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-restricted-globals
  }, [location.pathname]);

  const data = [];
  const [isShowCreate, setIsShowCreate] = useState(false)
  const dispatch = useDispatch();
  // eslint-disable-next-line no-lone-blocks
  {
    Array.isArray(profileData) &&
      profileData.map((dataIndex, index) => {
        data.push({
          key: dataIndex.id,
          stt: dataIndex.id,
          fullname: dataIndex.hoVaTen,
          username: dataIndex.id,
          gender: dataIndex.gioiTinh,
          phone: dataIndex.phone,
          frequency: dataIndex.count,
          image: (
            <div className="h-[100px] w-full flex justify-center">
              <img
                src={dataIndex.image}
                style={{ width: "auto", height: 100 }}
                alt=""
              />
            </div>
          ),
          action: (
            <div className="flex items-center justify-center space-x-3">
              <IoEyeSharp className="text-[22px]" onClick={()=>{
                dispatch(handleOnChangeKey(`${PATH.EVENT}/${PATH.PERSON}/view/${dataIndex.soCmt}`))
              }}/>
              <RiEditBoxFill className="text-[22px]" 
                onClick={()=>setIsShowCreate(true)}
              />
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
      <CustomDrawer open={isShowCreate} onClose={()=>setIsShowCreate(false)} children={<CreatePerson onClose={()=>setIsShowCreate(false)}/>}/>
      <CustomTable
        data={data}
        columns={columns}
        showTotal={true}
        total={totalProfileAll}
        pagination={true}
        showCheckBox={true}
        bordered={false}
        onRowClick={() => {}}
        onChange={(page_idx,page_size)=>{
          filterRefPerson.current.page_idx = page_idx;
          filterRefPerson.current.page_size = page_size;
          loadDataProfile();
        }}
      />
    </div>
  );
};
export default Person;
