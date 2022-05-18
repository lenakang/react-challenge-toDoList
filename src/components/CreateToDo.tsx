import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { toDoState, categoryState, newCategoryState, Categories } from '../atom';

interface IForm {
  toDo: string;
  newCat: string;
}

function CreateToDo() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const newFn = useSetRecoilState(newCategoryState);
  const onValid = ({ toDo }: IForm) => {
    setToDos((old) => [{ text: toDo, id: Date.now(), category }, ...old]);
    setValue("toDo", "");
  }
  const onCatValid = ({ newCat }: IForm) => {
    newFn(() => newCat);
    setValue("newCat", "")
  }

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo")} type="text" placeholder="write a to do" />
        <button>add</button>
      </form>
      <br />
      <form onSubmit={handleSubmit(onCatValid)}>
        <input {...register("newCat")} type="text" placeholder="new category" />
        <button>add</button>
      </form>
    </>
  )
}

export default CreateToDo;