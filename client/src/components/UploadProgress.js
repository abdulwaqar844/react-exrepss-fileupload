const Uploadprogress = ({ percentage }) => {
  return (
    <div className="progress mt-4">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${parseInt(percentage)}%` }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}
      </div>
    </div>
  );
};
export default Uploadprogress;
