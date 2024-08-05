import CustomTable from "@common/table/custom-table";
import { convertISOToDateTime } from "@utils/format-date";
import CustomHeaderEvent from "@components/event/custom-header-event";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Tag } from "antd";
import colors from "@constants/colors";
import CustomModal from "@common/modal/modal";
import { useEffect, useRef, useState } from "react";
import TrafficModal from "@components/event/content/traffic-modal";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "@constants/action";
import HumanModal from "@components/event/content/human-modal";
import {
  selectListEventAll,
  selectTotalEventAll
} from "@redux/slice/event-slice";
import { selectCollapse } from "@redux/slice/view-event-slice";
import { useNavigate } from "react-router";
import PATH from "@constants/path";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
const Event = () => {
  const indexRef = useRef({
    index: -1,
  });
  const data = [];
  const [isShowEventModal, setIsShowEventModal] = useState(false);
  const [eventID, setEventID] = useState();
  const eventAll = useSelector(selectListEventAll);
  const totalEventAll = useSelector(selectTotalEventAll);
  const [modalContent, setModalContent] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState(0);
  const collapse = useSelector(selectCollapse);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleShowEvent = () => {
    setIsShowEventModal(true);
  };

  const filterRefEvent = useRef({
    ids: [],
    soCmts: [],
    camera_ids: [],
    start_time: null,
    end_time: null,
    distinct: null,
    detail_less: true,
    event_type: null,
    colors: [],
    brands: [],
    body_styles: [],
    exact: false,
    page_idx: 1,
    page_size: 10,
    profile_list_ids: null,
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "TÊN ĐỐI TƯỢNG",
      dataIndex: "soCmt",
      key: "soCmt",
      onCell: (record) => ({
        onClick: (e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện lan toả lên hàng của bảng
        },
      }),
    },
    {
      title: "ẢNH",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "LOẠI HỒ SƠ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "KHU VỰC",
      dataIndex: "cameraLocation",
      key: "cameraLocation",
      width: 400,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "THỜI GIAN",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "action",
      key: "action",
    },
  ];

  const loadData = () => {
    const body = filterRefEvent.current;
    const callBack = (data) => {};
    dispatch({
      type: TYPE_ACTION.EVENT.GET_ALL_EVENT,
      payload: { body, callBack },
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const showModal = (data) => {

    dispatch({
      type: TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
      payload: true,
    });
    dispatch({
      type: TYPE_ACTION.VIEW_EVENT.GET_VIEW_EVENT,
      payload: { data },
    });
  }

  // eslint-disable-next-line no-lone-blocks
  {
    Array.isArray(eventAll) &&
      eventAll.map((dataIndex, index) => {
        data.push({
          key:dataIndex.id,
          id: dataIndex.id,
          soCmt: <p className="underline hover:text-red-600 cursor-pointer" onClick={()=>{
            dispatch(handleOnChangeKey(`${PATH.EVENT}/${PATH.PERSON}/view/${dataIndex.soCmt}`))
          }}>{dataIndex.soCmt}</p>,
          type: dataIndex.event_type === 'ANPR'?'PHƯƠNG TIỆN':'NGƯỜI',
          image: (
            <div className="h-[100px] w-full flex justify-center">
              <img
                src={dataIndex.crop_image}
                style={{ width: "auto", height: 100 }}
                alt="img"
              />
            </div>
          ),
          cameraLocation: dataIndex?.camera_model?.camera_name ?dataIndex?.camera_model?.camera_name:'-',
          status: (
            <Tag
              style={{
                color: colors.textBase,
                padding: 4,
                background: colors.redGlobal,
                borderColor: colors.redGlobal,
              }}
            >
              Xuất hiện
            </Tag>
          ),
          time: convertISOToDateTime(dataIndex.thoiGianXuatHien),
          action: (
            <div className="flex items-center justify-center space-x-3">
              <IoEyeSharp
                className="text-[22px] cursor-pointer"
                onClick={() => {
                  setEventID(dataIndex.id);
                  showModal({ data: eventAll, index: index })
                }}
              />
              <MdDelete className="text-[22px]" />
            </div>
          ),
          dataModal:{
            id: dataIndex.id,
            soCmt: dataIndex.soCmt,
            image:dataIndex.image,
            imageCrop:dataIndex.crop_image,
            cameraLocation: dataIndex?.camera_model?.camera_name ?dataIndex?.camera_model?.camera_name:'-',
            time: convertISOToDateTime(dataIndex.thoiGianXuatHien),
          },
        });
      });
  }

  const onChange = (page_idx,page_size)=>{
    filterRefEvent.current.page_idx = page_idx;
    filterRefEvent.current.page_size = page_size;
    loadData();
  }
  const handleKeyPress = (event) => { 
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      if (indexRef.current.index < filterRefEvent.current.page_size - 1) {
        indexRef.current.index++;
        setSelectedRowKeys(indexRef.current.index);
      } else {
        setSelectedRowKeys(0);
        const body = filterRefEvent.current;
        indexRef.current.index = 0;
        filterRefEvent.current.page_idx++;
        onChange(filterRefEvent.current.page_idx, filterRefEvent.current.page_size);
        dispatch({
          type: TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
          payload: false,
        });
        const callBack = (data) => {
          showModal({ data: data.results, index: indexRef.current.index });
        };
        dispatch({
          type: TYPE_ACTION.EVENT.GET_ALL_EVENT,
          payload: { body, callBack },
        });
      }
    } 
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      if (indexRef.current.index > 0) {
        indexRef.current.index--;
        setSelectedRowKeys(indexRef.current.index);
      } else {
        setSelectedRowKeys(filterRefEvent.current.page_size - 1);
        indexRef.current.index = filterRefEvent.current.page_size - 1;
        if (filterRefEvent.current.page_idx >= 2) {
          const body = filterRefEvent.current;
          filterRefEvent.current.page_idx--;
          onChange(filterRefEvent.current.page_idx, filterRefEvent.current.page_size);
          dispatch({
            type: TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
            payload: false,
          });
          const callBack = (data) => {
            showModal({ data: data.results, index: indexRef.current.index });
          };
          dispatch({
            type: TYPE_ACTION.EVENT.GET_ALL_EVENT,
            payload: { body, callBack },
          });
        }
      }
    }
  };
  useEffect(() => {
    if (!collapse) {
      setSelectedRowKeys();
    }
  }, [collapse]);
  useEffect(() => {
    setSelectedRowKeys(indexRef.current.index);
    // Lắng nghe sự kiện keydown trên toàn bộ trang web
    window.addEventListener("keydown", handleKeyPress);
    // Hủy đăng ký lắng nghe khi component bị unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [eventAll]);

  const getRowClassName = (record, index) => {
    return index === selectedRowKeys ? "red_row" : "";
  };

  // view model

  return (
    <div className="px-2">
      <CustomHeaderEvent />
      <CustomTable
        filterRef={filterRefEvent}
        data={data}
        columns={columns}
        showTotal={true}
        pagination={true}
        showCheckBox={true}
        bordered={false}
        total={totalEventAll}
        defaultCurrent={filterRefEvent.current.page_idx}
        getRowClassName={getRowClassName}
        onChange={(page_idx,page_size)=>{
          filterRefEvent.current.page_idx = page_idx;
          filterRefEvent.current.page_size = page_size;
          loadData();
        }}
        handleRowClick={(record, index) => {
          indexRef.current.index = index;
          setSelectedRowKeys(index);
          showModal({ 
            data: eventAll, 
            index: index })
        }}
      />
      <CustomModal
        open={isShowEventModal}
        handleOk={() => {
          setIsShowEventModal(false);
        }}
        handleCancel={() => {
          setIsShowEventModal(false);
        }}
        footer={false}
        content={modalContent}
        title={`Sự kiện ${eventID}`}
        width={800}
      />
    </div>
  );
};
export default Event;
