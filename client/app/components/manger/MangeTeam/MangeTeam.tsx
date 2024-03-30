"use client";
import React, { FC, useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/users/userApi";
import { styles } from "../../../styles/style";
import toast from "react-hot-toast";
import GroupsIcon from "@mui/icons-material/Groups";
import SignUP from "../AuthManger/SignUp";

type Props = {
  isTeam: boolean;
  isSignup?: boolean;
};

const MangeTeam: FC<Props> = ({ isTeam, isSignup }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("manger");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [updateUserRole, { isSuccess, error: updateError }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

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
    { field: "universities", headerName: "Universities mange", flex: 0.5 },
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

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "manger");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          universities: item.universities.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          universities: item.universities.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className={``}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={`20px`}>
          {isSignup && (
            <div
              className={`!w-full 800px:!w-[75%] h-full bg-transparent  mx-auto`}
            >
              <SignUP refetch={refetch} />
            </div>
          )}
          <h2 className=" leading-[150%] font-semibold flex justify-center items-center gap-2 border p-2 rounded-full text-black dark:text-white mb-8 w-full 800px:w-[50%]  mx-auto text-[18px]">
            <div className={`flex justify-center items-center`}>
              <GroupsIcon fontSize="large" />
            </div>
            All Managers
          </h2>
          {isTeam ? (
            <div className={`w-full flex justify-end`}>
              <div
                className={`${styles.button} !h-[35px] !w-[200px] rounded-[10px] `}
                onClick={() => setActive(!active)}
              >
                Edit member role
              </div>
            </div>
          ) : (
            <></>
          )}
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
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none`}
              >
                <h1 className={`${styles.title}`}>Edit member role</h1>
                <div className={`mt-4`}>
                  <input
                    type={`email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${styles.input}`}
                  />
                  <select
                    className={`${styles.input} !mt-6 dark:bg-slate-900`}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="manger">Manger</option>
                    <option value="university">University</option>
                    <option value="faculty">Faculty</option>
                    <option value="department">Department</option>
                    <option value="professor">Professor</option>
                    <option value="student">Student</option>
                    <option value="user">User</option>
                  </select>
                  <br />
                  <div
                    className={`${styles.button} my-6 !h-[30px]`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none text-[18px]`}
              >
                <h1 className={`${styles.title} !text-[18px]`}>
                  Are you sure you want to delete this user?
                </h1>
                <div
                  className={`flex w-full items-center justify-between mb-6 mt-4`}
                >
                  <div
                    className={`${styles.button} !w-fit p-1 bg-[#9e9e9e29] dark:!text-white !text-black`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-fit p-1 bg-[crimson]`}
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

export default MangeTeam;
