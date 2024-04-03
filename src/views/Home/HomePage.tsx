import { FC } from "react";
import reactLogo from "../../assets/react.svg";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { setCount } from "../../redux/slices/AuthSlice";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.auth);
  const handleCheckRedux = () => {
    dispatch(setCount(1));
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>Project Structure by Deepak Babani 🙏</div>
      <div className="card">
        <button onClick={handleCheckRedux}>
          count (from Redux) is {count}
        </button>
      </div>
    </>
  );
};

export default HomePage;
