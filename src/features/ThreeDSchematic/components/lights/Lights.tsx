const WbsLight = () => {
  return (
    <>
      <directionalLight position={[0, 100, 0]} intensity={0.2} />
      <directionalLight position={[0, -10000000, 0]} intensity={0.2} />

      <directionalLight position={[500, 500, -10000]} intensity={0.1} />
      <directionalLight position={[0, 100, -20000]} intensity={0.3} />
      <directionalLight position={[0, 100, 20000]} intensity={0.3} />
      <directionalLight position={[100, 100, 20000]} intensity={0.3} />
      <directionalLight position={[-5000, -200, 0]} intensity={0.05} />
      <directionalLight position={[5000, -200, 0]} intensity={0.05} />
      <directionalLight position={[-5000, -10000, 0]} intensity={0.05} />
      <directionalLight position={[5000, -10000, 0]} intensity={0.05} />
      <directionalLight position={[-5000, -50000, 0]} intensity={0.05} />
      <directionalLight position={[5000, -50000, 0]} intensity={0.05} />
    </>
  );
};

export default WbsLight;
