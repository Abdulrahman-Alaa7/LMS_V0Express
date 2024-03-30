"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesForProfessorQuery,
} from "../../../../redux/features/courses/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "../../../styles/style";
import toast from "react-hot-toast";
import Link from "next/link";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice";

type Props = {};

const AllCourses: FC<Props> = (props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { data: userData } = useLoadUserQuery(undefined, {});
  const { isLoading, data, refetch } = useGetAllCoursesForProfessorQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();

  const matchingUsersCourses = data?.courses?.filter(
    (course: any) => course?.user?._id === userData?.user?._id
  );

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully");
      setOpen(!open);
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const colums = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1.5 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/edit-course/${params.row.id}`}>
              <FiEdit2 className={`dark:text-white text-black`} size={20} />
            </Link>
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
                setCourseId(params.row.id);
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
  ];

  const rows: any = [];

  matchingUsersCourses &&
    matchingUsersCourses?.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.courseTitle,
        purchased: item.purchased,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`mt-[10px]`}>
          {isLoading ? (
            <Loader />
          ) : (
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
                  color:
                    theme === "dark" ? "#fff !important" : "#fff !important",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color:
                    theme === "dark" ? `#fff !important` : `#000 !important`,
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
          )}
        </div>
      )}
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
            <h1 className={`${styles.title} !text-[18px]`}>
              Are you sure you want to delete this item?
            </h1>
            <div
              className={`flex w-full items-center justify-between mb-6 mt-4`}
            >
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#9e9e9e29] !text-black dark:!text-white`}
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
    </>
  );
};

export default AllCourses;
