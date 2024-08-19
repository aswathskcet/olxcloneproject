import React from 'react';
import './AboutPage.css'; // Import the CSS file

function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1>About OLX Clone</h1>
        <p>
          <strong>OLX Clone</strong> is a dynamic online exchange platform designed to facilitate the buying and selling of a wide range of products. Inspired by the popular OLX website, our platform offers a user-friendly experience for individuals looking to trade goods, ranging from electronics and clothing to furniture and more.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li><strong>User-Friendly Interface:</strong> Seamlessly browse and list items with an intuitive design.</li>
          <li><strong>Categorized Listings:</strong> Easily find what you're looking for with well-organized categories.</li>
          <li><strong>Secure Transactions:</strong> Ensure peace of mind with secure and transparent transactions.</li>
          <li><strong>Real-Time Notifications:</strong> Stay updated with instant notifications about your listings and messages.</li>
          <li><strong>Profile Management:</strong> Manage your listings, view your activity, and update your profile effortlessly.</li>
        </ul>
        <p>
          Our goal is to provide a reliable and efficient marketplace where users can connect and conduct transactions with confidence. Whether you're looking to sell an item or find a great deal, OLX Clone is here to make the process smooth and enjoyable.
        </p>
        <p>
          Feel free to explore our platform and experience the convenience of online exchanges!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
