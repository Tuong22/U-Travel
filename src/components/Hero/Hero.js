import Tabbar from './Tabbar/Tabbar'

export const Hero = ({ banner, onClickSearch }) => {
  return (
    <div className='flex items-end justify-center w-full h-[600px] relative overflow-hidden'>
      <div className='absolute inset-0'>
        <img
          src={banner}
          alt="Banner"
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black opacity-20' />
      </div>
      <div className='mb-16 relative z-10'>
        <Tabbar onClickSearch={onClickSearch} />
      </div>
    </div>
  );
};
