"use client";
import DefaultLayout from "@/components/layouts/default-layout";
import ListUsersScreen from "@/screens/users/list-users-screen";

const MainListUsers = () => {
  return (
    <DefaultLayout>
      <ListUsersScreen />
    </DefaultLayout>
  );
};

export default MainListUsers;
