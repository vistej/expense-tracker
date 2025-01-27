import { FC } from "react";
import { MESSAGES } from "../constants";

const Loading: FC = () => {
  return (<div className="h-screen flex justify-center items-center">{MESSAGES.loading}</div>);
}

export default Loading;