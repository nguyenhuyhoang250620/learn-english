import { useNavigate } from "react-router";
const MainLayout = () => {
  const listCardView = Array(6).fill(null);
  const navigate = useNavigate();
  const handleClickCard = (item) => {
    console.log(item);
    navigate(`/word-management`);
  };
  return (
    <div className="h-screen w-screen bg-white  flex items-center justify-center">
      <div className="grid grid-cols-3 gap-10">
        {listCardView.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[250px] h-[250px] bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleClickCard(index)}
            >
              <div className="mt-4 text-center text-gray-600 text-sm">
                {`View ${index + 1}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MainLayout;
