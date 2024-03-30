"use client";
import React, { FC, useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserStudentMutation,
  useGetAllUsersStudentQuery,
  useUpdateUserRoleStudentMutation,
} from "../../../../redux/features/users/userStudent";
import { styles } from "../../../styles/style";
import toast from "react-hot-toast";
import CustomModal from "../../../utils/CustomModal";
import SignUpFifthYearStudent from "./SignUpFifthYearStudent";
import { IoIosArrowDown, IoMdAddCircle } from "react-icons/io";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";
import { BsPatchPlus } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import {
  useUpdateStudentYearAndNameMutation,
  useUpdateStudentYearByPromoteMutation,
} from "../../../../redux/features/users/userDepartmentApi";

type Props = {};

const FifthYearStudent: FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [route, setRoute] = useState("Sign-Up");
  const [openPromote, setOpenPromote] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");
  const [openEditStudent, setOpenEditStudent] = useState(false);
  const [studentName, setStudentName] = useState("");
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [edityear, setEditYaer] = useState(userData?.user?.yearFive.yearId);

  const { isLoading, data, error, refetch } = useGetAllUsersStudentQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const matchingUsers = data?.users?.filter(
    (user: any) => user?.studentYearOfStudy === userData?.user?.yearFive?.yearId
  );

  const [updateUserRole, { isSuccess, error: updateError }] =
    useUpdateUserRoleStudentMutation();

  const [
    updateYearPromote,
    { isSuccess: PromoteSuccess, error: PromoteError },
  ] = useUpdateStudentYearByPromoteMutation();
  const [
    updateYearAndName,
    { isSuccess: editStudentSuccess, error: editStudentError },
  ] = useUpdateStudentYearAndNameMutation();

  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserStudentMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      // setActive(false);
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

    if (PromoteSuccess) {
      refetch();
      toast.success("User promoted successfully");
      setOpenPromote(false);
    }

    if (PromoteError) {
      if ("data" in PromoteError) {
        const errorMessage = PromoteError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (editStudentSuccess) {
      refetch();
      toast.success("User updated successfully");
      setOpenEditStudent(false);
    }

    if (editStudentError) {
      if ("data" in editStudentError) {
        const errorMessage = editStudentError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    updateError,
    deleteSuccess,
    deleteError,
    PromoteSuccess,
    PromoteError,
    editStudentSuccess,
    editStudentError,
  ]);

  const colums = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "year", headerName: "Year", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "   ",
      headerName: "Promote",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            {userData?.user.yearsOfStudy === 5 ? (
              <Button>
                <FaUserGraduate
                  className={`${
                    theme === "dark" ? "text-[#fff]" : "text-[#000]"
                  }`}
                  size={20}
                />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setOpenPromote(!openPromote);
                  setStudentEmail(params.row.email);
                }}
              >
                <BsPatchPlus className={`text-[#059377]`} size={20} />
              </Button>
            )}
          </>
        );
      },
    },
    {
      field: "    ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpenEditStudent(!openEditStudent);
                setStudentEmail(params.row.email);
                setStudentName(params.row.name);
              }}
            >
              <FiEdit2 className={`dark:text-white text-black`} size={20} />
            </Button>
          </>
        );
      },
    },
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

  matchingUsers &&
    matchingUsers?.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        year: 5,
        created_at: format(item.createdAt),
      });
    });

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  const handlePromote = async () => {
    const email = studentEmail;
    const studentYearOfStudy = userData?.user?.yearSix?.yearId;

    await updateYearPromote({ email, studentYearOfStudy });
  };

  const handleEditStudent = async () => {
    const email = studentEmail;
    const name = studentName;
    const studentYearOfStudy = edityear;
    await updateYearAndName({ email, name, studentYearOfStudy });
  };

  return (
    <div className={`mt-[20px] relative`}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={`20px`}>
          <div className={`w-full flex justify-end`}>
            <div
              className={`${styles.button} !w-[200px] rounded-[10px] !px-1] `}
              onClick={() => setOpenSignUp(!openSignUp)}
            >
              <IoMdAddCircle size={25} className="mx-2" />
              Add student
            </div>
          </div>
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
          {openPromote && (
            <Modal
              open={openPromote}
              onClose={() => setOpenPromote(!openPromote)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none`}
              >
                <h1 className={`${styles.title} !text-[16px]`}>
                  Are you sure you want to Promote this user to Second year?
                </h1>
                <div
                  className={`flex w-full items-center justify-between mb-6 mt-4`}
                >
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#9e9e9e29] dark:!text-white !text-black`}
                    onClick={() => setOpenPromote(!openPromote)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#059377]`}
                    onClick={handlePromote}
                  >
                    Promote
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {openEditStudent && (
            <Modal
              open={openEditStudent}
              onClose={() => setOpenEditStudent(!openEditStudent)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none`}
              >
                <br />
                <div className="relative name-input mb-2">
                  <input
                    type="text"
                    name="name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    id="name"
                    placeholder=""
                    className={`${styles.SpInput}`}
                  />
                  <label htmlFor="name" className={`${styles.SpLabel}`}>
                    Student name
                  </label>
                </div>
                <div className={`mt-4 w-full  mx-auto relative`}>
                  <IoIosArrowDown
                    size={20}
                    className={`absolute right-4 top-4 `}
                  />
                  <select
                    className={`${styles.SpInput} dark:bg-slate-900 font-Popins cursor-pointer `}
                    onChange={(e) => setEditYaer(e.target.value)}
                  >
                    {userData?.user?.yearsOfStudy === 1 && (
                      <>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                      </>
                    )}
                    {userData?.user?.yearsOfStudy === 2 && (
                      <>
                        <option value={userData?.user?.yearTwo?.yearId}>
                          Second year
                        </option>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                      </>
                    )}
                    {userData?.user?.yearsOfStudy === 3 && (
                      <>
                        <option value={userData?.user?.yearThree?.yearId}>
                          Third year
                        </option>
                        <option value={userData?.user?.yearTwo?.yearId}>
                          Second year
                        </option>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                      </>
                    )}
                    {userData?.user?.yearsOfStudy === 4 && (
                      <>
                        <option value={userData?.user?.yearFour?.yearId}>
                          Fourth year
                        </option>
                        <option value={userData?.user?.yearThree?.yearId}>
                          Third year
                        </option>
                        <option value={userData?.user?.yearTwo?.yearId}>
                          Second year
                        </option>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                      </>
                    )}
                    {userData?.user?.yearsOfStudy === 5 && (
                      <>
                        <option value={userData?.user?.yearFive?.yearId}>
                          Fifth year
                        </option>
                        <option value={userData?.user?.yearFour?.yearId}>
                          Fourth year
                        </option>
                        <option value={userData?.user?.yearThree?.yearId}>
                          Third year
                        </option>
                        <option value={userData?.user?.yearTwo?.yearId}>
                          Second year
                        </option>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                      </>
                    )}
                    {userData?.user?.yearsOfStudy === 6 && (
                      <>
                        <option value={userData?.user?.yearFive?.yearId}>
                          Fifth year
                        </option>
                        <option value={userData?.user?.yearFour?.yearId}>
                          Fourth year
                        </option>
                        <option value={userData?.user?.yearThree?.yearId}>
                          Third year
                        </option>
                        <option value={userData?.user?.yearTwo?.yearId}>
                          Second year
                        </option>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                        <option value={userData?.user?.yearSix?.yearId}>
                          Sixth year
                        </option>
                      </>
                    )}
                    {userData?.user?.yearsOfStudy === 7 && (
                      <>
                        <option value={userData?.user?.yearFive?.yearId}>
                          Fifth year
                        </option>
                        <option value={userData?.user?.yearFour?.yearId}>
                          Fourth year
                        </option>
                        <option value={userData?.user?.yearThree?.yearId}>
                          Third year
                        </option>
                        <option value={userData?.user?.yearTwo?.yearId}>
                          Second year
                        </option>
                        <option value={userData?.user?.yearOne?.yearId}>
                          First year
                        </option>
                        <option value={userData?.user?.yearSix?.yearId}>
                          Sixth year
                        </option>
                        <option value={userData?.user?.yearSeven?.yearId}>
                          Seventh year
                        </option>
                      </>
                    )}
                  </select>
                  <br />
                </div>
                <div
                  className={`flex w-full items-center justify-between mb-6 mt-4`}
                >
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#9e9e9e29] dark:!text-white !text-black`}
                    onClick={() => setOpenEditStudent(!openEditStudent)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#0095f6]`}
                    onClick={handleEditStudent}
                  >
                    Update
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
      {route === "Sign-Up" && (
        <>
          {openSignUp && (
            <CustomModal
              open={openSignUp}
              setOpen={setOpenSignUp}
              setRoute={setRoute}
              component={SignUpFifthYearStudent}
              refetch={refetch}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FifthYearStudent;
