import Alert from "./Alert";

const AlertList = (props) => {
  return (
    <div className="fixed bottom-6 left-[50%] z-40 -ml-36 flex flex-col-reverse space-y-2 space-y-reverse bg-transparent sm:-ml-48 ">
      {props.alerts.map((item) => (
        <Alert
          status={item.status}
          message={item.message}
          id={item.id}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default AlertList;
