import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const Alert = (props) => {
  const dispatch = useDispatch();
  const id = props.id;
  let statusIcon;
  let statusColor;
  const size = 1.8;

  switch (props.status) {
    case "success":
      statusIcon = <SuccessIcon size={size} />;
      statusColor = "bg-emerald-300";
      break;
    case "info":
      statusIcon = <InfoIcon size={size} />;
      statusColor = "bg-blue-300";
      break;
    case "warning":
      statusIcon = <WarningIcon size={size} />;
      statusColor = "bg-yellow-200";
      break;
    case "error":
      statusIcon = <ErrorIcon size={size} />;
      statusColor = "bg-rose-300";
      break;
    default:
      statusIcon = <InfoIcon size={size} />;
      statusColor = "bg-teal-300";
  }

  const title =
    props.status.substring(0, 1).toUpperCase() + props.status.substring(1);

  const popHandler = () => {
    dispatch(uiActions.removeAlert(id));
  };

  return (
    <div
      className={`flex animate-alertTimerFade flex-col rounded-md bg-opacity-80 ${statusColor} `}
    >
      <div className="flex h-10 w-72 flex-row items-center justify-between px-1 py-8 sm:w-96 sm:px-4">
        {statusIcon}
        <div className="flex w-52 flex-col items-start justify-between sm:w-72">
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm">{props.message}</p>
        </div>
        <button
          className="bg-transparent text-center text-3xl"
          onClick={popHandler}
        >
          ×
        </button>
      </div>
      <div className="mx-auto mb-px h-0.5 w-[calc(100%-2px)] origin-left animate-alertTimerScale rounded-full bg-gradient-to-r from-indigo-500 to-pink-500" />
    </div>
  );
};

export default Alert;

const SuccessIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 1024 1024"
    >
      <path
        fill="currentColor"
        d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
      ></path>
    </svg>
  );
};
const InfoIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.713T12 11q-.425 0-.713.288T11 12v4q0 .425.288.713T12 17Zm0-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      ></path>
    </svg>
  );
};
const WarningIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-8 56a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
      ></path>
    </svg>
  );
};
const ErrorIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size + "em"}
      height={props.size + "em"}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m9.225 12.425l1.45 1.975q.15.2.4.2t.4-.2l1.45-1.975L14.35 14.4q.15.2.413.2t.412-.2l2.25-3.075q.25-.35.188-.75t-.413-.65q-.35-.25-.75-.188t-.65.413l-1.05 1.425L13.325 9.6q-.15-.2-.413-.2t-.412.2l-1.425 1.975L9.625 9.6q-.15-.2-.4-.2t-.4.2l-2.25 3.075q-.25.35-.188.75t.413.65q.35.25.75.188t.65-.413l1.025-1.425ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      ></path>
    </svg>
  );
};
