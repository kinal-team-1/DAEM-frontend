import React from "react";
import { AttachmentInput } from "../../../components/AttachmentInput";

export function PublicCaseById() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <div className="relative max-w-6xl mx-auto bg-black rounded-lg shadow-md overflow-hidden">
        <img
          src="/path/to/your/background-image.png"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 bg-black bg-opacity-60">
          <div className="p-4 text-white flex flex-col gap-3 justify-center px-5">
            <h1 className="text-xl font-bold text-center lg:text-left">
              Ciudad de Guatemala, Guatemala
            </h1>
            <p className="text-sm text-center lg:text-left">
              07 / 05 / 2024 8:10 AM
            </p>
            <p className="mt-2 text-sm text-justify">
              Lorem ipsum es el texto que se usa habitualmente en diseño gráfico
              en demostraciones de tipografías o de borradores de diseño para
              probar el diseño visual antes de insertar el texto final.
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda cum cumque debitis ea et, eveniet itaque laudantium
              tempora vel. Accusamus, adipisci aliquid aspernatur eligendi ipsa,
              maiores minima possimus praesentium quaerat quas quisquam rerum! A
              alias autem, deserunt dolorem ea, eos error facilis, fuga quasi
              quis reprehenderit repudiandae sit voluptate voluptates?
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
              accusamus adipisci aspernatur atque consectetur cum dolor ducimus
              earum eligendi fugiat fugit id impedit maxime modi, molestiae
              nesciunt non numquam odit pariatur, recusandae sint tenetur ullam
              veritatis voluptate voluptatem voluptatibus voluptatum. Asperiores
              consequuntur dolores, fugit id ipsa minus neque praesentium
              tempore?
            </p>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
              itaque nisi rem sit vero vitae. Accusantium adipisci aliquid
              dolorem enim impedit laborum, molestias nulla numquam qui quo,
              soluta tempore vel.
            </p>
          </div>
          <div className="p-6 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
              Caso 1237-0654
            </h2>
            <textarea
              className="w-full h-32 p-2 border rounded text-black"
              placeholder="Descripción..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Aportar
            </button>
            <AttachmentInput />
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
              <div className="flex-1 bg-gray-800 p-2 rounded">
                <img
                  src="/path/to/your/image1.png"
                  alt="Case thumbnail"
                  className="object-cover w-full h-24 rounded"
                />
              </div>
              <div className="flex-1 bg-gray-800 p-2 rounded">
                <img
                  src="/path/to/your/image2.png"
                  alt="Case thumbnail"
                  className="object-cover w-full h-24 rounded"
                />
              </div>
              <div className="flex-1 bg-gray-800 p-2 rounded">
                <img
                  src="/path/to/your/image3.png"
                  alt="Case thumbnail"
                  className="object-cover w-full h-24 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
