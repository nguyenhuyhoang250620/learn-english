import Map from "./map";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageEvent from "./image-event";
import colors from "@constants/colors";
import { Carousel } from "react-responsive-carousel";
import InforVehicle from "./information";
import { Tooltip } from "antd";
const ViewVehicle = () => {
  const data = {
    imageFull:
      "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984721/35c3fc79-6ee7-4df6-8f9d-f6a88742eade.jpg",
    imageCrop:
      "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984752/b27fe64f-c418-4bb6-896f-d19aa717d77d.jpg",
    imageBSX:
      "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984774/7273dadf-aabb-4069-a519-98d360f5b9b6.jpg",
  };
  const listImage = Array(10).fill(
    "https://minio.gpstech.vn/images/vehicle/df7b465f-d9ef-4577-b700-a6e275b76560/2024_05_03/14_56/1714722984752/b27fe64f-c418-4bb6-896f-d19aa717d77d.jpg"
  );
  const renderThumbs = (children) =>
    children.map((item, index) => {
      return (
        <Tooltip key={index} title="04-05-2024 9:42">
          <div
            style={{ height: "120px", width: "120px"}}
            className="flex flex-col justify-center items-center"
          >
            <img
              src={item.props.children.props.src}
              alt={`Thumb ${index}`}
              style={{ height: "100%", width: "auto" }}
            />
          </div>
        </Tooltip>
      );
    });
  function CustomCarouselItem({ item }) {
    return <ImageEvent data={data} />;
  }
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
            <InforVehicle data={data} />
          </div>
          <div className="p-2 w-full h-[700px]" style={{ background: colors.bg_input }}>
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
              thumbWidth={120}
              showStatus={false}
              selectedItem={0}
              renderThumbs={renderThumbs}
              renderItem={(item) => <CustomCarouselItem item={item} />}
            >
              {listImage.map((item, index) => {
                return (
                  <div key={index} style={{ height: "100px"}}>
                    <img
                      src={item}
                      style={{ height: "100px", width: "auto" }}
                      alt=""
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
            Cung đường nhận diện
          </p>
          <Map />
        </div>
      </div>
    </div>
  );
};
export default ViewVehicle;
