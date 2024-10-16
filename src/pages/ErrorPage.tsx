import { useRouteError } from "react-router-dom";

interface CustomError extends Error {
  status?: number;
  statusText?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as CustomError;
  console.log(error);

  return (
    <div id="error-page" className="flex justify-center items-center flex-col h-screen gap-2">
      <h1 className="text-3xl font-bold"> Oops!</h1>
      <p className="font-light">Sorry, an unexpected error has occurred.</p>
      <p className="font-medium">
        <i>{error?.statusText || error?.message || "Unknown error"}</i>
      </p>
    </div>
  );
}
