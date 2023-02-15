import React from 'react'
import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import Form from "components/common/Form";
import { useNavigate } from '@pankod/refine-react-router-v6';

const CreateProperty = () => {
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
  const {
      refineCore: { onFinish, formLoading },
      register,
      handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
      const reader = (readFile: File) =>
          new Promise<string>((resolve, reject) => {
              const fileReader = new FileReader();
              fileReader.onload = () => resolve(fileReader.result as string);
              fileReader.readAsDataURL(readFile);
          });

      reader(file).then((result: string) =>
          setPropertyImage({ name: file?.name, url: result }),
      );
  };

  const onFinishHandler = async (data: FieldValues) => {
      if (!propertyImage.name) return alert("Please select an image");

      await onFinish({
          ...data,
          photo: propertyImage.url,
          email: user.email,
      });
  };
  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      onFinishHandler={onFinishHandler}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      propertyImage={propertyImage}
    />
  )
}

export default CreateProperty