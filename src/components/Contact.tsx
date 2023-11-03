import React, { useState, type FormEvent } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    setLoading(true);

    const response = await axios.post("/api/contact", formData);

    if (response.status === 200) {
      setModalOpen(true);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="mt-6 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transhtmlForm translate-x-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true">
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse">
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="404"
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
          </svg>
          <svg
            className="absolute right-full bottom-0 transhtmlForm -translate-x-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true">
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse">
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="404"
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
          </svg>
          <div className="mt-12">
            <form
              name="contact"
              onSubmit={(e) => submit(e)}
              className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700">
                  First name <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="py-3 px-4 block border w-full bg-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700">
                  Last name <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="py-3 px-4 block border w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-transparent rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="py-3 px-4 block border w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-transparent rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block border w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-transparent rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    autoComplete="tel"
                    className="py-3 px-4 block border w-full focus:ring-indigo-500 focus:border-indigo-500 bg-transparent rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-700">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border bg-transparent rounded-md"></textarea>
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {loading ? (
                    <LoadingSpinner color="text-white" />
                  ) : (
                    "Let's Talk"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
              onClick={() => setModalOpen(false)}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title">
                    Thank you for Reaching Out!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      I'll get back to you in 1-2 business days. Cheers!
                    </p>
                  </div>
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

export default Contact;
