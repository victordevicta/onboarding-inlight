import Button from "@/components/Button/Button";

const App = () => {
  const healthcheck = async () => {
    await fetch("/api/healthcheck", {
      method: "GET",
    });
  };

  console.log(healthcheck);
  return (
    <>
      <h1>Get Pokemon API</h1>
      <Button>Button</Button>
    </>
  );
};

export default App;
