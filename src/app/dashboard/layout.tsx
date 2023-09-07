import { Layout } from "`@/components`";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

export default layout;
