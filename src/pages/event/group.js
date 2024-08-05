import { CaretDownOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CustomButtonCommon from "@common/button/custom-button";
import RadioCheck from "@common/checkbox/custom-radio-check";
import { images } from "@common/images/image";
import CustomInput from "@common/input/custom-input";
import Search from "@common/search/custom-search";
import CustomSelect from "@common/select/custom-select";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { selectGroupList } from "@redux/slice/group-slice";
import { Form, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const GroupEvent = () => {
  const TileRender = ({ title, value }) => {
    return (
      <div className="grid grid-cols-12 gap-2 cursor-default">
        <div
          className="col-span-6 font-bold cursor-default"
          style={{
            color: colors.textBase,
          }}
        >
          {title}:
        </div>
        <div
          className="col-span-6 truncate cursor-default"
          style={{
            color: colors.textBase,
          }}
        >
          {value}
        </div>
      </div>
    );
  };
  const [select, setSelect] = useState(0);
  const [edit, setEdit] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const groupData = useSelector(selectGroupList);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [form] = Form.useForm();

  const filterRefPerson = useRef({
    soCmts: null,
    page_idx: 1,
    page_size: 12,
    order_by: null,
    exact: false,
  });

  const filterRefVehicle = useRef({
    number_plate: null,
    color: null,
    brand: null,
    body_style: null,
    page_idx: 1,
    page_size: 12,
    exact: false,
  });

  const filterRefGroup = useRef({
    id: null,
    name: null,
    users: null,
    description: null,
    // page_idxs:1,
    page_size: 10,
  });
  useEffect(() => {
    loadGroupData();
    loadDataUser();
    loadDataVehicle();
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-restricted-globals
  }, []);

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const loadGroupData = () => {
    const callBack = (data) => {
      setSelect(data[0].id)
      setInitialProfileInfo(data[0])
    };
    dispatch({
      type: TYPE_ACTION.GROUP.GET_GROUP,
      payload: { body: filterRefGroup.current, callBack },
    });
  };

  const loadDataUser = () => {
    const callBack = (data) => {
      const arr = [];
      data?.data?.results.forEach((index) => {
        arr.push({
          label: index.soCmt,
          value: index.soCmt,
          item: index,
        });
      });
      return setOptionPerson(arr);
    };
    dispatch({
      type: TYPE_ACTION.PROFILE.GET_PROFILE,
      payload: { body: filterRefPerson.current, callBack },
    });
  };

  const loadDataVehicle = async () => {
    const callBack = (data) => {
      const arr = [];
      data?.results.forEach((index) => {
        arr.push({
          label: index.number_plate,
          value: index.number_plate,
          item: index,
        });
      });
      setOptionVehicle(arr);
    };
    dispatch({
      type: TYPE_ACTION.VEHICLE.GET_VEHICLE,
      payload: { body: filterRefVehicle.current, callBack },
    });
  };

  const [dataUsers,setDataUsers]=useState();
  const [defaultUsers,setDefaultUsers]=useState();
  const [optionPerson, setOptionPerson] = useState([]);
  const [optionVehicle, setOptionVehicle] = useState([]);
  const [dataVehicles,setDataVehicles]=useState();
  const [selectedValuesPerson, setSelectedValuesPerson] = useState([]);
  const [selectedValuesVehicle, setSelectedValuesVehicle] = useState([]);

  function setInitialProfileInfo(profileInfo) {
    let arrPerson=[]
    profileInfo.users.map((item)=>{
      arrPerson.push({
        value:item.soCmt,
        label:item.soCmt,
        item:item
      })
    })
    let arrVehicle=[]
    profileInfo.vehicles.map((item)=>{
      arrVehicle.push({
        value:item.number_plate,
        label:item.number_plate,
        item:item
      })
    })
    setSelectedValuesPerson(arrPerson)
    setSelectedValuesVehicle(arrVehicle)
    form.setFieldsValue({
      name: profileInfo.name ? profileInfo.name : "",
      description: profileInfo.description ? profileInfo.description : "",
      objectPerson:arrPerson,
      objectVehicle:arrVehicle,
    });
    setDataUsers(profileInfo.users)
    setDataVehicles(profileInfo.vehicles)
  }
  //onCLick

  const onSelectPerson = async (value, type) => {
    
    setDataUsers((pre) => [...pre, type.item]);
    setSelectedValuesPerson((pre) => [
      ...pre,
      {
        label: type.label,
        value: type.value,
        item: type.item,
      },
    ]);
  };

  const onDeselectPerson = (value, type) => {
    setDataUsers((prevData) => prevData.filter((item) => {
      return item.id !== type.item.id
    }));
    setSelectedValuesPerson((prevData) =>
      prevData.filter((item) => item.value !== value)
    );
  };

  const onSelectVehicle = async (value, type) => {
    setDataVehicles((pre) => [...pre, type.item]);
    setSelectedValuesVehicle((pre) => [
      ...pre,
      {
        label: type.label,
        value: type.value,
        item: type.item,
      },
    ]);
  };
  const onDeselectVehicle = (value, type) => {
    setDataVehicles((prevData) => prevData.filter((item) => item.id !== type.item.id));
    setSelectedValuesVehicle((prevData) =>
      prevData.filter((item) => item.value !== value)
    );
  };
  const listGroup = [];
    // eslint-disable-next-line no-lone-blocks
    {
      Array.isArray(groupData) &&
        groupData?.map((item, index) => {
        
          listGroup.push({
            key: item.id,
            id: item.id,
            name: item.name,
            description: item.description,
            color:"red",
            total: item?.users?.length + item?.vehicles?.length,
            vehicles: item.vehicles,
            users:item.users
          });
        });
    }
  return (
    <div className="p-2 w-full h-full space-x-5 flex">
      <div
        className="h-[92vh] w-[20%] space-y-2 px-2"
        style={{ background: colors.bg_input }}
      >
        <div className="flex space-x-2 pt-2">
          <Search />
          {groupData?.length > 0 && (
            <div
              className="flex items-center space-x-2 py-[10px] px-4 cursor-pointer"
              style={{
                border: `1px solid ${colors.borderColor}`,
              }}
              onClick={() => {}}
            >
              <IoCreate style={{ color: colors.textBase, fontSize: "22px" }} />
            </div>
          )}
        </div>
        {listGroup.map((item,index) => {
          return (
              <div
                  key={item.id}
                  className="flex items-center justify-between py-[10px] px-4 cursor-pointer relative"
                  style={{
                    border: `1px solid ${colors.borderColor}`,
                    background:
                      select === item.id || hoveredItem === item.id
                        ? colors.background
                        : "",
                  }}
                  onMouseEnter={() => {
                    handleMouseEnter(item.id)
                    setEdit(true);
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() =>{ 
                    setInitialProfileInfo(item)
                    setSelect(item.id)
                  }  
                  }
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-[10px] w-[10px] rounded-full"
                      style={{
                        background: item.color,
                      }}
                    ></div>
                    <p className="text-base w-[140px] truncate" style={{ color: colors.textBase }}>
                      {item.name}
                    </p>
                    <Tag
                      className="px-2"
                      style={{
                        color: colors.textBase,
                        background: colors.redGlobal,
                        borderColor: colors.redGlobal,
                      }}
                    >
                      {item.total}
                    </Tag>
                  </div>
                <div 
                className="absolute top-[30%] right-3"
                  onMouseDown={() => {
                    setEdit(false);
                  }}
                >
                  { hoveredItem === item.id && (
                      <MdEdit
                        style={{
                          color: colors.textBase,
                          fontSize: "16px",
                          cursor: "pointer",
                          width:30,
                          hight:30,
                        }}
                        /> 
                  )}
                </div>
              </div>
          );
        })}
      </div>
      <div className="space-y-2 w-full">
        <div
          className="w-full"
          style={{ 
            background: colors.bg_input, 
            height:edit?"92vh":"85vh",
          }}
        >
          <div className="grid grid-cols-12 gap-2 h-full w-full overflow-auto">
            <div className="lg:col-span-4 col-span-12 overflow-auto py-2 px-5 scroll_default">
            <Form form={form} ref={formRef}>
              <div className="w-full flex flex-col pt-4">
                <CustomInput
                  width="330px"
                  title="Tên nhóm"
                  type="text"
                  name="name"
                  isVertical={true}
                  disabled={edit}
                />
                <CustomInput
                  name="description"
                  title="Thông tin chi tiết"
                  width="330px"
                  style={{ background: colors.background_event }}
                  isVertical={true}
                  disabled={edit}
                />
                <div className="pb-[5px]">
                  <RadioCheck
                    widthTitle="0"
                    onChange={onChange}
                    value={value}
                    valueFirst="Danh sách người"
                    valueSecond="Danh sách phương tiện"
                    width="345px"
                    space="400px"
                  />
                </div>
                {value === 1 && (
                  <div className="mt-3">
                    <CustomSelect
                      isVertical={true}
                      name={'objectPerson'}
                      title="Danh sách người"
                      option={optionPerson}
                      mode="multiple"
                      maxTagCount={"responsive"}
                      width="330px"
                      allowClear
                      showSearch
                      onClear={()=>setDataUsers([])}
                      disabled={edit}
                      onSelect={(value, type) =>
                        onSelectPerson(value, type)
                      }
                      onDeselect={(value, type) =>onDeselectPerson(value, type)}
                    />
                  </div>
                )}
                {value === 2 && (
                  <div className="mt-3">
                    <CustomSelect
                      isVertical={true}
                      showSearch
                      width="330px"
                      name={'objectVehicle'}
                      title="Danh sách phương tiện"
                      maxTagCount={"responsive"}
                      option={optionVehicle}
                      mode="multiple"
                      allowClear
                      disabled={edit}
                      onClear={()=>setDataVehicles([])}
                      onSelect={(value, type) =>
                        onSelectVehicle(value, type)
                      }
                      onDeselect={(value, type) =>
                        onDeselectVehicle(value, type)
                      }
                    />
                  </div>
                )}
              </div>
            </Form>
            </div>
            <div
              className="lg:col-span-8 col-span-12  overflow-hidden p-2  grid grid-cols-12"
              style={{ background: colors.background_side }}
            >
              <div className="col-span-6 h-max">
                <div className="flex space-x-2 pl-3 pb-4">
                  <CaretDownOutlined
                    style={{ fontSize: "22px", color: colors.textBase }}
                  />
                  <p
                    style={{
                      color: colors.textBase,
                      fontWeight: "bold",
                    }}
                  >
                    Danh sách người
                  </p>
                </div>
                <div className="overflow-auto h-[78vh] scroll_default">
                  {dataUsers?.slice().reverse().map((user,p)=>{
                      return (
                        <div
                          key={p}
                          className="py-5 m-4 px-2 relative"
                          style={{ background: colors.bg_input }}
                        >
                          {!edit?
                          <div className="absolute top-1 right-1 cursor-pointer"
                          onClick={() => {
                          setDataUsers((prevData) => prevData.filter((item) => {
                            return item.id !== user.id
                          }));
                          setSelectedValuesPerson((prevData) =>{
                            const newArr = prevData.filter((item) => 
                              {
                                return item.item.id !== user.id
                              }
                          )
                            form.setFieldsValue({
                              objectPerson: newArr,
                            });
                            return newArr;
                          });
                        }}>
                            <CloseCircleOutlined
                              style={{
                                fontSize: "22px",
                                color: colors.textBase,
                              }}
                            />
                          </div>:<></>
                          }
                          <div className="flex items-start space-x-5">
                            <div className="w-[150px] h-[150px] overflow-hidden flex justify-center items-center border border-white">
                              <img
                                src={user.image ? user.image : images.noImage}
                                alt="avatar"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div className="flex flex-col">
                              <TileRender title="ID" value={user.id} />
                              <TileRender
                                title={"Mã định danh"}
                                value={user.soCmt}
                              />
                              <TileRender
                                title="Họ và Tên"
                                value={user.hoVaTen ? user.hoVaTen : "-"}
                              />
                              <TileRender
                                title="Giới tính"
                                value={user.gioiTinh ? user.gioiTinh : "-"}
                              />
                              <TileRender
                                title="Ngày Sinh"
                                value={user.namSinh ? user.namSinh : "-"}
                              />
                              <TileRender
                                title="Địa chỉ"
                                value={user.queQuan ? user.queQuan : "-"}
                              />
                              <TileRender
                                title="Quốc tịch"
                                value={
                                  user.quocTich
                                    ? user.quocTich
                                    : "-"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className="col-span-6 h-max">
                <div className="flex space-x-2 pl-3 pb-4">
                  <CaretDownOutlined
                    style={{ fontSize: "22px", color: colors.textBase }}
                  />
                  <p style={{ color: colors.textBase, fontWeight: "bold" }}>
                    Danh sách phương tiện
                  </p>
                </div>
                <div className="overflow-auto h-[78vh] scroll_default">
                  {dataVehicles?.map((vehicles, index) => {
                    return (
                      <div
                        key={index}
                        className="py-5 m-4 px-2 relative"
                        style={{ background: colors.bg_input }}
                      >
                        {!edit?
                        <div className="absolute top-1 right-1 cursor-pointer"
                        onClick={()=>{
                          setDataVehicles((prevData) => prevData.filter((item) => item.id !== vehicles.id));
                          setSelectedValuesVehicle((prevData) =>{
                            const newArr = prevData.filter((item) => {
                              return item.item.id !== vehicles.id
                            })
                            form.setFieldsValue({
                              objectVehicle: newArr,
                            });
                            return newArr;
                          });
                        }}
                        >
                          <CloseCircleOutlined
                            style={{
                              fontSize: "22px",
                              color: colors.textBase,
                            }}
                          />
                        </div>:<></>
                        }
                        <div className="flex items-start space-x-5">
                          <div className="w-[150px] h-[150px] overflow-hidden flex justify-center items-center border border-white">
                            <img
                              src={vehicles.image ? vehicles.image : images.noImage}
                              alt="avatar"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <TileRender title="ID" value={vehicles.id} />
                            <TileRender
                              title="Biển số xe"
                              value={vehicles.number_plate}
                            />
                            <TileRender
                              title="Màu xe"
                              value={vehicles.color ? vehicles.color : ""}
                            />
                            <TileRender
                              title="Hãng xe"
                              value={vehicles.brand ? vehicles.brand : ""}
                            />
                            <TileRender
                              title="Loại xe"
                              value={vehicles.body_style ? vehicles.body_style : ""}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!edit?
        <div
          className="w-full h-[6vh] items-center justify-center flex "
          style={{ background: colors.bg_input }}
        >
          <CustomButtonCommon
            color={"white"}
            width="86px"
            backgroundColor={"rgb(181, 18, 46)"}
            text="Lưu"
          />
          <div className="w-2"></div>
          <CustomButtonCommon
            backgroundColor={"transparent"}
            color={"#B5122E"}
            width="64px"
            text="Hủy"
          />
        </div>
        :
        ''}
      </div>
    </div>
  );
};
export default GroupEvent;
