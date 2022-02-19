import { useEffect, useState } from "react";
import { Modal, Typography } from "@mui/material";
import moment from "moment";

import "./modal.css";
import { getPhoto } from "./getPhoto";
import Loader from "../utils/Loader";
import ifDateIsTooOld from "../../assets/images/noimage.png";

function MyModal({ selectedBirthday, setSelectedBirthday }) {
  const [photoOfTheDay, setPhotoOfTheDay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleCloseModal() {
    setSelectedBirthday(null);
  }

  useEffect(() => {
    selectedBirthday && getPhoto(setPhotoOfTheDay, selectedBirthday.birthday, setIsLoading);
  }, [selectedBirthday]);

  return (
    <div>
      <Modal open={!!selectedBirthday} onClose={handleCloseModal}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="modal-content">
            <img className="avatar" id="modal-avatar" src={`http://localhost:5000/uploads/${selectedBirthday.photo}`} />

            <Typography variant="h6">{selectedBirthday.name}</Typography>
            <Typography variant="body2">{moment(selectedBirthday.birthday).format("DD-MM-YYYY")}</Typography>
            <Typography className="phone-mail-small">
              {selectedBirthday.phone} | {selectedBirthday.email}
            </Typography>

            <img className="photo-of-the-day" src={!photoOfTheDay ? ifDateIsTooOld : photoOfTheDay?.hdurl} />

            <div className="description">
              {!photoOfTheDay && (
                <Typography variant="body2">
                  NASA started publishing photos on June 16, 1995. We are sorry if you are older than this date.
                </Typography>
              )}

              <Typography variant="body2">{photoOfTheDay?.explanation}</Typography>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyModal;
