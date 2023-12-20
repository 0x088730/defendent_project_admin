import { Box } from "@mui/material";
import {
    DataGrid,
    GridColDef,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { selectAccessToken } from "@/app/auth/authSlice";
import {withdrawData} from "@/app/history/withdrawData";
export interface DataType {
    id: number | null;
    name: string | null;
    category: string | null;
    age: number | null;
}
interface Props {
    setPage: any
}
const WithdrawTable = ({ setPage }: Props) => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken)
    const showData: DataType[] = useSelector(
        (state: RootState) => state.withdrawData.data
    );
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "walletAddress",
            headerName: "Wallet Address",
            flex: 2,
            editable: true,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            flex: 2,
            editable: true,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "createdAt",
            headerName: "Data",
            type: "number",
            flex: 2,
            editable: true,
            headerAlign: "center",
            align: "center",
        },
    ];
    useEffect(() => {
        dispatch(withdrawData(accessToken) as unknown as AnyAction);
    }, [accessToken]);
    return (
        <div className="pt-24">
            <Box
                sx={{
                    height: "70%",
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    overflowX: "hidden",
                }}
            >
                <div className="text-end">
                    <button className='h-10 rounded-full bg-gray-500 my-5 px-3 text-2xl text-white hover:bg-gray-400 duration-500'
                        onClick={() => setPage('main')}
                    >
                        Home
                    </button>
                </div>
                <DataGrid
                    rows={showData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 20, 40]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );

};
export default WithdrawTable;
