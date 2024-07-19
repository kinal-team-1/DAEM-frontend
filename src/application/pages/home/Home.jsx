import { useEffect, useState } from "react";
import { Map } from "../../components/Map";
import { FileDrop } from "../../components/FileDrop";
import { AttachmentInput } from "../../components/AttachmentInput";
import { TobBar } from "../../components/TopBar";

export function Home() {
  const [coordinates, setCoordinates] = useState(["14.6464213", "-87.0192"]);
  const [currLat, currLong] = coordinates;
  const [lat, long] = [Number(currLat) || 0, Number(currLong) || 0];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates([
        position.coords.latitude.toString(),
        position.coords.longitude.toString(),
      ]);
    });
  }, []);
  return (
    <div>
      <div className="h-screen w-full fixed -z-10 top-0 left-0">
        <img
          className="min-h-full absolute object-cover"
          src="/background-children.png"
          alt="Background children"
        />
        <div className="bg-black/30 w-full h-full absolute" />
      </div>
      <TobBar />
      <h1>Home</h1>
      <p>Some content</p>
      <div className="flex gap-3">
        <input
          className="border px-2 py-1 rounded"
          value={currLat}
          onChange={(e) =>
            setCoordinates(([_, prevLong]) => [e.target.value, prevLong])
          }
          type="text"
        />
        <input
          className="border px-2 py-1 rounded"
          type="text"
          value={currLong}
          onChange={(e) => {
            setCoordinates(([prevLat, _]) => [prevLat, e.target.value]);
          }}
        />
        <button
          type="button"
          onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              setCoordinates([
                position.coords.latitude.toString(),
                position.coords.longitude.toString(),
              ]);
            });
          }}
          className="px-4 py-3 rounded-xl bg-black text-white"
        >
          Get My Location
        </button>
      </div>
      <div className="px-4 py-5">
        <Map className="h-[200px] w-full" coordinates={[lat, long]} />
      </div>
      <div className="w-fit">
        <FileDrop />
      </div>
      <div className="flex">
        <div className="p-4 bg-black/60 flex flex-col gap-3 [&_.border]:border-2 min-w-[400px]">
          <input
            type="text"
            className="px-4 py-2 rounded bg-[transparent] border boder-white outline-none text-white"
          />
          <AttachmentInput />
          <div className="flex gap-2">
            <button
              type="button"
              className="grow rounded-xl py-3 px-4 bg-black text-white"
            >
              Location
            </button>
            <button
              type="button"
              className="grow rounded-xl py-3 px-4 bg-black text-white"
            >
              Files
            </button>
          </div>
          <button className="text-2xl rounded-xl py-3 px-4 bg-black text-white">
            Presentar Caso
          </button>
        </div>
      </div>
    </div>
  );
}
