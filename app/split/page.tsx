import AppBar from "@/components/split/AppBar";
import Index from "@/components/split/Index";

import { ReactElement } from "react";

export default function SplitPage(): ReactElement {
  return (
    <>
      <AppBar></AppBar>
      <Index></Index>
    </>
  );
}
