import { Button, Card, Form } from "react-bootstrap";
import classes from "./FormCard.module.css";

// eslint-disable-next-line react/prop-types
export default function FormCard({ children, submit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  return (
    <Card className={`${classes.card}`} bg="dark" text="light">
      <Card.Img variant="top" style={{ height: "150px" }} src="/loginbg.png" />

      <Card.Body className="pt-5">
        <Form className="px-4" onSubmit={handleSubmit}>
          {children}

          <div className="d-grid">
            <Button
              size="lg"
              className={`${classes.button} my-3 fs-6 text-secondary border-0`}
              type="submit"
            >
              LOGIN
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
