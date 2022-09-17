export default function CenterWrapper(props: any) {
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      {props.children}
    </div>
  );
}
