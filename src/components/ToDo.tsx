import { IToDo, toDoState, Categories } from '../atom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Item = styled.li`
  padding:10px 0;
`

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    console.log(newCategory);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((item) => item.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ]
    })
  }
  return (
    <Item>
      {text} <br />
      {category !== Categories.TO_DO &&
        <button onClick={() => onClick(category = Categories.TO_DO)}>TO_DO</button>
      }
      {category !== Categories.DOING &&
        <button onClick={() => onClick(category = Categories.DOING)}>DOING</button>
      }
      {category !== Categories.DONE &&
        <button onClick={() => onClick(category = Categories.DONE)}>DONE</button>
      }
    </Item >
  )
}

export default ToDo;