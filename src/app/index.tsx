
import useAuthStore from "../store/auth";
import APP_ROUTES from "./routing";
import { RouterProvider } from "react-router-dom";
function App() {
  const token = useAuthStore(store => store.token)
  return <RouterProvider router={APP_ROUTES(token)} />;
}

export default App;
