import React from "react";
import Pathway from "./Pathway";
import RightCol from "./right_col";
import Eligibility from "./Eligibility";
import Statutory from "./Statutory";
import Approved from "./Approved";

const Asymmetric = () => {
  return (
    <div className="mx-auto flex min-h-[1713px] w-full flex-col px-5 pt-6">
      <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2.5fr)_minmax(320px,1fr)]">
        <div className="lg:col-start-1 lg:row-start-1">
          <Pathway />
        </div>

        <div className="lg:col-start-2 lg:row-span-4 lg:row-start-1">
          <RightCol />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <Eligibility />
        </div>

        <div className="lg:col-start-1 lg:row-start-3">
          <Statutory />
        </div>

        <div className="lg:col-start-1 lg:row-start-4">
          <Approved />
        </div>
      </div>
    </div>
  );
};

export default Asymmetric;
