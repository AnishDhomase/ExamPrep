import { ProgressBar } from "react-loader-spinner";

function PageLoader() {
  return (
    <div className="pageLoaderBox">
      <ProgressBar
        visible={true}
        height="120"
        width="120"
        ariaLabel="progress-bar-loading"
        barColor="blue"
        borderColor="rgb(207, 201, 201)"
      />
    </div>
  );
}

export default PageLoader;
