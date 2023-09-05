import LoginPage from "@/screens/loginHome/LoginPage";
import ThemeProvider from "../theme";

export default function App() {
  return (
    <>
        <ThemeProvider>
          <LoginPage />
        </ThemeProvider>
    </>
  );
}
