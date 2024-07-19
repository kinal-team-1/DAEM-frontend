import { Navbar } from "../../../components/Navbar";
import { LoginForm } from "./components/LoginForm";

export function Login() {
  return (
    <div className="h-dvh flex flex-col">
      <div className="h-screen w-full fixed -z-10 top-0 left-0">
        <img
          className="min-h-full absolute object-cover"
          src="/background-login-children.png"
          alt="Background children"
        />
        <div className="bg-black/30 w-full h-full absolute" />
      </div>
      <Navbar />
      <div className="overflow-hidden overflow-y-scroll grow shrink-0 py-5">
        <div className="flex flex-col gap-10 justify-center items-center h-full w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
