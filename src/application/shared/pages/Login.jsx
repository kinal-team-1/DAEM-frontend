import { Navbar } from "../../components/Navbar";

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
          <div className="md:bg-black/70 flex flex-col gap-2 md:flex-row md:gap-0 h-fit">
            <div className="size-[400px] bg-black/70 md:bg-[transparent] max-w-[90vw] p-7 text-white flex flex-col gap-10 text-xl justify-center [&_input]:placeholder:text-white/80">
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="Nombre"
                type="text"
              />
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="Apellido"
                type="text"
              />
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="DPI"
                type="text"
              />
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="telefono"
                type="text"
              />
            </div>
            <div className="border md:grow" />
            <div className="size-[400px] bg-black/70 md:bg-[transparent] max-w-[90vw] p-7 text-white flex flex-col gap-10 text-xl justify-center [&_input]:placeholder:text-white/80">
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="Email"
                type="text"
              />
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="Password"
                type="text"
              />
              <input
                className="border-b border-white bg-[transparent] outline-none"
                placeholder="Confirmar Password"
                type="text"
              />
              <button className="py-4 px-3 bg-black rounded-xl text-white">
                Iniciar Sesion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
