import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const nav = useNavigate();

  async function signUp(event, setError, email, password) {
    event.preventDefault();

    const data = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.status === 401) {
      setError(true);
    } else {
      nav("/");
    }
  }

  return <AuthForm onSubmitHandler={signUp}/>;
}

export default SignUp;
