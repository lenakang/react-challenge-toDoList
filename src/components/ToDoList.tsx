import styled from 'styled-components';
import { Categories, categoryState, toDoSelector, toDoState, newCategoryState } from '../atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import React from 'react';

const Wrapper = styled.div`
  padding:30px;
`
const List = styled.ul`
  margin:10px 0;
`

function ToDoList() {
  const data = useRecoilState(toDoState);
  const [toTos] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const saveData = (event: React.FormEvent<HTMLButtonElement>) => {
    window.localStorage.setItem("list", JSON.stringify(data));
  }
  const newCategory = useRecoilValue(newCategoryState);

  return (
    <Wrapper>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateToDo />
      <hr />

      <List>
        {toTos.map((item) => (
          <ToDo key={item.id} {...item} />
        ))}
      </List>
      <hr />

      <button onClick={saveData}>save</button>
      <hr />

      <p>saved to dos : <br />
        {window.localStorage.getItem("list")}
      </p>
      <hr />

      <p>new category: {newCategory}</p>

    </Wrapper>
  )
}

export default ToDoList;