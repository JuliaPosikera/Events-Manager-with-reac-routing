import MainNavigation from "../components/MainNavigation";
import PageContent from "./PageContent";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An Error occured!";
  let message = "Something went wrong!";
  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }

  if (error.status === 404) {
    message = "This page doen't exist";
  }
  return (
    <>
      <MainNavigation />
      <main>
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
      </main>
    </>
  );
}
