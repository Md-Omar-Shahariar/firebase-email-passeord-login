import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import app from "./firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registered, setRegistered] = useState(false);
  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  };
  const forgetPass = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("Email Send");
    });
  };

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password Should contain a Special character");
      return;
    }
    setValidated(true);
    setError("");

    if (registered) {
      console.log(email, password);
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);

          verifyEmail();
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    }

    event.preventDefault();
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email Verification Send");
    });
  };

  return (
    <div>
      <div className="registration w-50 mx-auto">
        <h2 className="text-primary my-5 text-center">
          Please {registered ? "Login" : "Register"}
        </h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              onBlur={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              required
              onChange={handleRegisteredChange}
              label="Already Registered ?"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button onClick={forgetPass} variant="link">
            Forget password?
          </Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
