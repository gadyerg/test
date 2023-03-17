import { useNavigate } from 'react-router-dom'
import AuthForm from "./AuthForm";

function LogInForm() {
  const nav = useNavigate();

  async function logIn(event, setError, email, password) {
    event.preventDefault();

    const data = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(data.status === 401) {
      setError(true)
    } else {
      nav('/')
    }
  }
  return (
    <AuthForm onSubmitHandler={logIn}/>
  );
}

export default LogInForm;
