import { Image } from 'antd';
import  { useState } from 'react';
import { CalendarIcon, MoreIcon, WalletIcon } from '../../assets/icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Heading from '../../components/Heading';

const Home = () => {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="containers space-y-4 flex flex-col gap-[25px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px]">
            <Image
              src="https://i.pinimg.com/736x/25/33/8f/25338f488af2c45912c15ebab325e363.jpg"
              alt="avatar"
              className="w-[40px] h-[40px] rounded-full"
              width={40}
              height={40}
            />
          </div>
          <h2>Username</h2>
        </div>
        <CalendarIcon/>
      </div>

      <div className="w-[360px] h-[88px] bg-[#30AF49] rounded-[20px] p-4 relative text-white">
        <button
          onClick={() => setShowInfo(prev => !prev)}
          className="absolute top-9 right-3 text-white"
        >
          {showInfo ? <FaEyeSlash /> : <FaEye />}
        </button>

        {showInfo ? (
          <div className=' text-center'>
            <p className="text-lg font-bold">135 214 200 so‘m</p>
            <p className="text-sm">Umumiy nasiya:</p>
          </div>
        ) : (
          <div className='text-center'>
            <p className="text-lg font-bold">••••••••</p>
            <p className="text-sm">Umumiy nasiya:</p>
          </div>
        )}
      </div>

      <div className='flex justify-between'>
        <div className='w-[170px] h-[127px] border-[1px] border-[#ECECEC] rounded-[16px] p-[16px] flex flex-col gap-[20px]'>
          <p>Kechiktirilgan <br /> to‘lovlar</p>
          <Heading children='1' tag='h2' classList='text-[#F94D4D]'/>
        </div>
        <div className='w-[170px] h-[127px] border-[1px] border-[#ECECEC] rounded-[16px] p-[16px] flex flex-col gap-[20px]'>
            <p>Mijozlar <br /> soni</p>
            <Heading children='1' tag='h2' classList='text-[#30AF49]'/>
        </div>
      </div>

      <div className='flex flex-col gap-[27px]'>
        <Heading children='Hamyoningiz' tag='h2' classList='!text-[18px]'/>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <WalletIcon/>
            <div>
              <p>Hisobingizda</p>
              <Heading children='300 000 so‘m' tag='h1'/>
            </div>
          </div>
          <MoreIcon/>
        </div>
        <div className='flex items-center justify-between'>
          <p>Bu oy uchun to‘lov:</p>
          <p>To‘lov qilingan</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
