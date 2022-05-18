import { useForm } from 'react-hook-form';

interface IForm {
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
  password1: string;
  extraError?: string;
}

function UseForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    }
  });
  console.log(errors)
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1",
        { message: "password are not the same" },
        { shouldFocus: true }
      )
    }
    setError("extraError", { message: "server offline." })
  }
  return (
    <>
      <h1>React-Hook-Form</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          {...register("FirstName", {
            required: "write here",
            minLength: {
              value: 5,
              message: "too short",
            },
            validate: {
              noLena: (value) =>
                value.includes("lena") ? "lena is not allowed" : true,
              noNarae: (value) =>
                value.includes("narae") ? "narae is not allowed" : true,
            }
          })
          }
          placeholder="FirstName"
          type="text"
        />
        <span>{errors?.FirstName?.message}</span>
        <input {...register("LastName", {
          required: "write here",
        })}
          placeholder="LastName"
          type="text"
        />
        <span>{errors?.LastName?.message}</span>
        <input {...register("email", {
          required: "wirte here",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "write here",
          }
        })}
          placeholder="email"
          type="text"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("password", {
          required: "write here",
        })} placeholder="Password" type="text"
        />
        <span>{errors?.password?.message}</span>
        <input {...register("password1", {
          required: "write here",
        })} placeholder="password1" type="text"
        />
        <span>{errors?.password1?.message}</span>
        <button>submit</button>
      </form>
      <span>{errors?.extraError?.message}</span>
    </>
  )
}

export default UseForm;