import { CircularProgress } from "@mui/material";

function Loader() {
  return (
    <div style={{ width: "100%", textAlign: "center", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <CircularProgress />
    </div>
  );
}

export default Loader;
