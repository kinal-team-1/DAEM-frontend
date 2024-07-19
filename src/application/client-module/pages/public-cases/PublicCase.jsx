import { useState } from "react";
import { FileDrop } from "../../../components/FileDrop";
import { AttachmentInput } from "../../../components/AttachmentInput";
import { Navbar } from "../../../components/Navbar";
import { CaseForm } from "../publish/components/CaseForm";

export function PublicCase() {
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-5 h-full">
      <Navbar />
      <div className="h-screen w-full fixed -z-10 top-0 left-0">
        <img
          className="min-h-full absolute object-cover"
          src="/background-children.png"
          alt="Background children"
        />
        <div className="bg-black/30 w-full h-full absolute" />
      </div>
      <div className="p-4 bg-black/60 text-white h-full flex flex-col gap-3 justify-center px-5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          cum cumque debitis ea et, eveniet itaque laudantium tempora vel.
          Accusamus, adipisci aliquid aspernatur eligendi ipsa, maiores minima
          possimus praesentium quaerat quas quisquam rerum! A alias autem,
          deserunt dolorem ea, eos error facilis, fuga quasi quis reprehenderit
          repudiandae sit voluptate voluptates?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus
          adipisci aspernatur atque consectetur cum dolor ducimus earum eligendi
          fugiat fugit id impedit maxime modi, molestiae nesciunt non numquam
          odit pariatur, recusandae sint tenetur ullam veritatis voluptate
          voluptatem voluptatibus voluptatum. Asperiores consequuntur dolores,
          fugit id ipsa minus neque praesentium tempore?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
          itaque nisi rem sit vero vitae. Accusantium adipisci aliquid dolorem
          enim impedit laborum, molestias nulla numquam qui quo, soluta tempore
          vel.
        </p>
      </div>
      <div className="flex justify-center items-center p-10">
        <CaseForm className="grow shrink-0" />
      </div>
      <div className="max-w-screen-lg mx-auto p-4 col-span-2">
        <h1 className="text-3xl font-bold text-white">CASO 1237-0654</h1>
        <div className="mt-6 flex gap-6">
          <div className="flex-1">
            <img
              className="min-h-full absolute object-cover"
              src="/background-children.png"
              alt="Case"
            />
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-semibold">
                Ciudad de Guatemala, Guatemala
              </h2>
              <p className="text-sm">07 / 05 / 2024 8:10 AM</p>
              <p className="mt-2">
                Lorem ipsum es el texto que se usa habitualmente en diseño
                gráfico en demostraciones de tipografías o de borradores de
                diseño para probar el diseño visual antes de insertar el texto
                final.
              </p>
            </div>
          </div>
          <div className="w-1/3 bg-black/60 p-4 rounded-lg text-white">
            <textarea
              className="w-full bg-transparent border border-white rounded p-2 mb-4 text-white"
              placeholder="Descripción..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FileDrop />
            <button
              type="button"
              className="w-full py-2 mt-4 bg-black text-white rounded"
            >
              APORTAR
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <div className="w-1/3 bg-black/60 p-4 rounded-lg text-white">
            <img
              className="w-full rounded mb-2"
              src="/image-placeholder.png"
              alt=""
            />
            <p className="text-sm">
              07 / 05 / 2024 8:10 AM Lorem ipsum es el texto que se usa
              habitualmente en diseño gráfico en demostraciones de tipografías o
              de borradores de diseño para probar el diseño visual antes de
              insertar el texto final.
            </p>
          </div>
          <div className="w-1/3 bg-black/60 p-4 rounded-lg text-white">
            <img
              className="w-full rounded mb-2"
              src="/image-placeholder.png"
              alt=""
            />
            <p className="text-sm">
              07 / 05 / 2024 8:10 AM Lorem ipsum es el texto que se usa
              habitualmente en diseño gráfico en demostraciones de tipografías o
              de borradores de diseño para probar el diseño visual antes de
              insertar el texto final.
            </p>
          </div>
          <div className="w-1/3 bg-black/60 p-4 rounded-lg text-white">
            <img
              className="w-full rounded mb-2"
              src="/image-placeholder.png"
              alt=""
            />
            <p className="text-sm">
              07 / 05 / 2024 8:10 AM Lorem ipsum es el texto que se usa
              habitualmente en diseño gráfico en demostraciones de tipografías o
              de borradores de diseño para probar el diseño visual antes de
              insertar el texto final.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
