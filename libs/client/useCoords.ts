import { useState } from "react";

interface UseCoordsState {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordsState>({
    latitude: null,
    longitude: null,
  });
  return coords;
}
