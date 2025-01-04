import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <main className="mt-24 px-6 ">{children}</main>;
};

export default Layout;
