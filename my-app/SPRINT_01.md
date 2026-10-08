# SPRINT_01.md

## 1. Sprint Goal

Build a working student performance prediction system where users can enter student information through the web interface and receive a predicted final grade from the machine learning model.

---

## 2. Product Backlog

| Priority | Backlog Item | Description | Label |
|---|---|---|---|
| P1 | Complete Student Input Form | Create a complete form containing all required student information fields from the dataset. | frontend |
| P1 | Connect Frontend to Flask API | Send student data from the React frontend to the Flask backend using an API request. | frontend, backend |
| P1 | Integrate Random Forest Model | Load the trained Random Forest Regression model in Flask and generate student grade predictions. | machine-learning, backend |
| P2 | Add Input Validation | Validate user input before sending data to the prediction API. | frontend, validation |
| P2 | Display Prediction Result | Show the predicted final grade clearly on the result section of the website. | frontend |
| P3 | Improve User Interface | Make the prediction page responsive and consistent with the StudentAI homepage design. | UI/UX |
| P3 | Test Complete Prediction Flow | Test the full process from entering student data to receiving a prediction. | testing |

---

## 3. Refined Backlog Items

### Item 1: Connect Frontend to Flask API

**Description**

Create a connection between the React prediction form and the Flask backend.

When the user clicks the prediction button, the frontend should collect all form values and send them to the Flask API using a POST request.

Example endpoint:

`POST /predict`

Example response:

```json
{
  "prediction": 13.5
}
```

### Acceptance Criteria

- [ ] The React form collects all required student information.
- [ ] Data is sent to the Flask API using a POST request.
- [ ] The backend receives the request successfully.
- [ ] The API returns a prediction value.
- [ ] The frontend correctly receives the JSON response.
- [ ] No page reload occurs during prediction.
- [ ] API errors are handled and displayed to the user.

### Item 2: Integrate Random Forest Prediction Model

**Description**

Integrate the trained Random Forest Regressor into the Flask backend.

The API should convert input data into the same format used during model training and return the predicted student final grade.

### Acceptance Criteria

- [ ] The trained model can be loaded when the Flask server starts.
- [ ] Input data is converted into the correct feature format.
- [ ] Categorical variables are encoded correctly.
- [ ] The model returns a numeric prediction.
- [ ] The prediction is within the expected grade range of 0–20.
- [ ] The API returns the prediction as JSON.
- [ ] Invalid input does not crash the Flask server.

---

## 4. Tasks and Work Assignment

### Complete Student Input Form

- [ ] Create input fields based on the student dataset.
- [ ] Add dropdown menus for categorical features.
- [ ] Add numeric inputs for age, grades, absences, etc.
- [ ] Add form submit button.
- [ ] Check responsive layout.

**Assigned to:** Thanh

### Connect Frontend to Flask API

- [ ] Create `/predict` endpoint in Flask.
- [ ] Create frontend API request using `fetch` or `axios`.
- [ ] Convert form data to JSON.
- [ ] Send POST request.
- [ ] Handle API response.
- [ ] Handle API error.

**Assigned to:** Thanh

### Integrate Random Forest Model

- [ ] Train or load Random Forest Regressor.
- [ ] Save trained model.
- [ ] Load model in Flask.
- [ ] Prepare preprocessing logic.
- [ ] Test prediction using sample student data.

**Assigned to:** Thanh

### Input Validation

- [ ] Prevent empty required fields.
- [ ] Check valid numeric ranges.
- [ ] Validate G1 and G2 grade values.
- [ ] Display error messages when input is invalid.

**Assigned to:** Thanh

### Display Prediction Result

- [ ] Create prediction result component.
- [ ] Display predicted grade out of 20.
- [ ] Add loading state while prediction is running.
- [ ] Add error message when prediction fails.

**Assigned to:** Thanh

### Check-ins

- Check-in 1: After completing the input form.
- Check-in 2: After connecting the frontend and Flask API.
- Check-in 3: After integrating the machine learning model.
- Final check-in: After completing end-to-end testing.

During each check-in, review completed tasks, current problems, remaining tasks, and next priorities.

---

## 5. Definition of Done

A backlog item is considered **Done** when:

- [ ] The implementation is completed.
- [ ] The feature works as expected.
- [ ] Code runs without critical errors.
- [ ] Input and output are tested.
- [ ] The feature is integrated with the existing project.
- [ ] The code is readable and organized.
- [ ] No major console errors are present.
- [ ] The user interface works on desktop screens.
- [ ] Changes are committed to Git.
- [ ] Changes are pushed to the GitHub repository.
- [ ] Acceptance criteria are satisfied.
