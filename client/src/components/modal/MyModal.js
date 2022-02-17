import { useEffect, useState } from "react";
import { Modal, Typography } from "@mui/material";
import moment from "moment";

import "./modal.css";
import { getPhoto } from "./getPhoto";

function MyModal({ selectedBirthday, setSelectedBirthday }) {
  const [photoOfTheDay, setPhotoOfTheDay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleCloseModal() {
    setSelectedBirthday(null);
  }

  useEffect(() => {
    selectedBirthday && getPhoto(setPhotoOfTheDay, selectedBirthday.birthday, setIsLoading);
  }, [selectedBirthday]);

  console.log(photoOfTheDay);
  return (
    <div>
      <Modal open={selectedBirthday} onClose={handleCloseModal}>
        {isLoading ? (
          <Typography>Loading..</Typography>
        ) : (
          <div className="modal-content">
            <img className="avatar" id="modal-avatar" src={`http://localhost:5000/uploads/${selectedBirthday.photo}`} />

            <Typography variant="h6">{selectedBirthday.name}</Typography>
            <Typography variant="body2">{moment(selectedBirthday.birthday).format("DD-MM-YYYY")}</Typography>
            <Typography className="phone-mail-small">
              {selectedBirthday.phone} | {selectedBirthday.email}
            </Typography>

            <img className="photo-of-the-day" src={photoOfTheDay.hdurl} />

            <div className="description">
              <Typography variant="body2">{photoOfTheDay.explanation}</Typography>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyModal;
