import { useEffect, useState } from "react";
import { Map } from "../../components/Map";
import { FileDrop } from "../../components/FileDrop";
import { TobBar } from "../../components/TopBar";
import { AttachmentInput } from "../../components/AttachmentInput";

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
        <Map className="h-[400px] w-full" coordinates={[lat, long]} />
      </div>
      <div className="w-fit">
        <FileDrop />
      </div>
      <div className="px-4 py-2">
        <AttachmentInput />
      </div>
    </div>
  );
}
