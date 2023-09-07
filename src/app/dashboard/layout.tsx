import React from "react";
import { Layout } from "`@/components`";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

export default layout;
