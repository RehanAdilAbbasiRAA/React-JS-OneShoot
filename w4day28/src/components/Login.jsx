
import Signup from "./signup";

const Login = ({isFlipped,setEmail,setPassword,setIsFlipped,error,handleSubmit,email,password}) => {

  return (
    <div className="main flex justify-center items-center h-screen bg-[var(--color-primary)]">
      {/* login form*/}
        <div className="box1 flex flex-col justify-center items-center h-[60vh] w-[40vw] rounded-4xl p-8 shadow-lg bg-[var(--color-card)] text-[var(--color-card-text)] border-[var(--color-card-border)] ">
          <h1 className="text-3xl font-bold mb-6">LOGIN</h1>
          <div className="error text-2xl text-red-500 font-bold">{error}</div>
          <div className="form w-full">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="email" className=" font-medium">
                Email :
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />

              <label htmlFor="password" className=" font-medium">
                Password :
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />
              <input
                type="submit"
                value="Login"
                className="bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg"
              />
            </form>
            <div className="center flex justify-center items-center">
              <button
                onClick={() => setIsFlipped(false)}
                className="mt-4 text-blue-500 hover:underline"
              >
                Create an account ? Signup
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Login;
