import { Modal } from "antd";
import ConfigProvider from "antd/es/config-provider";
import colors from "@constants/colors";
import { IoClose } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListEventAll } from "@redux/slice/event-slice";
import HumanModal from "../content/human-modal";
import { selectCollapse, selectViewEvent } from "@redux/slice/view-event-slice";
import TYPE_ACTION from "@constants/action";
import TrafficModal from "../content/traffic-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const CustomViewEvent = () => {
    // -- State
    const [key, setKey] = useState(0);
  
    // -- Dispatch
    const dispatch = useDispatch();
  
    // -- Selectors
    const open = useSelector(selectCollapse);
    const data = useSelector(selectViewEvent);
    const eventAll = useSelector(selectListEventAll);
  
    useEffect(() => {
      const handlePopstate = (event) => {
        dispatch({
          type: TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
          payload: false,
        });
      };
  
      window.addEventListener("popstate", handlePopstate);
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }, []);
  
    const handleCancel = () => {
      dispatch({
        type: TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
        payload: false,
      });
    };
  
    function renderCase(event_type, item) {
          if (event_type === "HUMAN") {
            return (<HumanModal data={item} />);
          } else if(event_type==='ANPR'){ 
            return ( <TrafficModal data={item} />)
          } 
      }
    const [indexSelect, setIndexSelect] = useState(data.index);
  
    const handleKeyPress = (event) => {
        if (event.key === "ArrowRight") {
          setIndexSelect((pre) => {
            if (pre < eventAll.length - 1) {
              return pre + 1;
            } else {
              return (pre = eventAll.length - 1);
            }
          });
        } else if (event.key === "ArrowLeft") {
          setIndexSelect((pre) => {
            if (pre > 0) {
              return pre - 1;
            } else {
              return (pre = 0);
            }
          });
        } else if (event.key === "ArrowUp") {
          setIndexSelect((pre) => {
            if (pre > 0) {
              return pre - 1;
            } else {
              return (pre = 0);
            }
          });
        } else if (event.key === "ArrowDown") {
          setIndexSelect((pre) => {
            if (pre < eventAll.length - 1) {
              return pre + 1;
            } else {
              return (pre = eventAll.length - 1);
            }
          });
        }
      };
  
    useEffect(() => {
      setIndexSelect(data.index);
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [data]);
  
    const carouselContent = useMemo(() => {
      if (Array.isArray(eventAll)) {
        return eventAll.map((slide, index) => (
            <div key={index} style={{ border: `1px solid ${colors.textBase}`, borderBottom:'none'}}>
            <div
              className="flex justify-between items-center h-[40px] px-2"
              style={{ borderBottom: `1px solid ${colors.textBase}`,background:colors.redGlobal }}
            >
              <p className="font-bold text-[16px]">{`Sự kiện ${slide.id}`}</p>
              <IoClose
                onClick={handleCancel}
                className="cursor-pointer text-[22px]"
              />
            </div>
            {renderCase(slide.event_type, slide)}
          </div>
        ));
      } else {
        return <p>Không có dữ liệu hoặc dữ liệu không hợp lệ.</p>;
      }
    }, [eventAll]);
    return (
      <ConfigProvider
      theme={{
        token: {
          colorBgBase: colors.background,
          borderRadius: 0,
          controlItemBgHover: colors.background,
          colorText: colors.textBase,
          colorPrimary: colors.redGlobal,
          colorLink: colors.redGlobal,
          colorPrimaryBorder: colors.redGlobal,
          padding: 0,
          paddingContentHorizontal: 0,
          paddingContentHorizontalLG: 0,
          paddingContentHorizontalSM: 0,
          paddingContentVertical: 0,
          paddingContentVerticalLG: 0,
          paddingContentVerticalSM: 0,
          margin: 0,
          marginContentHorizontal: 0,
          marginContentHorizontalLG: 0,
          marginContentHorizontalSM: 0,
          marginContentVertical: 0,
          marginContentVerticalLG: 0,
          paddingLG: 0,
          paddingMD: 0,
          paddingSM: 12,
          paddingXS: 0,
          marginLG: 0,
          marginMD: 0,
          marginSM: 0,
        },
      }}
      >
        <Modal
          key={key}
          open={open}
          onCancel={handleCancel}
          width={800}
          closable={false}
          title={null}
          footer={[]}
        >
          <Carousel
            showThumbs={false}
            showStatus={false}
            selectedItem={indexSelect}
            axis="horizontal"
            showArrows={false}
            showIndicators={false}
            transitionTime={1}
          >
            {carouselContent}
          </Carousel>
        </Modal>
      </ConfigProvider>
    );
  };
  
  export default CustomViewEvent;
