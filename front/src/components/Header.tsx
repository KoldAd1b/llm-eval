"use client";
import Prompt from "./Prompt";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  const Router = useRouter();
  return (
    <div className="w-full min-h-[80px]  flex justify-center relative h-[250px]">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2)_0%,transparent_100%)] bg-repeat-x"></div>
      </div>
      <h1 className="z-10 mt-20 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/5 to-blue-50 text-center animate-flicker">
        Evaluator
      </h1>

      <div className="z-10 flex flex-col justify-center absolute -bottom-[50%] w-full md:w-1/2 p-4 gap-y-1 bg-black/90  backdrop-blur-md rounded-lg shadow-lg ">
        <Prompt clickFn={() => Router.push("/dashboard")} />
      </div>
    </div>
  );
};

export default Header;
