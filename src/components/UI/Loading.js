const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 z-40 h-screen w-screen bg-[#00000050]" />
      <div className="fixed left-[50%] z-50 my-12 mx-auto -ml-20 flex items-center justify-center text-center">
        <div className="relative inline-block h-40 w-40 after:m-10 after:block after:h-20 after:w-20 after:animate-loadSpin after:rounded-full after:border-[6px] after:border-t-orange-800 after:border-l-orange-600 after:border-b-orange-400 after:border-r-transparent " />
        <div className="fixed inline-block h-40 w-40 after:m-[52px] after:block after:h-14 after:w-14 after:animate-loadSpinReverse after:rounded-full after:border-[6px] after:border-t-orange-800 after:border-l-orange-600 after:border-b-orange-400 after:border-r-transparent " />
      </div>
    </>
  );
};

export default Loading;

// @keyframes spinner {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
