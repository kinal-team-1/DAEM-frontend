import { CaseForm } from "./components/CaseForm.jsx";

export function Publish() {
  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-5 h-full">
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
    </div>
  );
}
