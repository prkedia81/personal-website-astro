import React, { type FormEvent } from "react";
import testFunction from "../services/test";
import axios from "axios";

function Test() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // setModalOpen(true);

    const response = await axios.post("/api/newsletter", formData);
    console.log(response);
  };

  return (
    <>
      <section className="newsletter border-2 border-gray-800 mt-16 md:mt-24 mx-5 px-12 py-8 md:px-0 md:py-0 md:mx-20 rounded-md">
        <div className="max-w-2xl mx-auto text-center sm:py-10 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            <span className="block">Sign-up to my newsletter</span>
          </h2>
          <p className="mt-4 text-md leading-6 text-gray-700">
            I talk about start-up, investing, tech and everything around it.
            Sign-Up for my weekly newsletter to never miss an update
          </p>
          <button type="button" onClick={() => console.log("clicked")}>
            Click
          </button>
          <form
            name="newsletter-subscribers"
            onSubmit={(e) => handleSubmit(e)}
            className="mt-5 flex flex-col md:flex-row md:gap-3 gap-2 items-center justify-center">
            <div className="md:basis-3/4">
              <input
                required
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="example@email.com"
                className="py-2 px-4 text-md w-full bg-transparent block shadow-sm focus:ring-indigo-600 focus:border-indigo-600 border-gray-500 rounded-md"
              />
            </div>
            <div className="md:basis-1/4">
              <button
                type="submit"
                className="w-full items-center justify-center px-5 py-2 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto">
                Sign-up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Test;
