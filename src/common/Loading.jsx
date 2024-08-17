import { ThreeDots } from "react-loader-spinner";

function Loading({ width = "75", heigh = "40", white = false }) {
  return (
    <ThreeDots
      height={heigh}
      width={width}
      radius="9"
      color={white ? "#fff" : "var(--cyan-green)"}
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={true}
    />
  );
}
export default Loading;
