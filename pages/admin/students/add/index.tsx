import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/DashboardLayout";
import AddStudentComponent from "../../../../components/Students/addStudent";

export default function AddStudentPage() {
  const router = useRouter();
  useEffect(() => {
    
  }, []);

  return (
    <AddStudentComponent/>
  );
}
