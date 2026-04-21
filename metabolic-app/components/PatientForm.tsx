"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PatientInput } from "@/lib/types";
import { usePrediction } from "@/hooks/usePrediction";
import { getFieldLabels, useLanguage } from "@/lib/i18n";

const schema = z.object({
  age: z.number().min(18).max(65),
  gender: z.number().min(1).max(2),
  ethnicity: z.number().min(1).max(6),
  education: z.number().min(1).max(4),
  smoking: z.number().min(0).max(1),
  height_cm: z.number().min(100).max(250),
  weight_kg: z.number().min(20).max(300),
  bmi: z.number().min(10).max(70),
  waist_cm: z.number().min(40).max(200),
  hip_cm: z.number().min(40).max(200),
  systolic_bp: z.number().min(60).max(250),
  diastolic_bp: z.number().min(40).max(150),
  fasting_glucose: z.number().min(50).max(600),
  hdl: z.number().min(10).max(150),
  triglycerides: z.number().min(20).max(2000),
  serum_insulin: z.number().min(1).max(300),
  hba1c: z.number().min(3).max(20),
  hs_crp: z.number().min(0.01).max(200),
  income_poverty_ratio: z.number().min(0).max(5),
  sedentary_minutes: z.number().min(0).max(720),
});

const stepFields: Array<Array<keyof PatientInput>> = [
  ["age", "gender", "ethnicity", "smoking"],
  ["height_cm", "weight_kg", "bmi", "waist_cm", "hip_cm", "systolic_bp", "diastolic_bp"],
  ["fasting_glucose", "hdl", "triglycerides", "serum_insulin", "hba1c", "hs_crp"],
  ["income_poverty_ratio", "sedentary_minutes"],
];

const defaults: PatientInput = {
  age: 45,
  gender: 1,
  ethnicity: 3,
  education: 4,
  smoking: 0,
  height_cm: 175,
  weight_kg: 80,
  bmi: 26.1,
  waist_cm: 90,
  hip_cm: 98,
  systolic_bp: 125,
  diastolic_bp: 82,
  fasting_glucose: 95,
  hdl: 45,
  triglycerides: 140,
  serum_insulin: 12,
  hba1c: 5.7,
  hs_crp: 2.3,
  income_poverty_ratio: 2.5,
  sedentary_minutes: 360,
};

const getSliderValue = (value: number | readonly number[]): number =>
  Number(Array.isArray(value) ? value[0] : value);

function NumericField({
  id,
  label,
  unit,
  hint,
  register,
}: {
  id: keyof PatientInput;
  label: string;
  unit: string;
  hint?: string;
  register: ReturnType<typeof useForm<PatientInput>>["register"];
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="mb-1 block text-[13px] font-medium tracking-[0.02em] text-(--text-secondary) uppercase">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Input id={id} type="number" step="any" className="h-10 rounded-md border-(--border-subtle) px-3.5" {...register(id, { valueAsNumber: true })} />
        <span className="rounded-r-md border border-l-0 border-(--border-subtle) bg-(--neutral-100) px-2 py-1 font-mono text-xs text-(--text-muted)">
          {unit}
        </span>
      </div>
      {hint ? <p className="text-xs text-(--text-muted)">{hint}</p> : null}
    </div>
  );
}

export function PatientForm() {
  const [step, setStep] = useState(0);
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const { isLoading, runPrediction } = usePrediction();
  const { copy, language } = useLanguage();
  const fieldLabels = getFieldLabels(language);

  const {
    control,
    handleSubmit,
    register,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientInput>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  const height = watch("height_cm");
  const weight = watch("weight_kg");

  useEffect(() => {
    if (height > 0 && weight > 0) {
      const bmi = weight / (height / 100) ** 2;
      setValue("bmi", Number(bmi.toFixed(1)), { shouldValidate: true });
    }
  }, [height, setValue, weight]);

  const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);

  const nextStep = async () => {
    if (isStepTransitioning) {
      return;
    }

    const valid = await trigger(stepFields[step]);
    if (!valid) {
      return;
    }

    setIsStepTransitioning(true);
    setStep((prev) => Math.min(prev + 1, 3));

    window.setTimeout(() => {
      setIsStepTransitioning(false);
    }, 300);
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit: SubmitHandler<PatientInput> = async (data) => {
    await runPrediction(data);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl rounded-xl border border-(--border-subtle) bg-white px-3 py-2 shadow-[0_2px_8px_rgba(10,46,37,0.06)] md:px-6 md:py-4">
      <CardHeader>
        <CardTitle className="text-(--brand-800)">
          {copy.form.step} {step + 1} {copy.form.of} 4
        </CardTitle>
        <Progress value={progress} />
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <NumericField id="age" label={copy.form.age} unit={copy.form.years} register={register} />

              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="mb-1 block text-[13px] font-medium tracking-[0.02em] text-(--text-secondary) uppercase" htmlFor="gender-male">
                      {copy.form.gender}
                    </label>
                    <RadioGroup value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <label htmlFor="gender-male" className="flex items-center gap-2 text-sm">
                        <RadioGroupItem id="gender-male" value="1" /> {copy.form.male}
                      </label>
                      <label htmlFor="gender-female" className="flex items-center gap-2 text-sm">
                        <RadioGroupItem id="gender-female" value="2" /> {copy.form.female}
                      </label>
                    </RadioGroup>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="ethnicity"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="mb-1 block text-[13px] font-medium tracking-[0.02em] text-(--text-secondary) uppercase">
                      {copy.form.ethnicity}
                    </label>
                    <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger className="h-10 w-full rounded-md border-(--border-subtle)">
                        <SelectValue placeholder={copy.form.selectEthnicity} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Mexican American</SelectItem>
                        <SelectItem value="2">Other Hispanic</SelectItem>
                        <SelectItem value="3">White</SelectItem>
                        <SelectItem value="4">Black</SelectItem>
                        <SelectItem value="5">Asian</SelectItem>
                        <SelectItem value="6">Multiracial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="smoking"
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="mb-1 block text-[13px] font-medium tracking-[0.02em] text-(--text-secondary) uppercase" htmlFor="smoking-no">
                      {copy.form.smoking}
                    </label>
                    <RadioGroup value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <label htmlFor="smoking-no" className="flex items-center gap-2 text-sm">
                        <RadioGroupItem id="smoking-no" value="0" /> {copy.form.no}
                      </label>
                      <label htmlFor="smoking-yes" className="flex items-center gap-2 text-sm">
                        <RadioGroupItem id="smoking-yes" value="1" /> {copy.form.yes}
                      </label>
                    </RadioGroup>
                  </div>
                )}
              />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <NumericField id="height_cm" {...fieldLabels.height_cm} register={register} />
              <NumericField id="weight_kg" {...fieldLabels.weight_kg} register={register} />
              <NumericField id="bmi" {...fieldLabels.bmi} register={register} />
              <NumericField id="waist_cm" {...fieldLabels.waist_cm} register={register} />
              <NumericField id="hip_cm" {...fieldLabels.hip_cm} register={register} />
              <NumericField id="systolic_bp" {...fieldLabels.systolic_bp} register={register} />
              <NumericField id="diastolic_bp" {...fieldLabels.diastolic_bp} register={register} />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <NumericField id="fasting_glucose" {...fieldLabels.fasting_glucose} register={register} />
              <NumericField id="hdl" {...fieldLabels.hdl} register={register} />
              <NumericField id="triglycerides" {...fieldLabels.triglycerides} register={register} />
              <NumericField id="serum_insulin" {...fieldLabels.serum_insulin} register={register} />
              <NumericField id="hba1c" {...fieldLabels.hba1c} register={register} />
              <NumericField id="hs_crp" {...fieldLabels.hs_crp} register={register} />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-(--border-subtle) bg-(--surface-inset) px-4 py-3 text-sm text-(--brand-800)">
                Review the final lifestyle inputs below, then classify.
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Controller
                  control={control}
                  name="income_poverty_ratio"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label
                        className="mb-1 block text-[13px] font-medium tracking-[0.02em] text-(--text-secondary) uppercase"
                        htmlFor="income_poverty_ratio"
                      >
                        {copy.form.incomeToPovertyRatio}: {field.value.toFixed(1)}
                      </label>
                      <Slider
                        id="income_poverty_ratio"
                        min={0}
                        max={5}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(getSliderValue(value))}
                      />
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="sedentary_minutes"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <label
                        className="mb-1 block text-[13px] font-medium tracking-[0.02em] text-(--text-secondary) uppercase"
                        htmlFor="sedentary_minutes"
                      >
                        {copy.form.sedentaryTime}: {field.value.toFixed(0)} {copy.form.minPerDay}
                      </label>
                      <Slider
                        id="sedentary_minutes"
                        min={0}
                        max={720}
                        step={10}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(getSliderValue(value))}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ) : null}

          {Object.keys(errors).length > 0 ? (
            <p className="text-sm text-(--risk-high)" role="alert">
              {copy.form.reviewStep}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-2">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 0 || isLoading}>
              {copy.form.back}
            </Button>

            {step < 3 ? (
              <Button type="button" onClick={nextStep} disabled={isLoading || isStepTransitioning}>
                {copy.form.next}
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || isStepTransitioning}>
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {copy.form.loading}
                  </span>
                ) : (
                  copy.form.submit
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
