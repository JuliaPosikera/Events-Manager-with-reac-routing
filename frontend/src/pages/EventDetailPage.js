import {
  useParams,
  json,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const params = useParams();
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <p> {params.eventID}</p>
      <EventItem event={data.event}> </EventItem>
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventID
  );
  if (!response.ok) {
    throw json({ message: "Can't fetch the data!" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventID,
    { method: request.method }
  );
  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}
