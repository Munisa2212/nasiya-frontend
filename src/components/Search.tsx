
import { SearchOutlined } from '@ant-design/icons'; 

const CustomSearch = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  return (
    <div className="flex items-center gap-2 bg-[#F9F9F9] border border-gray-200 rounded-[12px] px-4 py-2 w-[310px] max-w-md">
      <SearchOutlined className="text-gray-500 text-xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Mijozlarni qidirish..."
        className="bg-transparent outline-none text-gray-700 w-full placeholder:text-gray-400"
      />
    </div>
  );
};

export default CustomSearch;
