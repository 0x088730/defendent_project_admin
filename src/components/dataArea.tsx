import { useSelector } from "react-redux";
import CustomTable from "./customTable";
import PurchaseArea from "./purchaseArea";
import { selectLoginState } from "@/app/auth/authSlice";
import { useState } from "react";
import WithdrawTable from "./withdraws";

export default function DataArea() {
  const loginState = useSelector(selectLoginState);
  const [page, setPage] = useState('main');

  return (
    <div>
      {loginState ? (
        <>
          {page === 'main' ?
            <>
              <CustomTable setPage={setPage} />
              <PurchaseArea />
            </>
            :
            <>
              <WithdrawTable setPage={setPage} />
            </>
          }
        </>
      ) : (
        <div className="w-full h-screen text-7xl uppercase flex justify-center items-center">
          You Don't Have Permission
        </div>
      )}
    </div>
  );
}
