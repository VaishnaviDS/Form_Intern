// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import "./profile.css"
const Profile = () => {

  const {
    user,
    getMyForms,
      updateProfileImage,
  } = useUser();

  const [history, setHistory] = useState([]);

  /////////////////////////////////////////////////////////
  // FETCH HISTORY
  /////////////////////////////////////////////////////////

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {

      const data = await getMyForms();

      setHistory(data);

    } catch (error) {
      console.log(error);
    }
  };
  const [image, setImage] = useState(null);

/////////////////////////////////////////////////////////
// UPDATE PROFILE IMAGE
/////////////////////////////////////////////////////////

const handleProfileImage = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const formData = new FormData();

    formData.append(
      "profileImage",
      file
    );

    await updateProfileImage(
      formData
    );

    fetchHistory();

    window.location.reload();

  } catch (error) {

    console.log(error);
  }
};

 return (

  <div className="profile-container">

    <div className="profile-wrapper">

      <h1 className="profile-title">
        Profile
      </h1>

      {/* ================= USER INFO ================= */}

      <div className="profile-card">

        <div className="profile-image-wrapper">

          <img
            src={
              user?.profileImage
                ? `http://localhost:5000/uploads/${user.profileImage}`
                : "/user.png"
            }
            alt="profile"
            className="profile-image"
          />

          <label
            htmlFor="profile-upload"
            className="profile-upload-btn"
          >
            +
          </label>

          <input
            type="file"
            id="profile-upload"
            hidden
            onChange={handleProfileImage}
          />

        </div>

        <div className="profile-info">

          <h3 className="profile-name">
            {user?.name}
          </h3>

          <p className="profile-email">
            {user?.email}
          </p>

          <p className="profile-role">
            Role: {user?.role}
          </p>

        </div>

      </div>

      {/* ================= FORM HISTORY ================= */}

      <div className="profile-history">

        <h2 className="profile-history-title">
          Submitted Forms History
        </h2>

        {
          history.length === 0 ? (

            <p className="profile-empty">
              No forms submitted yet
            </p>

          ) : (

            history.map((item) => (

              <div
                key={item._id}
                className="profile-history-card"
              >

                <h3 className="profile-form-title">
                  {item.formId?.title}
                </h3>

                <div className="profile-answers">

                  {
                    item.answers.map(
                      (answer, index) => (

                        <div
                          key={index}
                          className="profile-answer"
                        >

                          <span className="profile-answer-label">
                            {answer.fieldLabel}:
                          </span>

                          <span className="profile-answer-value">
                            {" "}
                            {answer.value}
                          </span>

                        </div>
                      )
                    )
                  }

                </div>

                <p className="profile-date">

                  Submitted on:

                  {" "}

                  {
                    new Date(
                      item.createdAt
                    ).toLocaleString()
                  }

                </p>

              </div>
            ))
          )
        }

      </div>

    </div>

  </div>
);
};

export default Profile;