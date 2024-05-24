"use client";

import { useCallback, useEffect, useState } from "react";
import Heading from "./Heading";
import Input from "./Input";
import Card from "./Card";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  NAME = 1,
  EMAIL = 2,
  INFO = 3,
}

const MultiFormCard = () => {
  const [steps, setSteps] = useState(STEPS.NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<FieldValues>({
    name: "",
    email: "",
    info: "",
  });

  useEffect(() => {
    const storedValues = localStorage.getItem('formValues')

    if(storedValues){
        setFormValues(JSON.parse(storedValues))
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: formValues,
  });

  const name = watch("name");
  const email = watch("email");
  const info = watch("info");

  const saveDataToLocalStorage = (values: FieldValues) => {
    localStorage.setItem('formValues', JSON.stringify(values))
  }

  const onBack = () => {
    setSteps((value) => value - 1);
    reset(formValues);
  };

  const onNext = () => {
    const currentValue = getValues()
    const updatedValues = {...formValues, ...currentValue}
    setFormValues(updatedValues);
    saveDataToLocalStorage(updatedValues)
    setSteps((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    setIsLoading(true);
    const finalValues = { ...formValues, ...data }
    console.log(finalValues);
    saveDataToLocalStorage(finalValues)
    reset(formValues);
  };

  const actionLabel = useCallback(() => {
    if (steps === STEPS.INFO) {
      return "Submit";
    }

    return "Next";
  }, [steps]);

  const secendoryActionLabel = useCallback(() => {
    if (steps === STEPS.NAME) {
      return undefined;
    }

    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Screen ${STEPS.NAME}`}
        subtitle="Please enter your name"
      />
      <Input
        id="name"
        label="Name"
        placeholder="Enter your name"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
    </div>
  );

  if (steps === STEPS.EMAIL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={`Screen ${STEPS.EMAIL}`}
          subtitle="Please enter your email"
        />
        <Input
          id="email"
          placeholder="Enter your email"
          label="Email"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
      </div>
    );
  }
  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={`Screen ${STEPS.INFO}`}
          subtitle="Please enter your email"
        />
        <Input
          id="info"
          placeholder="Enter your info"
          label="Info"
          disabled={isLoading}
          required
          register={register}
          errors={errors}
        />
      </div>
    );
  }
  return (
    <Card
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel()}
      secendoryActionLabel={secendoryActionLabel()}
      secendoryAction={steps === STEPS.NAME ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default MultiFormCard;
