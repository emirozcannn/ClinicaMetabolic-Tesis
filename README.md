# ClinicaMetabolic-Tesis

Deploy-ready repository for the metabolic obesity classifier.

## What belongs in this repo
- `metabolic-api/` for the FastAPI backend.
- `metabolic-app/` for the Next.js frontend.
- `best_model_xgboost_6sinif_80-20.pkl` for backend inference.
- `VERİ.csv` for runtime scaler reconstruction.
- `.gitignore` and this README.

## What should stay out
- Thesis analysis scripts, reports, figures, and exploratory artifacts.
- Large experimental files that are not required to run the app.

## Local Run

Backend:
```bash
cd metabolic-api
pip install -r requirements.txt
uvicorn main:app --reload
```

Frontend:
```bash
cd metabolic-app
npm install
npm run dev
```

## Deploy Targets
- Backend: Render, root directory `metabolic-api`
- Frontend: Vercel, root directory `metabolic-app`

## Required Environment Variables
- Render: `ALLOWED_ORIGINS`
- Vercel: `NEXT_PUBLIC_API_URL`

## Notes
- The backend model file is already placed in the backend deployment path.
- Keep the dataset CSV available at the repository root for scaler reconstruction.
