import { useState, useRef } from 'react'

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const emailInput = useRef();
  const passwordInput = useRef();

  function emailEventHandler(evt) {
    setEmail(evt.target.value);
  }

  function passwordEventHandler(evt) {
    setPassword(evt.target.value);
  }

  function submit(event) {
    props.onSubmitHandler(event, setError, email, password)
  }

  return (
    <form
      className="flex flex-col w-4/12 m-auto bg-slate-100 items-center mt-48 rounded-md h-96 drop-shadow-md"
      onSubmit={submit}
    >
      <label className="mt-8">Email</label>
      <input
        ref={emailInput}
        onChange={emailEventHandler}
        type="email"
        className="border-black border-2 w-8/12 mb-6 focus:outline-none h-8"
        placeholder="eg: john9902@gmail.com"
      />
      <label>Password</label>
      <input
        ref={passwordInput}
        onChange={passwordEventHandler}
        type="password"
        className="border-black border-2 w-8/12 mb-6 focus:outline-none h-8"
        placeholder="eg: secretpassword101"
      />
      <button
        type="submit"
        className="bg-green-500 rounded-sm text-white w-24 h-8 mt-14"
      >
        Login
      </button>
      {error && (
        <p className="text-red-500 mt-3">Password or Email Incorrect</p>
      )}
    </form>
  );
}

export default AuthForm;
