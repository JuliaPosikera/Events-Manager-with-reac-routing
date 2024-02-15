import { Suspense } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // const events = useLoaderData();
  // const data = useLoaderData();
  const { events } = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  // return <EventsList events={events} />;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Can't fetch the data!" };
    // throw { message: "Can't fetch the data!" };
    // throw new Response(JSON.stringify({ message: "Can't fetch the data!" }), {
    //   status: 500,
    // });
    throw json({ message: "Can't fetch the data!" }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events;
    // return response;
    const resData = await response.json(); // to working with defer
    return resData.events;
  }
}

export function loader() {
  return defer({ events: loadEvents() });
}
