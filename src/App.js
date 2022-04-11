import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import app from "./firebase.init";
import { getAuth } from "firebase/auth";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const auth = getAuth(app);
function App() {
  const handleEmailBlur = (event) => {
    console.log(event.target.value);
  };
  const handlePasswordChange = (event) => {
    console.log(event.target.value);
  };
  const handleFormSubmit = (event) => {
    console.log("Form Submitted");
    event.preventDefault();
  };

  return (
    <div>
      <div className="registration w-50 mx-auto">
        <h2 className="text-primary my-5 text-center">Please Register</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
