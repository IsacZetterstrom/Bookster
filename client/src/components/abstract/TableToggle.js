import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
function TableToggle() {
  const navigate = useNavigate();
  return (
    <div className="table-toggle-container">
      <CustomButton
        name="Books"
        onClick={() => {
          navigate("/library");
        }}
        type="button"
      />
      <CustomButton
        name="Users"
        onClick={() => {
          navigate("/users");
        }}
        type="button"
      />
    </div>
  );
}

export default TableToggle;
