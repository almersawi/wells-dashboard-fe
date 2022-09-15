import { useWellId } from "hooks/useWellId";

export default function WellLayout() {
  const wellId = useWellId();

  return <h1>Well page for well with id: {wellId}</h1>;
}
