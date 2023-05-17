const Notification = (props) => {
  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = "bg-[#690000]";
  }
  if (props.status === "success") {
    specialClasses = "bg-[#1ad1b9]";
  }

  const cssClasses = `flex h-12 w-full items-center justify-between bg-[#1a8ed1] py-2 px-[10%] text-white ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2 className="m-0 text-base">{props.title}</h2>
      <p className="m-0 text-base">{props.message}</p>
    </section>
  );
};

export default Notification;
