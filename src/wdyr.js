import wdyr from "@welldone-software/why-did-you-render";
import env from "env";
import React from "react";

if (!env.PROD) {
  wdyr(React);
}
