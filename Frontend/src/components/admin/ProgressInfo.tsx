export default function ProgressInfo({
  icon,
  titleText,
  text,
}: {
  icon: JSX.Element;
  titleText: string;
  text: string;
}) {
  return (
    <div className="col-4 d-flex align-items-center">
      {icon}
      <div className="ms-3">
        <span className="fs-6 text-secondary">{titleText}</span>
        <div className="text-primary fs-4 fw-bold">{text}</div>
      </div>
    </div>
  );
}
