import Map from "../vehicle/map";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageEvent from "../vehicle/image-event";
import colors from "@constants/colors";
import { Carousel } from "react-responsive-carousel";
import InforVehicle from "../vehicle/information";
import { Tooltip } from "antd";
import InforPerson from "./infor-person";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "@constants/action";
import { selectListEventProfile } from "@redux/slice/person-slice";
const ViewPerson = () => {
  const location = useLocation();
  const idPerson = location.pathname.split("/")[5];
  const dispatch = useDispatch();
  const listEventProfile = useSelector(selectListEventProfile);
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
  const [selectItem,setSelectItem]= useState(0)
  const itemInit = useRef(0)
  useEffect(() => {
    filterRefEvent.current.soCmts = idPerson;
    const callBack = (data) => {};
    dispatch({
      type: TYPE_ACTION.PROFILE.GET_EVENT_PROFILE,
      payload: { body: filterRefEvent.current, callBack },
    });
  }, [idPerson]);
  const data = {
    imageFull:
      "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984721/35c3fc79-6ee7-4df6-8f9d-f6a88742eade.jpg",
    imageCrop:
      "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984752/b27fe64f-c418-4bb6-896f-d19aa717d77d.jpg",
    imageBSX:
      "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984774/7273dadf-aabb-4069-a519-98d360f5b9b6.jpg",
  };
  function CustomCarouselItem(e,h) {
    return <ImageEvent data={listEventProfile[e.props.children.props.alt]}/>;
  }  
  const handleKeyPress = (event) => { 
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      if(itemInit.current<listEventProfile.length-1)
        itemInit.current++
        setSelectItem(itemInit.current)
      } 
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      if(itemInit.current>0){
        itemInit.current--;
        setSelectItem(itemInit.current)
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [listEventProfile]);
  return (
    <div className="w-full p-2 overflow-auto h-[94vh] scroll_default space-y-5">
      <div className="flex space-x-5 w-full">
        <div className="h-[700px] w-[70%] space-y-5">
          <div className="p-2" style={{ background: colors.bg_input }}>
            <p
              style={{ color: colors.textBase }}
              className="uppercase font-semibold my-2"
            >
              Thông tin hồ sơ
            </p>
            <InforPerson data={data} />
          </div>
          <div
            className="p-2 w-full h-[700px]"
            style={{ background: colors.bg_input }}
          >
            <p
              style={{ color: colors.textBase }}
              className="uppercase font-semibold my-2"
            >
              Lịch sử nhận diện
            </p>
            <Carousel
              showArrows={false}
              showThumbs={true}
              infiniteLoop={true}
              showIndicators={false}
              thumbWidth={130}
              showStatus={false}
              selectedItem={selectItem}
              renderItem={CustomCarouselItem}
              onClickThumb={(e,h)=>{
              }}      
            >
              {listEventProfile.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ height: "120px", width: "120px" }}
                    className="flex flex-col justify-center items-center"
                    
                  >
                    <img
                      src={item.crop_image}
                      alt={index}
                      style={{ height: "100%", width: "auto" }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
        <div
          className="h-[1018px] w-[30%] overflow-hidden p-2"
          style={{ background: colors.bg_input }}
        >
          <p
            style={{ color: colors.textBase }}
            className="uppercase font-semibold my-2"
          >
            Vị trí nhận diện
          </p>
          <Map />
        </div>
      </div>
    </div>
  );
};
export default ViewPerson;
