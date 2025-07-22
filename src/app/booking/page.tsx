import Home from "@/containers/home";
import React from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { agentCode?: string; slot?: string };
}) => {
  const { agentCode, slot } = searchParams;

  return <Home agentCode={agentCode} slot={slot} />;
};

export default Page;
