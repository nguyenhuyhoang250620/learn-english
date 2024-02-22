import { LoadingOutlined } from '@ant-design/icons';

const PageLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingOutlined
        style={{
          fontSize: 40,
          color:"black"
        }}
        spin
      />
    </div>
  );
};

export default PageLoader;
