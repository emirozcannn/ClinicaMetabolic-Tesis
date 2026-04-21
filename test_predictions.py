from fastapi.testclient import TestClient
import sys
sys.path.insert(0, r"C:\Users\emir\Desktop\tez\metabolic-api")
import main

samples = [
    ("TEST1_MHNW_Healthy", {"bmi":22,"waist_cm":72,"hip_cm":94,"height_cm":172,"weight_kg":65,"systolic_bp":112,"diastolic_bp":72,"fasting_glucose":85,"hdl":60,"triglycerides":90,"serum_insulin":7,"hba1c":5.2,"hs_crp":1.1,"age":28,"gender":2,"ethnicity":3,"education":4,"income_poverty_ratio":3.4,"sedentary_minutes":240,"smoking":0}),
    ("TEST2_MUO_Unhealthy", {"bmi":35,"waist_cm":110,"hip_cm":112,"height_cm":165,"weight_kg":96,"systolic_bp":142,"diastolic_bp":92,"fasting_glucose":115,"hdl":35,"triglycerides":200,"serum_insulin":20,"hba1c":6.6,"hs_crp":5.0,"age":52,"gender":1,"ethnicity":4,"education":1,"income_poverty_ratio":0.9,"sedentary_minutes":600,"smoking":1}),
    ("TEST3_MUNW_SkinnyFat", {"bmi":23,"waist_cm":78,"hip_cm":96,"height_cm":168,"weight_kg":66,"systolic_bp":128,"diastolic_bp":82,"fasting_glucose":105,"hdl":35,"triglycerides":160,"serum_insulin":16,"hba1c":6.0,"hs_crp":3.2,"age":41,"gender":1,"ethnicity":4,"education":2,"income_poverty_ratio":1.6,"sedentary_minutes":420,"smoking":1}),
    ("TEST4_MHOW_HealthyOW", {"bmi":27,"waist_cm":88,"hip_cm":102,"height_cm":174,"weight_kg":82,"systolic_bp":121,"diastolic_bp":78,"fasting_glucose":87,"hdl":58,"triglycerides":95,"serum_insulin":8,"hba1c":5.4,"hs_crp":1.6,"age":36,"gender":2,"ethnicity":3,"education":3,"income_poverty_ratio":2.7,"sedentary_minutes":300,"smoking":0}),
    ("TEST5_MHO_HealthyObese", {"bmi":32,"waist_cm":95,"hip_cm":110,"height_cm":168,"weight_kg":90,"systolic_bp":118,"diastolic_bp":76,"fasting_glucose":88,"hdl":55,"triglycerides":100,"serum_insulin":8,"hba1c":5.5,"hs_crp":1.8,"age":39,"gender":2,"ethnicity":3,"education":3,"income_poverty_ratio":2.3,"sedentary_minutes":280,"smoking":0}),
    ("TEST6_MUOW_UnhealthyOW", {"bmi":28,"waist_cm":96,"hip_cm":104,"height_cm":170,"weight_kg":86,"systolic_bp":136,"diastolic_bp":88,"fasting_glucose":108,"hdl":38,"triglycerides":170,"serum_insulin":18,"hba1c":6.1,"hs_crp":4.0,"age":44,"gender":1,"ethnicity":5,"education":2,"income_poverty_ratio":1.9,"sedentary_minutes":540,"smoking":1}),
]

with TestClient(main.app) as client:
    print("=" * 70)
    print("BACKEND MODEL VARIANCE TEST")
    print("=" * 70)
    for test_name, payload in samples:
        r = client.post("/predict", json=payload)
        if r.status_code == 200:
            result = r.json()
            pred_class = result.get("predicted_class")
            pred_label = result.get("predicted_label")
            pred_full = result.get("predicted_label_full")
            risk_level = result.get("risk_level")
            probs = result.get("probabilities", {})
            
            # Find top 2 probabilities
            top_2 = sorted(probs.items(), key=lambda x: x[1], reverse=True)[:2]
            top_2_str = ", ".join([f"{label}:{prob:.3f}" for label, prob in top_2])
            
            print(f"\n{test_name}")
            print(f"  -> Class: {pred_class} | Label: {pred_label}")
            print(f"  -> Full: {pred_full}")
            print(f"  -> Risk: {risk_level}")
            print(f"  -> Top 2 probs: {top_2_str}")
        else:
            print(f"\n{test_name}")
            print(f"  -> ERROR: HTTP {r.status_code}")
            try:
                print(f"  -> Details: {r.json()}")
            except:
                print(f"  -> Body: {r.text}")
    print("\n" + "=" * 70)
