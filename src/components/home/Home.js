import { Box, TextField } from "@mui/material";
import { ContainerWrapper } from "./Home.style.js";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import Rating from "../rating/Rating.js";
import axios from "axios";


const initialFormData = {
  bodyLangAndToneRating: 0,
  bodyLangAndTone: "",
  reflectingBackRange: 0,
  reflectingBack: "",
  exploratoryQuestionRating: 0,
  exploratoryQuestion: "",
  additionalComments: "",
};

const Home = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [submitButtonTitle, setSubmitButtonTitle] = useState("Submit");

  const onChangeForm = (event) => {
    const { value, id } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRating = (propertyName, index) => {
    setFormData({ ...formData, [propertyName]: index });
  };

  const handleFormSubmit = async () => {
    setIsSubmitClicked(true);
    if (
      !(
        formData.bodyLangAndTone &&
        formData.reflectingBack &&
        formData.exploratoryQuestion &&
        formData.additionalComments
      )
    ) {
      return;
    }
    try {
      const { data } = await axios.post("feedback", formData);
      if (data.result.data) {
        console.log(data.result.data);
        setFormData(initialFormData);
        setSubmitButtonTitle("Thank you");
        setIsSubmitClicked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContainerWrapper maxWidth="sm">
        <Box sx={{ height: "100vh", textAlign: "center" }}>
          <div className="heading">
            <h1 className="heading-text"> Today’s Subject </h1>
          </div>
          <div className="feedback-heading">
            <h5 className="feedback-text"> Feedback to support your pod </h5>
          </div>
          <div className="form-container">
            <b className="body-lang-label">Body Language and Tone</b>
            <div className="body-lang-rating">
              <div className="rating-input">
                <Rating
                  propertyName="bodyLangAndToneRating"
                  value={formData.bodyLangAndToneRating}
                  handleRating={handleRating}
                />
              </div>
            </div>
            <div className="body-lang-input">
              <TextField
                id="bodyLangAndTone"
                value={formData.bodyLangAndTone}
                multiline
                rows={2}
                fullWidth
                onChange={onChangeForm}
                helperText={
                  isSubmitClicked && !formData.bodyLangAndTone
                    ? "Body Language And Tone Field is required"
                    : ""
                }
                error={isSubmitClicked && !formData.bodyLangAndTone}
              />
            </div>
            <b className="reflecting-back-label">Reflecting Back</b>
            <Stack
              id="bodyLangAndTone"
              spacing={2}
              direction="row"
              sx={{ mb: 1, mt: 2 }}
              alignItems="center"
            >
              <img src="./images/happy.png" alt="test" />
              <Slider
                min={0}
                max={10}
                aria-label="Volume"
                value={formData.reflectingBackRange}
                onChange={(event, newValue) =>
                  setFormData({ ...formData, reflectingBackRange: newValue })
                }
              />
              <img src="./images/neutral.png" alt="test" />
            </Stack>
            <div className="reflecting-input">
              <TextField
                id="reflectingBack"
                value={formData.reflectingBack}
                multiline
                rows={2}
                fullWidth
                onChange={onChangeForm}
                helperText={
                  isSubmitClicked && !formData.reflectingBack
                    ? "Reflecting Back Field is required"
                    : ""
                }
                error={isSubmitClicked && !formData.reflectingBack}
              />
            </div>
            <b className="exploratory-que-label">Exploratory Questions</b>
            <div className="exploratory-que-rating">
              <div className="rating-input">
                <Rating
                  propertyName="exploratoryQuestionRating"
                  value={formData.exploratoryQuestionRating}
                  handleRating={handleRating}
                />
              </div>
            </div>
            <div className="exploratory-que-input">
              <TextField
                id="exploratoryQuestion"
                value={formData.exploratoryQuestion}
                onChange={onChangeForm}
                multiline
                rows={2}
                fullWidth
                helperText={
                  isSubmitClicked && !formData.exploratoryQuestion
                    ? "Exploratory Questions Field is required"
                    : ""
                }
                error={isSubmitClicked && !formData.exploratoryQuestion}
              />
            </div>
            <b className="additional-comments-label">Additional Comments</b>
            <div className="additional-comments-input">
              <TextField
                id="additionalComments"
                value={formData.additionalComments}
                onChange={onChangeForm}
                multiline
                rows={2}
                fullWidth
                helperText={
                  isSubmitClicked && !formData.additionalComments
                    ? "Additional Comments Field is required"
                    : ""
                }
                error={isSubmitClicked && !formData.additionalComments}
              />
            </div>
            <div className="form-submit">
              <input
                type="button"
                className="submit-btn"
                value={submitButtonTitle}
                onClick={handleFormSubmit}
              />
            </div>
          </div>
        </Box>
      </ContainerWrapper>
    </>
  );
};
export default Home;
