import { Input, Button } from "antd";
import { useState } from "react";
const InstructPage = () => {
  const [listTest,setlistTest] = useState([{
    name:"1"
  }]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const onClickAdd = () => {
    if (!search.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setlistTest([{ name: search }, ...listTest]);
    setSearch("");
  };
  return (
    <div className="h-screen w-full bg-white p-[20px] space-y-[20px]">
      <h1 className="text-2xl font-bold">Bài thi thông tin hồ sơ</h1>
      <Input
        placeholder="Tên"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        status={error ? "error" : ""} // Hiển thị trạng thái lỗi
      />
      <Button type="primary" className="bg-black" onClick={() => onClickAdd()}>
        Thêm mới
      </Button>
      <div className="flex flex-wrap gap-10 overflow-auto h-[60vh] bg-black">
        {listTest.reverse().map((item, index) => {
          return (
            <div
              key={index}
              className="w-[200px] h-[200px] bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer"
            >
              <div className="mt-4 text-center text-gray-600 text-sm">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default InstructPage;
