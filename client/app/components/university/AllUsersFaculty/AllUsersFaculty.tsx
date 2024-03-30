"use client";
import React, { FC, useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserFacultyMutation,
  useGetAllUsersFacultyQuery,
  useUpdateUserRoleFacultyMutation,
} from "../../../../redux/features/users/userFacultyApi";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import { styles } from "../../../styles/style";
import toast from "react-hot-toast";
import SignUpFaculty from "../CreateFaculty/SignUpFaculty";
import { LiaUniversitySolid } from "react-icons/lia";

type Props = { isSignUp?: boolean };

const AllUsersFaculty: FC<Props> = ({ isSignUp }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { data: userData } = useLoadUserQuery(undefined, {});

  const { isLoading, data, error, refetch } = useGetAllUsersFacultyQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [updateUserRole, { isSuccess, error: updateError }] =
    useUpdateUserRoleFacultyMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserFacultyMutation();

  const matchingUsers = data?.users?.filter(
    (user: any) => user?.userCreatedById === userData?.user?._id
  );

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }

    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (deleteSuccess) {
      refetch();
      toast.success("User Deleted successfully");
      setOpen(!open);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, updateError, deleteSuccess, deleteError]);

  const colums = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "departments", headerName: "Departments", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className={`dark:text-white text-black`}
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail
                className={`dark:text-white text-black`}
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isSignUp) {
    matchingUsers &&
      matchingUsers.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          departments: item.departments.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data?.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          departments: item.departments.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className={`mt-[20px]`}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={`20px`}>
          {isSignUp && (
            <div
              className={`w-full 800px:w-[75%] h-full bg-transparent mt-[80px] mx-auto`}
            >
              <SignUpFaculty />
            </div>
          )}
          <h2 className=" leading-[150%] font-semibold flex justify-center items-center gap-2 border p-2 rounded-full text-black dark:text-white mb-8 w-full 800px:w-[50%] mx-auto text-[18px]">
            <div className={`flex justify-center items-center`}>
              <LiaUniversitySolid size={35} />
            </div>
            All Faculties
          </h2>
          <Box
            m={`10px 0 0 0`}
            height={`80vh`}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#fff",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#fff !important",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#FFF",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#0095f6" : "#0095f6",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#0095f6" : "#0095f6",
                borderTop: "none",
                color: theme === "dark" ? "#fff !important" : "#fff !important",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: theme === "dark" ? `#fff !important` : `#000 !important`,
              },
            }}
          >
            <DataGrid
              // checkboxSelection
              rows={rows}
              columns={colums}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none`}
              >
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div
                  className={`flex w-full items-center justify-between mb-6 mt-4`}
                >
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsersFaculty;
