import { type FormEvent, useState } from "react";
import sendMail from "../services/emailer";
import addRowToSheet from "../services/spreadsheet";

function Newsletter() {
  // const [responseMessage, setResponseMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    console.log("HERE");
    const formData = new FormData(e.target as HTMLFormElement);
    setModalOpen(true);

    const email = formData.get("email") as string;
    console.log(email);

    // Send Email
    await sendMail(
      "",
      "prannaykedia1@gmail.com",
      "prannaykedia1@gmail.com",
      "New Subscriber to your Newsletter!",
      `${email} subscribed to your newsletter at ${new Date().toDateString()}`
    );

    // Add data to sheet
    await addRowToSheet({ email, type: "NewsletterForm" }, "newsletter");
  }

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
          <form
            name="newsletter-subscribers"
            onSubmit={(e) => submit(e)}
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

      {modalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          id="submit-modal"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title">
                    Thank you for Subscribing!
                  </h3>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  id="modal-button"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Newsletter;
