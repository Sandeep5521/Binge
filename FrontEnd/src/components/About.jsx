import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 h-fit dark:bg-black">
      <div className="container flex justify-center items-center h-screen mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center dark:text-white">
            About Binge
          </h2>
          <p className="text-gray-600 text-lg mb-6 text-center dark:text-gray-300">
            Welcome to <span className="font-bold">Binge</span>, your ultimate entertainment companion. Built with the 
            power of <span className="font-semibold">React</span>, it offers a seamless experience to track, explore, 
            and discover your favorite content. The backend is powered by 
            <span className="font-semibold text-indigo-600"> BingeQL GraphQL API</span>, ensuring lightning-fast and 
            dynamic data interactions.
          </p>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <a
              href="https://github.com/Sandeep5521/Binge"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              GitHub Repository
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 cursor-pointer"
            >
              API Documentation
            </a>
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you like this project, don't forget to give it a ⭐ on GitHub and follow me for more projects!
            </p>
            <div className="flex justify-center items-center space-x-4">
              <a
                href="https://github.com/Sandeep5521/Binge"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                ⭐ Star on GitHub
              </a>
              <a
                href="https://github.com/Sandeep5521"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                👤 Follow Me on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
