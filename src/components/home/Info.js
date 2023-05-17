import { infoData } from "../../assets/DummyData";

const Info = () => {
  return (
    <section
      id="info"
      className="my-8 flex flex-col items-center justify-center space-y-7"
    >
      <h1 className="text-center text-2xl underline decoration-orange-500 underline-offset-[7px] md:mt-10 md:text-3xl">
        Watch How It Works
      </h1>
      <div className="flex w-10/12 flex-col items-center justify-around space-y-5 md:h-96 md:flex-row md:space-y-0">
        {infoData.map((item) => (
          <InfoComponents
            align={item.align}
            src={item.src}
            alt={item.alt}
            mainText={item.mainText}
            subText={item.subText}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
};

const InfoComponents = (props) => {
  return (
    <div
      className={`flex max-w-fit flex-row items-center justify-center space-x-4 whitespace-nowrap
                  rounded-2xl bg-blue-50 px-6 py-4 shadow-md md:h-80 md:w-3/12 md:flex-col 
                  md:py-0 md:px-8 ${props.align} transition hover:-translate-y-2 hover:scale-105`}
    >
      <img className="w-20 md:mb-4 md:w-40" src={props.src} alt={props.alt} />
      <div className="text-left md:text-center">
        <h3 className="mb-1 font-pop text-base font-bold text-for md:text-lg">
          {props.mainText}
        </h3>
        <p className="text-xs text-[#525252] opacity-80">{props.subText}</p>
      </div>
    </div>
  );
};

export default Info;
