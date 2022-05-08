import React, { useState } from "react";

export default function Forms() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState("");

  const onUserNameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setUserName(value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setEmail(value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setPassword(value);
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName === "" || email === "" || password === "") {
      setFormErrors("all fields are required");
    }
  };

  console.log(userName, email, password);

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onUserNameChange}
        value={userName}
        type="text"
        placeholder="username"
        required
        minLength={5}
      />
      <input
        onChange={onEmailChange}
        value={email}
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={onPasswordChange}
        value={password}
        type="password"
        placeholder="Password"
        required
      />
      <button className="w-32 h-16 text-center" type="submit">
        Create Account
      </button>
    </form>
  );
}
