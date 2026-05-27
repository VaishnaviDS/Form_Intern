// src/pages/Home.jsx

import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {

  return (

    <div className="home-container">

      {/* HERO SECTION */}

      <section className="home-hero">

        <div className="home-hero-content">

          <h1 className="home-title">
            Dynamic Form Management System
          </h1>

          <p className="home-description">

            Create, manage, submit, and track
            dynamic forms with a modern
            dashboard experience.

            Admins can create customizable forms,
            manage responses, edit fields,
            and monitor submissions easily.

          </p>

          <div className="home-buttons">

            <Link
              to="/forms"
              className="home-link"
            >
              <button className="home-primary-btn">
                Explore Forms
              </button>
            </Link>

            <Link
              to="/profile"
              className="home-link"
            >
              <button className="home-secondary-btn">
                My Profile
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="home-features">

        <h2 className="home-section-title">
          Features
        </h2>

        <div className="home-features-grid">

          <div className="home-feature-card">

            <h3 className="home-feature-title">
              Dynamic Form Creation
            </h3>

            <p className="home-feature-text">

              Admins can create custom forms
              with text, email, number,
              and textarea fields.

            </p>

          </div>

          <div className="home-feature-card">

            <h3 className="home-feature-title">
              Default Fields Included
            </h3>

            <p className="home-feature-text">

              Every form automatically includes
              Name, Email, and Message fields.

            </p>

          </div>

          <div className="home-feature-card">

            <h3 className="home-feature-title">
              Form Submission Tracking
            </h3>

            <p className="home-feature-text">

              Users can submit forms once
              and track their submission
              history in the profile section.

            </p>

          </div>

          <div className="home-feature-card">

            <h3 className="home-feature-title">
              Admin Response Dashboard
            </h3>

            <p className="home-feature-text">

              Admins can view all submitted
              responses from users with
              organized response cards.

            </p>

          </div>

          <div className="home-feature-card">

            <h3 className="home-feature-title">
              Edit & Delete Forms
            </h3>

            <p className="home-feature-text">

              Forms can be updated anytime
              or deleted with all associated
              responses.

            </p>

          </div>

          <div className="home-feature-card">

            <h3 className="home-feature-title">
              Profile Management
            </h3>

            <p className="home-feature-text">

              Users can update profile images
              and manage submitted form history.

            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="home-cta">

        <h2 className="home-cta-title">
          Start Filling Forms Today
        </h2>

        <p className="home-cta-text">

          Explore all available forms
          and submit your responses easily.

        </p>

        <Link
          to="/forms"
          className="home-link"
        >
          <button className="home-cta-btn">
            Go To Forms
          </button>
        </Link>

      </section>

    </div>
  );
};

export default Home;