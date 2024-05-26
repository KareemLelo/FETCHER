// useForm.ts
import { useState, ChangeEvent, FormEvent } from 'react';

type SubmitAction<T> = (formData: T) => Promise<void>;

function useForm<T>(initialState: T, submitAction: SubmitAction<T>) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await submitAction(formData);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return { formData, handleInputChange, handleSubmit };
}

export default useForm;