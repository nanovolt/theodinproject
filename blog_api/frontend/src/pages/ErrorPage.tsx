import { Link, isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import { useTitle } from "../hooks/useTitle";

export function ErrorPage() {
  useTitle("Error | Blog CMS");
  const error = useRouteError();

  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <h1>401 error fffff</h1>;
      // ...
    } else if (error.status === 404) {
      // classic not found route error
      // return pretty 404 error page
      return (
        <div className={styles.errorPage}>
          <h1>404</h1>
          {/* <p>{error.data}</p> */}
          <p>Page not found</p>
          <Link to={"/"} replace={true}>
            Home
          </Link>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      );
      // ...
    }

    return (
      <div className={styles.errorPage}>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <Link to={"/"} replace={true}>
          Home
        </Link>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={styles.errorPage}>
        <h1>404</h1>
        {/* <p>Something went wrong.</p> */}
        <p>
          <i>{error.message}</i>
        </p>
        <Link to={"/"} replace={true}>
          Home
        </Link>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    );
  } else {
    throw Error("Wow something is really wrong!!!");
  }
}
