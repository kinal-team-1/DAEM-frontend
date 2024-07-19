import { Navbar } from "../../../components/Navbar";
import { SignupForm } from "./components/SignupForm";

export function Signup() {
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
          <div className="md:px-10 w-[90%]">
            <div className="bg-black/70 p-7 text-white">
              <p>
                DAEM necesita tus datos personales por temas de transparencia y
                legitimidad de los datos y pruebas que puedas presentar. Se te
                dará seguimiento de un caso en tu correo para que puedas estar
                al tanto sobre las resoluciones o estados de los casos en
                cuestión
              </p>
            </div>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
