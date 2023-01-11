import React, { FormEvent, SyntheticEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { useAuth } from "../common/auth";

export default function Login() {
  const { signIn, user } = useAuth() ?? {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function authenticateUser(event: SyntheticEvent) {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    console.log(email.value);
    console.log(password.value);
    await signIn(email.value, password.value);
  }

  return (
    <>
      <header className="relative z-[1] w-56">
        <img className="h-full w-full" src={netflixLogo} alt="Netflix logo" />
      </header>
      <main>
        <section
          className={`absolute top-0 -z-[1] min-h-screen w-full bg-[url("/netflix_movies_cover.webp")] bg-cover`}
        ></section>
        <section className="absolute inset-0 bg-gradient-to-b from-zinc-900/50"></section>
        <form
          onSubmit={authenticateUser}
          className="relative mx-auto w-[350px] rounded-r-lg bg-black/75 p-16"
        >
          <article className="text-gray-300">
            <h1 className="mb-4 text-4xl text-white">Sign In</h1>
            <section className="flex flex-col gap-4">
              <input
                type="email"
                className="rounded-md bg-zinc-500 p-2 outline-none"
                name="email"
                id="email"
                placeholder="Enter email"
              />
              <input
                className="rounded-md bg-zinc-500 p-2 outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
              />
              <button className="my-8 rounded-md bg-netflixRed p-2 font-semibold text-white outline-none">
                Sign in
              </button>
            </section>
            <p>
              New to Netflix?{" "}
              <Link className="text-white" to="/signup">
                Sign up now.
              </Link>
            </p>
          </article>
        </form>
      </main>
    </>
  );
}
