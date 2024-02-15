import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";
export default function NewEventPage() {
  return <EventForm />;
}

export async function action({ request, params }) {
  const data = await request.formData();
  //const enteredTitle = data.get("title") in this case "title" is name of the field on Form

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(eventData),
  });

  console.log(response);

  if (!response.ok) {
    throw json({ message: "Error posting data" }, { status: 500 });
  }
  return redirect("/events");
}
