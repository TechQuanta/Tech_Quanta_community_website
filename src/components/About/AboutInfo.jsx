import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCode, FaGlobe } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import { Helmet } from 'react-helmet'; // Import Helmet
import about from "../../assets/About.jpg";

const communityValues = [
  {
    icon: <FaUsers className="text-green-400 text-5xl mb-3 " />,
    title: "Community Driven",
    description: "Connect with developers globally to share ideas and collaborate.",
  },
  {
    icon: <FaCode className="text-teal-400 text-5xl mb-3" />,
    title: "Open Source Projects",
    description: "Build and contribute to meaningful projects that power the future.",
  },
  {
    icon: <FaGlobe className="text-green-400 text-5xl mb-3" />,
    title: "Global Impact",
    description: "Empower developers worldwide and foster technology for good.",
  },
];

const AboutInfo = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Define your SEO metadata for this specific page
  const pageTitle = "About Tech Quanta - Open Source Community & Development Services";
  const pageDescription = "Learn about Tech Quanta, a passionate online community empowering developers in open source, offering graphic design, web development, courses, and events. Join us to learn, build, and thrive.";
  const canonicalUrl = "https://www.yourwebsite.com/about"; // Replace with your actual About page URL
  const ogImage = "https://www.yourwebsite.com/About.jpg"; // Replace with the full URL to your About image

  return (
    <section
      className={`py-6 max-w-full justify-center items-center px-6 md:px-12 lg:px-24 font-space-grotesk transition-colors duration-300 ${
        isDark ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Social Media Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Tech Quanta About Us" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        {/* If you have a Twitter handle for your organization */}
        {/* <meta name="twitter:site" content="@yourtwitterhandle" /> */}

        {/* You can add more specific meta tags here if needed */}
      </Helmet>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-start"
        >
          <img
            src={about}
            alt="Tech Quanta Logo"
            className="w-[300px] h-auto rounded-xl shadow-2xl border border-[#00BFFF]"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <h2 className="text-4xl font-bold text-[#00BFFF] mb-4 font-exo2">About</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00BFFF] to-[#0034FF] rounded-full mb-6"></div>

          <h3 className={`text-lg mb-6 font-space-grotesk ${isDark ? "text-gray-400" : "text-gray-700"}`}>
            A community initiative empowering people to explore open source, stay motivated, and grow together.
          </h3>

          <p className={`leading-relaxed mb-4 font-space-grotesk ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Tech Quanta is a passionate online community that inspires and connects individuals to dive into the
            world of open source. Whether you're just starting out or already building, we provide the support and
            motivation to keep you moving forward.
          </p>

          <p className={`leading-relaxed text-sm mb-4 font-space-grotesk ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Alongside open-source awareness, we offer valuable services including graphic designing, website
            development, online courses, events, and seminars—all delivered remotely to ensure accessibility for
            everyone.
          </p>

          <p className={`leading-relaxed text-sm font-space-grotesk ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Join us to learn, build, and thrive in a space where innovation meets opportunity—completely online.
          </p>
        </motion.div>
      </div>

      {/* Community Values Section with Icons */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {communityValues.map(({ icon, title, description }, index) => (
          <motion.div
            key={title}
            className="flex flex-col items-center max-w-xs mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.3,
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            {icon}
            <h4 className="text-xl font-bold mb-2 font-exo2">{title}</h4>
            <p className={`text-sm px-4 font-space-grotesk ${isDark ? "text-gray-400" : "text-gray-700"}`}>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutInfo;