# AI-Based System for Student Performance Prediction

## Overview

A web-based AI system that predicts student final grades using machine learning. The project will later extend the centralized model into a Federated Learning system to explore privacy-preserving distributed training.

## Vision

To build a practical student performance prediction system that can use distributed student data without requiring all raw data to be stored in one central location.

## Research Question

**Can Federated Learning achieve comparable prediction performance to centralized learning while keeping student data distributed?**

## Current MVP

* Student information input
* Machine learning prediction
* Flask REST API
* Random Forest regression model
* HTML/CSS/JavaScript frontend
* Predicted grade displayed out of 20

## Technology Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Python, Flask
* **ML:** Scikit-learn, Pandas, NumPy
* **Model:** Random Forest Regressor
* **Tools:** VS Code, Git, GitHub

## Dataset

**UCI Student Performance Dataset**

* 649 student records
* Target: `G3` (final grade)
* `G1` and `G2` are excluded to avoid using previous grades for prediction.

## Architecture

```text
Student Information
        ↓
Frontend
        ↓
Flask API
        ↓
ML Model
        ↓
Predicted Grade
```

Planned Federated Learning architecture:

```text
Client 1 ─┐
Client 2 ─┼→ Aggregation Server → Global Model
Client 3 ─┘
```

## Roadmap

* [x] Working ML prediction MVP
* [x] Flask API
* [x] Web frontend
* [ ] Database
* [ ] Federated Learning
* [ ] Centralized vs. Federated comparison
* [ ] Non-IID data experiments
* [ ] Testing & security
* [ ] Cloud deployment
* [ ] Research paper

## Existing Features

- Student performance prediction using machine learning
- Student information input through the web interface
- Prediction result displayed to the user
- React-based frontend
- Flask backend API
- Random Forest regression model
- Student performance dataset integration
- Frontend and backend communication through API

## AI-Assisted Development

AI tools are used for planning, coding assistance, debugging, and documentation. All generated code is reviewed, tested, and understood by the project team. An `AI_LOG.md` file will document AI collaboration throughout the project.

## Team

**Course:** Advanced Software Engineering
**University:** Chungbuk National University
**Group:** E

* Hilal Mohammad
* Mai van Than 
