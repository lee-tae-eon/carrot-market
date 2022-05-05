import React, { useState } from "react";

export default function Forms() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  console.log(userName, email, password);

  return (
    <form>
      <input
        onChange={onUserNameChange}
        value={userName}
        type="text"
        placeholder="username"
      />
      <input
        onChange={onEmailChange}
        value={email}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={onPasswordChange}
        value={password}
        type="password"
        placeholder="Password"
      />
    </form>
  );
}
