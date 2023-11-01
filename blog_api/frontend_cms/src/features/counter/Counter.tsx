import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { counterActions } from "./counterSlice";

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(counterActions.increment());
        }}
      >
        count
      </button>
    </div>
  );
};
